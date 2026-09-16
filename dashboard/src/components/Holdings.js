import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const generalContext = useContext(GeneralContext);
  const refreshCounter = generalContext?.refreshCounter || 0;

  useEffect(() => {
    let isMounted = true;
    let redirectTimer = null;
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("You are not logged in. Please log in first.");
      setIsLoading(false);
      redirectTimer = setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 1500);
      return;
    }

    const fetchHoldings = async () => {
      try {
        const res = await axios.get("http://localhost:3002/allHoldings", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!isMounted) return;

        if (Array.isArray(res.data)) {
          setAllHoldings(res.data);
        } else {
          setAllHoldings([]);
        }
        setIsLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching holdings:", err);

        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          setErrorMessage("Session expired. Redirecting to login...");
          redirectTimer = setTimeout(() => {
            window.location.href = "http://localhost:3000/login";
          }, 1500);
        } else {
          setErrorMessage("Failed to load holdings. Make sure backend is running.");
        }
        setIsLoading(false);
      }
    };

    fetchHoldings();

    return () => {
      isMounted = false;
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [refreshCounter]);

  // Live Price Ticker Simulation (ticks every 3 seconds)
  useEffect(() => {
    if (allHoldings.length === 0) return;

    const interval = setInterval(() => {
      setAllHoldings((prev) =>
        prev.map((item) => {
          const oldPrice = Number(item.price || 0);
          const delta = (Math.random() * 0.8 - 0.4) / 100;
          const newPrice = Math.max(0.05, parseFloat((oldPrice + oldPrice * delta).toFixed(2)));

          return {
            ...item,
            price: newPrice,
            isLoss: newPrice < (item.avg || oldPrice),
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [allHoldings.length]);

 const handleExitStock = (e, stock) => {
  e.preventDefault();
  e.stopPropagation(); // Prevents bubbling if the <tr> has an onClick

  console.log("Exit clicked for stock:", stock);

  if (generalContext?.openBuyWindow) {
    // Passes instrument name, mode ("SELL"), and owned quantity
    generalContext.openBuyWindow(stock.name, "SELL", stock.qty);
  } else {
    console.error("GeneralContext.openBuyWindow is undefined! Check Provider wrapping.");
  }
};

  // Dynamic Portfolio Calculations
  let totalInvestment = 0;
  let totalCurrentValue = 0;

  for (let i = 0; i < allHoldings.length; i++) {
    const stock = allHoldings[i];
    const qty = Number(stock.qty || 0);
    const avg = Number(stock.avg || 0);
    const price = Number(stock.price || 0);

    totalInvestment += avg * qty;
    totalCurrentValue += price * qty;
  }

  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isOverallProfit = totalPnL >= 0;

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price || 0)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading your portfolio holdings...</p>;
  }

  if (errorMessage) {
    return <p style={{ padding: "20px", color: "red" }}>{errorMessage}</p>;
  }

  if (allHoldings.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3 className="title">Holdings (0)</h3>
        <p style={{ color: "#777" }}>
          You do not have any holdings in your portfolio yet. Buy stocks from the watchlist to see them here.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

              const curValue = price * qty;
              const invested = avg * qty;
              const pnl = curValue - invested;
              const isProfit = pnl >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>₹{avg.toFixed(2)}</td>
                  <td>₹{price.toFixed(2)}</td>
                  <td>₹{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {isProfit ? "+" : ""}₹{pnl.toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net || "0.00%"}</td>
                  <td className={dayClass}>{stock.day || "0.00%"}</td>
                  <td>
                    <button
                      type="button"
                        onClick={(e) => handleExitStock(e, stock)}
                           style={{
                             padding: "4px 10px",
                             fontSize: "12px",
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

      <div className="row">
        <div className="col">
          <h5>₹{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>₹{totalCurrentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={{ color: isOverallProfit ? "#4caf50" : "#df514c" }}>
            {isOverallProfit ? "+" : ""}₹{totalPnL.toFixed(2)} ({totalPnLPercent.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;