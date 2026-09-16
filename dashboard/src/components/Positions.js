import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const generalContext = useContext(GeneralContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;
    let redirectTimer = null;

    if (!token) {
      if (isMounted) {
        setErrorMessage("Authentication token missing. Please log in.");
        setIsLoading(false);
      }
      redirectTimer = setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 1500);
      return;
    }

    const fetchPositions = async () => {
      try {
        const res = await axios.get("http://localhost:3002/allPositions", {
          headers: { Authorization: "Bearer " + token },
        });

        if (!isMounted) return;

        if (Array.isArray(res.data)) {
          setAllPositions(res.data);
        } else {
          setAllPositions([]);
        }
        setIsLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching positions:", err);

        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          setErrorMessage("Session expired. Redirecting to login...");
          redirectTimer = setTimeout(() => {
            window.location.href = "http://localhost:3000/login";
          }, 1500);
        } else {
          setErrorMessage("Failed to load positions from server.");
        }
        setIsLoading(false);
      }
    };

    fetchPositions();

    return () => {
      isMounted = false;
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [token]);

  // Handle Square Off / Exit Position
  const handleSquareOff = (stock) => {
    if (generalContext && typeof generalContext.openBuyWindow === "function") {
      // Opens the unified order modal in SELL mode with prefilled quantity
      generalContext.openBuyWindow(stock.name, "SELL", stock.qty);
    } else {
      alert(`Square off order triggered for ${stock.name}`);
    }
  };

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading open positions...</p>;
  }

  if (errorMessage) {
    return <p style={{ padding: "20px", color: "red" }}>{errorMessage}</p>;
  }

  // Edge Case: Empty positions
  if (allPositions.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center", color: "#666" }}>
        <h3 className="title">Positions (0)</h3>
        <p>You have no open intraday positions.</p>
      </div>
    );
  }

  // Calculate overall day P&L across all positions
  let totalPositionPnL = 0;
  for (let i = 0; i < allPositions.length; i++) {
    const item = allPositions[i];
    const curVal = Number(item.price || 0) * Number(item.qty || 0);
    const invested = Number(item.avg || 0) * Number(item.qty || 0);
    totalPositionPnL += curVal - invested;
  }
  const isOverallProfit = totalPositionPnL >= 0;

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = Number(stock.price || 0) * Number(stock.qty || 0);
              const invested = Number(stock.avg || 0) * Number(stock.qty || 0);
              const pnl = curValue - invested;
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product || "MIS"}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{Number(stock.avg || 0).toFixed(2)}</td>
                  <td>₹{Number(stock.price || 0).toFixed(2)}</td>
                  <td className={profClass}>
                    {isProfit ? "+" : ""}₹{pnl.toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day || "0.00%"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleSquareOff(stock)}
                      style={{
                        padding: "3px 8px",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#ff5722",
                        border: "1px solid #ff5722",
                        borderRadius: "3px",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Exit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col">
          <h5>Total P&amp;L</h5>
          <p style={{ color: isOverallProfit ? "#4caf50" : "#df514c", fontWeight: "600", fontSize: "16px" }}>
            {isOverallProfit ? "+" : ""}₹{totalPositionPnL.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default Positions;