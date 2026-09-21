import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, initialMode = "BUY", availableQty = 0 }) => {
  const [mode, setMode] = useState(initialMode);
  const [stockQuantity, setStockQuantity] = useState(availableQty > 0 ? availableQty : 1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    setMode(initialMode || "BUY");
    if (availableQty && availableQty > 0) {
      setStockQuantity(availableQty);
    } else {
      setStockQuantity(1);
    }
  }, [initialMode, availableQty]);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    const fetchCurrentPrice = async () => {
      if (!uid || !token) return;

      try {
        const res = await axios.get("http://localhost:3002/allHoldings", {
          headers: { Authorization: "Bearer " + token },
        });

        if (!isMounted) return;

        if (Array.isArray(res.data)) {
          const match = res.data.find((item) => item.name === uid);
          if (match && Number(match.price) > 0) {
            setStockPrice(Number(match.price));
          }
        }
      } catch (err) {
        console.warn("Could not prefill market price:", err);
      }
    };

    fetchCurrentPrice();

    return () => {
      isMounted = false;
    };
  }, [uid]);

  const handleOrderSubmit = async () => {
    setErrorMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please log in.");
      window.location.href = "http://localhost:3000/login";
      return;
    }

    const qtyNumber = parseInt(stockQuantity, 10);
    const priceNumber = parseFloat(stockPrice);

    if (isNaN(qtyNumber) || qtyNumber <= 0) {
      setErrorMessage("Quantity must be a positive integer.");
      return;
    }

    if (isNaN(priceNumber) || priceNumber <= 0) {
      setErrorMessage("Price must be greater than 0.");
      return;
    }

    if (mode === "SELL" && availableQty > 0 && qtyNumber > availableQty) {
      setErrorMessage(`Cannot sell more than available quantity (${availableQty}).`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: qtyNumber,
          price: priceNumber,
          mode: mode,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setIsLoading(false);
      alert(response.data.message || `${mode} order executed successfully!`);

      if (generalContext && typeof generalContext.triggerRefresh === "function") {
        generalContext.triggerRefresh();
      }

      if (generalContext && typeof generalContext.closeBuyWindow === "function") {
        generalContext.closeBuyWindow();
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Order submission error:", err);

      if (err.response && err.response.data && err.response.data.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Order execution failed. Please verify server connection.");
      }
    }
  };

  const handleClose = () => {
    if (generalContext && typeof generalContext.closeBuyWindow === "function") {
      generalContext.closeBuyWindow();
    }
  };

  const isBuy = mode === "BUY";
  const calculatedTotal = (Number(stockQuantity || 0) * Number(stockPrice || 0)).toFixed(2);

  return (
    <div className="container" id="buy-window" draggable="true">
      <div style={{ display: "flex", borderBottom: "1px solid #ddd", marginBottom: "12px" }}>
        <button
          type="button"
          onClick={() => {
            setMode("BUY");
            setErrorMessage("");
          }}
          style={{
            flex: 1,
            padding: "8px",
            border: "none",
            backgroundColor: isBuy ? "#4184f3" : "#f1f1f1",
            color: isBuy ? "#fff" : "#333",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          BUY {uid}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("SELL");
            setErrorMessage("");
          }}
          style={{
            flex: 1,
            padding: "8px",
            border: "none",
            backgroundColor: !isBuy ? "#ff5722" : "#f1f1f1",
            color: !isBuy ? "#fff" : "#333",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          SELL {uid}
        </button>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              min="1"
              step="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              min="0.05"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      {mode === "SELL" && availableQty > 0 && (
        <p style={{ fontSize: "12px", color: "#666", margin: "6px 0 0 0" }}>
          Available to sell: <strong>{availableQty} shares</strong>
        </p>
      )}

      {errorMessage && (
        <p style={{ color: "#df514c", fontSize: "12px", marginTop: "8px" }}>
          {errorMessage}
        </p>
      )}

      <div className="buttons" style={{ marginTop: "16px" }}>
        <span>{isBuy ? "Margin required" : "Est. proceeds"}: ₹{calculatedTotal}</span>
        <div>
          <button
            type="button"
            className={`btn ${isBuy ? "btn-blue" : "btn-orange"}`}
            style={{
              backgroundColor: isBuy ? "#4184f3" : "#ff5722",
              color: "#fff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "8px",
            }}
            onClick={handleOrderSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : mode}
          </button>
          <button type="button" className="btn btn-grey" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;