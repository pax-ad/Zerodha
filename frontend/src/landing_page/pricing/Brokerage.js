import React from "react";

function Brokerage() {
  return (
    <section className="container my-5">
      <div className="row border-top pt-5">
        {/* Left Column: Brokerage Details & Rules */}
        <div className="col-12 col-md-8 p-3 p-md-4">
          <a
            href="https://zerodha.com/brokerage-calculator/"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none"
          >
            <h3 className="fs-5 fw-medium text-primary mb-4 text-center text-md-start">
              Brokerage calculator
            </h3>
          </a>

          <ul
            className="text-secondary ps-3"
            style={{ lineHeight: "2", fontSize: "13px" }}
          >
            <li className="mb-2">
              Call &amp; Trade and RMS auto-squareoff: Additional charges of ₹50 +
              GST per order.
            </li>
            <li className="mb-2">Digital contract notes will be sent via e-mail.</li>
            <li className="mb-2">
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>
            <li className="mb-2">
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>
            <li className="mb-2">
              For NRI account (PIS), 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>

        {/* Right Column: Quick Link to List of Charges */}
        <div className="col-12 col-md-4 p-3 p-md-4 text-center text-md-start">
          <a
            href="#charges"
            className="text-decoration-none"
          >
            <h3 className="fs-5 fw-medium text-primary mb-4">
              List of charges
            </h3>
          </a>
          <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1.7" }}>
            Explore statutory levies, regulatory fees, stamp duty rates, and
            detailed charge breakdowns across equity, currency, and commodity
            segments.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Brokerage;