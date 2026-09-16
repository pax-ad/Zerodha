import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const [profile, setProfile] = useState({ username: "Trader" });
  const [availableCash, setAvailableCash] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const generalContext = useContext(GeneralContext);
  const refreshCounter = generalContext?.refreshCounter || 0;
  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;

    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchSummaryData = async () => {
      try {
        const [profileRes, fundsRes, holdingsRes] = await Promise.all([
          axios.get("http://localhost:3002/user/profile", {
            headers: { Authorization: "Bearer " + token },
          }),
          axios.get("http://localhost:3002/user/funds", {
            headers: { Authorization: "Bearer " + token },
          }),
          axios.get("http://localhost:3002/allHoldings", {
            headers: { Authorization: "Bearer " + token },
          }),
        ]);

        if (!isMounted) return;

        setProfile({
          username: profileRes.data.username || profileRes.data.email?.split("@")[0] || "Trader",
        });
        setAvailableCash(Number(fundsRes.data?.availableCash || 0));
        setHoldings(Array.isArray(holdingsRes.data) ? holdingsRes.data : []);
        setIsLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error loading summary dashboard data:", err);
        setIsLoading(false);
      }
    };

    fetchSummaryData();

    return () => {
      isMounted = false;
    };
  }, [token, refreshCounter]);

  // Aggregate holdings calculations
  let totalInvestment = 0;
  let totalCurrentValue = 0;

  for (let i = 0; i < holdings.length; i++) {
    const item = holdings[i];
    const qty = Number(item.qty || 0);
    const avg = Number(item.avg || 0);
    const price = Number(item.price || 0);

    totalInvestment += avg * qty;
    totalCurrentValue += price * qty;
  }

  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isProfit = totalPnL >= 0;
  const openingBalance = availableCash + totalInvestment;

  // Formatting helper for currency strings (e.g., 3.74k or full format)
  const formatCurrency = (val) => {
    const num = Number(val || 0);
    if (Math.abs(num) >= 100000) {
      return `${(num / 100000).toFixed(2)}L`;
    }
    if (Math.abs(num) >= 1000) {
      return `${(num / 1000).toFixed(2)}k`;
    }
    return num.toFixed(2);
  };

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading summary...</p>;
  }

  return (
    <>
      <div className="username">
        <h6>Hi, {profile.username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCurrency(availableCash)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatCurrency(totalInvestment)}</span>
            </p>
            <p>
              Opening balance <span>{formatCurrency(openingBalance)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {formatCurrency(totalPnL)}{" "}
              <small>
                {isProfit ? "+" : ""}
                {pnlPercent.toFixed(2)}%
              </small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatCurrency(totalCurrentValue)}</span>
            </p>
            <p>
              Investment <span>{formatCurrency(totalInvestment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;