import React from "react";

function Hero() {
  return (
    <section className="container text-center mt-5 p-4 border-bottom">
      <h1 className="fw-semibold text-dark">Pricing</h1>
      <h3 className="text-muted fs-5 mt-3">
        Free equity investments and flat ₹20 intraday and F&amp;O trades
      </h3>

      <div className="row my-5 py-4 g-4 text-center justify-content-center">
        <div className="col-12 col-md-4">
          <div className="p-4">
            <h1 className="display-4 fw-medium text-dark">₹0</h1>
            <h4 className="fs-5 mt-3 text-dark">Free equity delivery</h4>
            <p className="text-muted mt-3" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              All equity delivery investments (NSE, BSE) are absolutely free — ₹0 brokerage.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="p-4">
            <h1 className="display-4 fw-medium text-dark">₹20</h1>
            <h4 className="fs-5 mt-3 text-dark">Intraday and F&amp;O trades</h4>
            <p className="text-muted mt-3" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="p-4">
            <h1 className="display-4 fw-medium text-dark">₹0</h1>
            <h4 className="fs-5 mt-3 text-dark">Free direct MF</h4>
            <p className="text-muted mt-3" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              All direct mutual fund investments are absolutely free — ₹0 commissions &amp; DP charges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;