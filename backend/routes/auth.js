const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const JWT_SECRET = process.env.JWT_SECRET || "mydefaultsecretkey123";

// POST: /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Basic presence checks
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // 2. Validate email format simply
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    // 3. Password length check
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    // 4. Edge Case: Check if user already exists
    const existingUser = await UserModel.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    // 5. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create user with default demo paper trading funds (₹100,000 = 10,000,000 paise)
    const newUser = await UserModel.create({
      username: username.trim(),
      email: cleanEmail,
      password: hashedPassword,
      fundsInPaise: 10000000,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Server error during registration." });
  }
});

// POST: /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Find user by email
    const user = await UserModel.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // 2. Compare entered password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error during login." });
  }
});

module.exports = router;