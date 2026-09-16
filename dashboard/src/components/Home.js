import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

function Home() {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // 1. Check localStorage first
    let token = localStorage.getItem("token");

    // 2. Fallback: If localStorage isn't populated yet, read directly from URL
    if (!token) {
      const searchParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = searchParams.get("token");

      if (tokenFromUrl) {
        token = tokenFromUrl;
        localStorage.setItem("token", tokenFromUrl);
        // Clean URL so the token does not linger in history
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    // 3. Edge Case: If neither has a token, redirect to port 3000
    if (!token) {
      alert("Session not found. Please log in.");
      window.location.href = "http://localhost:3000/login";
      return;
    }

    // Token confirmed
    setIsAuthReady(true);
  }, []);

  // Prevent UI flashing before auth validation finishes
  if (!isAuthReady) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
        Verifying trading session...
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
}

export default Home;