import React from "react";

function OpenAccount() {
  return (
    <section className="container py-5 mb-4">
      <div className="row justify-content-center text-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="fs-2 fw-semibold text-dark mb-3">
            Open a Zerodha account
          </h2>
          <p className="text-secondary lead fs-6 mb-4">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
            F&amp;O trades.
          </p>
          <button
            type="button"
            className="btn btn-primary fw-medium px-4 py-2"
            style={{
              minWidth: "180px",
              backgroundColor: "#387ed1",
              borderColor: "#387ed1",
              fontSize: "1.05rem",
            }}
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Sign up now
          </button>
        </div>
      </div>
    </section>
  );
}

export default OpenAccount;