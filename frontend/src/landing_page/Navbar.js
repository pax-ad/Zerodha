import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Close the panel when clicking anywhere outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top"
      style={{ backgroundColor: "#ffffff", minHeight: "52px" }}
    >
      <div className="container py-1 position-relative">
        {/* Compact Logo */}
        <Link className="navbar-brand py-0" to="/">
          <img
            src="media/images/logo.svg"
            alt="Zerodha Logo"
            style={{ width: "105px", display: "block" }}
          />
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar-toggler py-1 px-2 border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ width: "1.2em", height: "1.2em" }}></span>
        </button>

        {/* Compact Nav Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2 align-items-lg-center"
            style={{ fontSize: "13.5px" }}
          >
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-normal py-1 px-2" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-normal py-1 px-2" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-normal py-1 px-2" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-normal py-1 px-2" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-normal py-1 px-2" to="/support">
                Support
              </Link>
              </li>
              <li>
              <Link className="nav-link text-secondary fw-normal py-1 px-2" to="/login">
                Login
              </Link>
            </li>

            {/* Menu Icon Button */}
            <li className="nav-item ms-lg-1">
              <button
                ref={buttonRef}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="btn btn-link text-secondary text-decoration-none p-1 border-0"
                style={{ fontSize: "1.05rem", lineHeight: 1 }}
                aria-label="Toggle ecosystem menu"
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </button>
            </li>
          </ul>
        </div>

        {/* Scaled Floating Menu Panel */}
        {menuOpen && (
          <div
            ref={panelRef}
            className="bg-white border rounded shadow-lg p-4 position-absolute"
            style={{
              top: "48px",
              right: "12px",
              width: "440px",
              maxWidth: "92vw",
              zIndex: 1050,
              fontSize: "13px",
            }}
          >
            {/* Top Row: Navigation Links */}
            <div className="row pb-3">
              <div className="col-6 d-flex flex-column gap-2">
                <Link
                  to="/signup"
                  className="text-secondary text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
                <Link
                  to="/products"
                  className="text-secondary text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/support"
                  className="text-secondary text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  Support
                </Link>
              </div>

              <div className="col-6 d-flex flex-column gap-2">
                <Link
                  to="/about"
                  className="text-secondary text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/pricing"
                  className="text-secondary text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  Pricing
                </Link>
              </div>
            </div>

            {/* Middle Row: Ecosystem Apps */}
            <div className="row border-top py-3">
              <div className="col-6 d-flex flex-column gap-2">
                <a
                  href="https://kite.zerodha.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark fw-medium text-decoration-none d-flex align-items-center gap-2"
                >
                  <img
                    src="media/images/kite-logo.svg"
                    alt="Kite"
                    style={{ width: "18px" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span>Kite</span>
                </a>
                <a
                  href="https://kite.trade"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark fw-medium text-decoration-none d-flex align-items-center gap-2"
                >
                  <i className="fa fa-cube text-secondary fs-6"></i>
                  <span>Kite Connect</span>
                </a>
              </div>

              <div className="col-6 d-flex flex-column gap-2">
                <a
                  href="https://console.zerodha.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark fw-medium text-decoration-none d-flex align-items-center gap-2"
                >
                  <span
                    className="rounded-circle d-inline-block border border-2 border-primary"
                    style={{ width: "14px", height: "14px" }}
                  ></span>
                  <span>Console</span>
                </a>
                <a
                  href="https://coin.zerodha.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark fw-medium text-decoration-none d-flex align-items-center gap-2"
                >
                  <span
                    className="rounded-circle d-inline-block bg-warning border border-dark"
                    style={{ width: "14px", height: "14px" }}
                  ></span>
                  <span>Coin</span>
                </a>
              </div>
            </div>

            {/* Bottom Row: Utilities & Updates */}
            <div className="row border-top pt-3">
              <div className="col-6">
                <h6 className="fw-semibold text-dark mb-2" style={{ fontSize: "13px" }}>
                  Utilities
                </h6>
                <div className="d-flex flex-column gap-2 text-secondary">
                  <a href="#calculators" className="text-secondary text-decoration-none">
                    Calculators
                  </a>
                  <a href="#brokerage" className="text-secondary text-decoration-none">
                    Brokerage calculator
                  </a>
                  <a href="#margins" className="text-secondary text-decoration-none">
                    Margin calculator
                  </a>
                  <a href="#sip" className="text-secondary text-decoration-none">
                    SIP calculator
                  </a>
                </div>
              </div>

              <div className="col-6">
                <h6 className="fw-semibold text-dark mb-2" style={{ fontSize: "13px" }}>
                  Updates
                </h6>
                <div className="d-flex flex-column gap-2 text-secondary">
                  <a
                    href="https://zerodha.com/z-connect/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary text-decoration-none"
                  >
                    Z-Connect blog
                  </a>
                  <a href="#circulars" className="text-secondary text-decoration-none">
                    Circulars / Bulletin
                  </a>
                  <a href="#ipos" className="text-secondary text-decoration-none">
                    IPOs
                  </a>
                  <a href="#markets" className="text-secondary text-decoration-none">
                    Markets
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;