import React from "react";

function Hero() {
  return (
    <header
      className="text-white py-5"
      style={{ backgroundColor: "#387ed1", minHeight: "420px" }}
    >
      <div className="container py-2">
        {/* Top Bar: Portal Title & Track Tickets Link */}
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-white-50 pb-3">
          <h2 className="fs-4 fw-normal mb-0">Support Portal</h2>
          <a
            href="#track-tickets"
            className="text-white text-decoration-underline fs-6"
          >
            Track tickets
          </a>
        </div>

        {/* Main Content Row */}
        <div className="row g-5">
          {/* Left Column: Search & Quick Suggestions */}
          <div className="col-12 col-lg-7">
            <h1 className="fs-3 fw-normal mb-4" style={{ lineHeight: "1.5" }}>
              Search for an answer or browse help topics to create a ticket
            </h1>

            {/* Search Input Field */}
            <div className="position-relative mb-4">
              <input
                type="text"
                className="form-control form-control-lg border-0 shadow-sm py-3 px-4 rounded-1 text-dark"
                placeholder="Eg: how do I activate F&O, why is my order getting rejected..."
                style={{ fontSize: "15px" }}
              />
            </div>

            {/* Quick Links Tags */}
            <div className="d-flex flex-wrap gap-3" style={{ fontSize: "14px" }}>
              <a
                href="#track-account"
                className="text-white text-decoration-underline"
              >
                Track account opening
              </a>
              <a
                href="#track-segment"
                className="text-white text-decoration-underline"
              >
                Track segment activation
              </a>
              <a
                href="#intraday-margins"
                className="text-white text-decoration-underline"
              >
                Intraday margins
              </a>
              <a
                href="#kite-manual"
                className="text-white text-decoration-underline"
              >
                Kite user manual
              </a>
            </div>
          </div>

          {/* Right Column: Featured Announcements */}
          <div className="col-12 col-lg-5 ps-lg-5">
            <h2 className="fs-4 fw-normal mb-4">Featured</h2>
            <ol className="ps-3 d-flex flex-column gap-3" style={{ fontSize: "15px" }}>
              <li>
                <a
                  href="#takeovers"
                  className="text-white text-decoration-underline"
                  style={{ lineHeight: "1.7" }}
                >
                  Current Takeovers and Delisting - January 2024
                </a>
              </li>
              <li>
                <a
                  href="#leverages"
                  className="text-white text-decoration-underline"
                  style={{ lineHeight: "1.7" }}
                >
                  Latest Intraday leverages - MIS &amp; CO
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;