require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes and Middleware
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

// Database Models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const UserModel = require("./model/UserModel");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// Middlewares
app.use(cors());
app.use(express.json()); // Built-in Express tool to read incoming JSON body

// 1. Authentication Routes (Register & Login)
app.use("/api/auth", authRoutes);

// ====================================================================
// PROTECTED ROUTES (Only logged-in users with a token can access these)
// ====================================================================

// GET: Fetch all holdings for the logged-in user
app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userHoldings = await HoldingsModel.find({ userId: userId });
    res.json(userHoldings);
  } catch (error) {
    console.log("Error fetching holdings:", error);
    res.status(500).json({ error: "Could not fetch holdings" });
  }
});

// GET: Fetch all positions for the logged-in user
app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userPositions = await PositionsModel.find({ userId: userId });
    res.json(userPositions);
  } catch (error) {
    console.log("Error fetching positions:", error);
    res.status(500).json({ error: "Could not fetch positions" });
  }
});

// GET: Fetch all past orders for the logged-in user
app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userOrders = await OrdersModel.find({ userId: userId }).sort({ createdAt: -1 });
    res.json(userOrders);
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    // Edge case: Fetch only positions belonging to the logged-in user
    const positions = await PositionsModel.find({ userId });
    return res.status(200).json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    return res.status(500).json({ error: "Failed to retrieve open positions." });
  }
});

// 1. GET current funds and margin
app.get("/user/funds", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Default funds to 1,000,000 paise (₹10,000) if not set on user creation
    const fundsInPaise = user.fundsInPaise ?? 1000000;
    const availableCash = fundsInPaise / 100;

    return res.status(200).json({
      availableCash,
      fundsInPaise,
    });
  } catch (error) {
    console.error("Error retrieving user funds:", error);
    return res.status(500).json({ error: "Internal server error retrieving funds." });
  }
});

app.get("/user/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User account not found." });
    }

    const fundsInPaise = user.fundsInPaise ?? 1000000;
    const availableCash = fundsInPaise / 100;

    return res.status(200).json({
      id: user._id,
      username: user.username || user.name || user.email.split("@")[0],
      email: user.email,
      availableCash,
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).json({ error: "Internal server error fetching profile." });
  }
});

// 2. POST add paper trading funds (Deposit simulation)
app.post("/user/addFunds", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    const depositAmount = parseFloat(amount);

    // Edge Case: Validate positive numeric amount
    if (isNaN(depositAmount) || depositAmount <= 0) {
      return res.status(400).json({ error: "Deposit amount must be greater than zero." });
    }

    if (depositAmount > 10000000) {
      return res.status(400).json({ error: "Single deposit cannot exceed ₹1,00,00,000." });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const depositInPaise = Math.round(depositAmount * 100);
    user.fundsInPaise = (user.fundsInPaise ?? 0) + depositInPaise;
    await user.save();

    return res.status(200).json({
      message: `₹${depositAmount.toFixed(2)} added successfully!`,
      availableCash: user.fundsInPaise / 100,
    });
  } catch (error) {
    console.error("Error adding funds:", error);
    return res.status(500).json({ error: "Internal server error adding funds." });
  }
});



// POST: Place a new BUY or SELL order
app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const userId = req.user.id;

    // 1. Basic validation
    const numQty = parseInt(qty, 10);
    const numPrice = parseFloat(price);

    if (!name || isNaN(numQty) || numQty <= 0 || isNaN(numPrice) || numPrice <= 0) {
      return res.status(400).json({ error: "Invalid order parameters." });
    }

    const orderCost = numQty * numPrice;

    // Fetch user for balance checks
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // -----------------------------------------------------------
    // MODE: BUY
    // -----------------------------------------------------------
    if (mode === "BUY") {
      // Edge Case: Check available funds (funds stored in paise: 1 INR = 100 paise)
      const costInPaise = orderCost * 100;
      if (user.fundsInPaise < costInPaise) {
        return res.status(400).json({ error: "Insufficient funds to execute buy order." });
      }

      // Deduct balance
      user.fundsInPaise -= costInPaise;
      await user.save();

      // Update or create holding
      let holding = await HoldingsModel.findOne({ userId, name });
      if (holding) {
        const totalOldCost = holding.avg * holding.qty;
        const totalNewCost = numPrice * numQty;
        const updatedQty = holding.qty + numQty;

        holding.qty = updatedQty;
        holding.avg = (totalOldCost + totalNewCost) / updatedQty;
        holding.price = numPrice;
        await holding.save();
      } else {
        await HoldingsModel.create({
          userId,
          name,
          qty: numQty,
          avg: numPrice,
          price: numPrice,
          net: "+0.00%",
          day: "+0.00%",
        });
      }
    } 
    // -----------------------------------------------------------
    // MODE: SELL
    // -----------------------------------------------------------
    else if (mode === "SELL") {
      const holding = await HoldingsModel.findOne({ userId, name });

      // Edge Case: Cannot sell stock you do not own
      if (!holding || holding.qty < numQty) {
        return res.status(400).json({
          error: `Insufficient holdings. You only own ${holding ? holding.qty : 0} shares.`,
        });
      }

      // Credit balance back to user
      const creditInPaise = orderCost * 100;
      user.fundsInPaise += creditInPaise;
      await user.save();

      // Reduce holding quantity or delete document if 0
      if (holding.qty === numQty) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        holding.qty -= numQty;
        holding.price = numPrice; // update latest market price
        await holding.save();
      }
    } else {
      return res.status(400).json({ error: "Invalid order mode." });
    }

    // 2. Record trade in Orders collection
    const newOrder = await OrdersModel.create({
      userId,
      name,
      qty: numQty,
      price: numPrice,
      mode,
    });

    return res.status(201).json({
      message: `${mode} order executed successfully!`,
      order: newOrder,
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return res.status(500).json({ error: "Internal server error executing trade." });
  }
});

// ----------------------------------------------------
// Start Database and Server safely
// ----------------------------------------------------
const startApp = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Database connection error:", err);
  }
};

startApp();