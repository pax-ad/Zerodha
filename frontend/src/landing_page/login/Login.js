import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Edge Case 1: Empty input check
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      

      const data = await response.json();

      // Edge Case 2: Server returned error status (400, 401, 500)
      if (!response.ok) {
        setErrorMessage(data.error || "Login failed. Please check credentials.");
        setIsLoading(false);
        return;
      }

      // Edge Case 3: 200 OK returned, but token is missing or undefined
      if (!data.token) {
        setErrorMessage("Server error: Authentication token missing.");
        setIsLoading(false);
        return;
      }

      // Transfer token across ports (from 3000 to dashboard 3001)
      window.location.href = `http://localhost:3001?token=${encodeURIComponent(data.token)}`;
    } catch (err) {
      // Edge Case 4: Backend server is offline or network failed
      console.log("Network error during login:", err);
      setErrorMessage("Unable to connect to server. Please ensure backend is running.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row text-center mt-4">
        <h2>Login to Kite</h2>
        <p className="text-muted">Enter your registered email and password</p>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-5">
          {/* Edge case: Display readable error message */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
            <div className="mb-3 text-start">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Edge Case 5: Prevent button double-click / multiple rapid requests */}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;