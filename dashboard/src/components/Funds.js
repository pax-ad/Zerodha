import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const [availableCash, setAvailableCash] = useState(0);
  const [usedMargin, setUsedMargin] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const generalContext = useContext(GeneralContext);
  const refreshCounter = generalContext?.refreshCounter || 0;

  useEffect(() => {
    let isMounted = true;
    let redirectTimer = null;
    const token = localStorage.getItem("token");

    const fetchFundsAndHoldings = async () => {
      // Edge Case 1: Unauthenticated direct visit
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

      try {
        const [fundsRes, holdingsRes] = await Promise.all([
          axios.get("http://localhost:3002/user/funds", {
            headers: { Authorization: "Bearer " + token },
          }),
          axios.get("http://localhost:3002/allHoldings", {
            headers: { Authorization: "Bearer " + token },
          }),
        ]);

        if (!isMounted) return;

        // Available cash from user account
        setAvailableCash(Number(fundsRes.data?.availableCash || 0));

        // Edge Case 2: Ensure holdings response is an array before reducing
        if (Array.isArray(holdingsRes.data)) {
          const totalInvested = holdingsRes.data.reduce(
            (acc, item) => acc + Number(item.avg || 0) * Number(item.qty || 0),
            0
          );
          setUsedMargin(totalInvested);
        }

        setIsLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error loading funds statement:", err);

        // Edge Case 3: Session expiration check
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          setErrorMessage("Session expired. Redirecting to login...");
          redirectTimer = setTimeout(() => {
            window.location.href = "http://localhost:3000/login";
          }, 1500);
        } else {
          setErrorMessage("Unable to fetch funds data. Verify your backend server.");
        }
        setIsLoading(false);
      }
    };

    fetchFundsAndHoldings();

    return () => {
      isMounted = false;
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [refreshCounter]);

  // Paper deposit handler
  const handleAddFunds = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please log in.");
      window.location.href = "http://localhost:3000/login";
      return;
    }

    const input = window.prompt("Enter amount to add to paper trading account (₹):", "50000");
    if (!input) return;

    const amountNum = parseFloat(input);
    // Edge Case 4: Non-positive or invalid number input
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3002/user/addFunds",
        { amount: amountNum },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      alert(res.data?.message || `₹${amountNum.toFixed(2)} added successfully!`);
      setAvailableCash(Number(res.data?.availableCash || 0));

      // Notify TopBar and other components to update cash readout immediately
      if (generalContext && typeof generalContext.triggerRefresh === "function") {
        generalContext.triggerRefresh();
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000/login";
      } else {
        alert(err.response?.data?.error || "Failed to add funds. Please try again.");
      }
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    alert("Paper Trading Mode: Fund withdrawals are simulated. No live bank transfers occur.");
  };

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading funds statement...</p>;
  }

  if (errorMessage) {
    return <p style={{ padding: "20px", color: "red" }}>{errorMessage}</p>;
  }

  const openingBalance = availableCash + usedMargin;

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <Link className="btn btn-green" to="#" onClick={handleAddFunds}>
          Add funds
        </Link>
        <Link className="btn btn-blue" to="#" onClick={handleWithdraw}>
          Withdraw
        </Link>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                {availableCash.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">
                {usedMargin.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">
                {availableCash.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>
                {openingBalance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link
              className="btn btn-blue"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Commodity segment activation coming soon.");
              }}
            >
              Open Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;