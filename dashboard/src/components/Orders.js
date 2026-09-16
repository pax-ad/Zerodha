import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const generalContext = useContext(GeneralContext);
  const refreshCounter = generalContext?.refreshCounter || 0;

  useEffect(() => {
    let isMounted = true;
    let redirectTimer = null;
    const token = localStorage.getItem("token");

    // Edge Case 1: Missing auth token
    if (!token) {
      setErrorMessage("Authentication required. Please log in.");
      setIsLoading(false);
      redirectTimer = setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 1500);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3002/allOrders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!isMounted) return;

        // Edge Case 2: Sort latest orders first
        const sortedOrders = Array.isArray(res.data)
          ? [...res.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];
        setAllOrders(sortedOrders);
        setIsLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error loading orders:", err);

        // Edge Case 3: Session expiration
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          setErrorMessage("Session expired. Redirecting to login...");
          redirectTimer = setTimeout(() => {
            window.location.href = "http://localhost:3000/login";
          }, 1500);
        } else {
          setErrorMessage("Failed to fetch order history. Please check your backend.");
        }
        setIsLoading(false);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [refreshCounter]);

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading order book...</p>;
  }

  if (errorMessage) {
    return <p style={{ padding: "20px", color: "red" }}>{errorMessage}</p>;
  }

  // Edge Case 4: No orders placed yet
  if (allOrders.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center", color: "#666" }}>
        <h3 className="title">Orders (0)</h3>
        <p>You haven't placed any orders today.</p>
      </div>
    );
  }

  return (
    <div className="orders-container" style={{ padding: "20px" }}>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Instrument</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, idx) => {
              const isBuy = order.mode === "BUY";
              const formattedTime = order.createdAt
                ? new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "N/A";

              return (
                <tr key={order._id || idx}>
                  <td>{formattedTime}</td>
                  <td>{order.name}</td>
                  <td style={{ color: isBuy ? "#4caf50" : "#df514c", fontWeight: "600" }}>
                    {order.mode || "BUY"}
                  </td>
                  <td>{order.qty ?? 0}</td>
                  <td>₹{Number(order.price || 0).toFixed(2)}</td>
                  <td>
                    <span style={{ color: "#4caf50" }}>COMPLETE</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;