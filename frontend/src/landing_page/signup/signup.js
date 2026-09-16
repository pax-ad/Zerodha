import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Edge Case 1: Check for empty spaces or missing fields
    if (!username.trim() || !email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all the details.");
      return;
    }

    // Edge Case 2: Password must be at least 8 characters
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3002/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      // Edge Case 3: Email already exists or server error
      if (!response.ok) {
        setErrorMessage(data.error || "Failed to create account.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Account created successfully! Redirecting to login...");
      setIsLoading(false);

      // Redirect user to login page after 1.5 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.log("Signup error:", error);
      setErrorMessage("Cannot connect to the server. Make sure backend is running.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
      <h2>Sign up now</h2>
      <p style={{ color: "#666" }}>Open a paper trading account</p>

      {/* Show error or success messages */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: "15px" }}>
          <label>Username:</label>
          <input
            type="text"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="e.g. Aman"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email Address:</label>
          <input
            type="email"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            type="password"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Prevent accidental multiple clicks while sending request */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#387ed1",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;