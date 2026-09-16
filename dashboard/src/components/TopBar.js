import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import Menu from "./Menu";

const TopBar = () => {
  const [userData, setUserData] = useState({
    username: "Trader",
    email: "",
    availableCash: 0,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const generalContext = useContext(GeneralContext);
  const refreshCounter = generalContext?.refreshCounter || 0;
  const token = localStorage.getItem("token");

  // Fetch live user info & balance
  useEffect(() => {
    let isMounted = true;

    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3002/user/profile", {
          headers: { Authorization: "Bearer " + token },
        });

        if (!isMounted) return;

        setUserData({
          username: res.data.username || "Trader",
          email: res.data.email || "",
          availableCash: Number(res.data.availableCash || 0),
        });
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching user header profile:", err);

        // Edge Case: Expired token
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          window.location.href = "http://localhost:3000/login";
        }
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, [token, refreshCounter]);

  // Edge Case: Close profile dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/login";
  };

  const userInitial = (userData.username || "U").charAt(0).toUpperCase();

  return (
    <div className="topbar-container">
      {/* Indices Bar */}
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">24,852.10</p>
          <p className="percent profit">+0.42%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">81,320.50</p>
          <p className="percent profit">+0.38%</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <Menu />

      {/* User Balance & Avatar Section */}
      <div className="user-profile-section" ref={dropdownRef} style={{ position: "relative" }}>
        <div
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          {/* Quick Cash Readout */}
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "11px", color: "#888", display: "block" }}>Available Cash</span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#4caf50" }}>
              ₹{userData.availableCash.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Profile Circle */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#ff5722",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {userInitial}
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "48px",
              width: "220px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              borderRadius: "6px",
              border: "1px solid #eee",
              zIndex: 1000,
              padding: "12px",
            }}
          >
            <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "8px", marginBottom: "8px" }}>
              <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", color: "#333" }}>
                {userData.username}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#888", wordBreak: "break-all" }}>
                {userData.email}
              </p>
            </div>

            <div style={{ padding: "6px 0", fontSize: "13px", color: "#555" }}>
              <p style={{ margin: "4px 0" }}>
                <strong>Client ID:</strong> #{userData.email ? userData.email.slice(0, 6).toUpperCase() : "DEMO"}
              </p>
            </div>

            <hr style={{ margin: "8px 0", border: "none", borderTop: "1px solid #f0f0f0" }} />

            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "8px",
                border: "none",
                backgroundColor: "#df514c",
                color: "#fff",
                borderRadius: "4px",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;