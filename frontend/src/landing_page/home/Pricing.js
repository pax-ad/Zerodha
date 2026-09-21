import React from "react";


function Pricing() {
  return (
    <>
      <main className="container my-5 py-4">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-4 mb-lg-0">
            <h1 className="mb-3 fw-bold">Unbeatable Pricing</h1>
            <p className="text-muted leading-relaxed">
              We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
            </p>
            <a href="#charges" className="text-decoration-none fw-semibold">
              See our detailed pricing <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>

          <div className="col-lg-1"></div>

          <div className="col-12 col-lg-6">
            <div className="row g-3 text-center">
              <div className="col-sm-6">
                <div className="p-4 border rounded bg-light shadow-sm h-100">
                  <h1 className="display-5 fw-bold text-dark">₹0</h1>
                  <p className="text-muted mb-0">Free equity delivery and direct mutual funds</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-4 border rounded bg-light shadow-sm h-100">
                  <h1 className="display-5 fw-bold text-dark">₹20</h1>
                  <p className="text-muted mb-0">Intraday and F&amp;O trades per executed order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </>
  );
}

export default Pricing;