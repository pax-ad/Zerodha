import React from "react";

function Awards() {
  return (
    <section className="container my-5 py-4">
      <div className="row align-items-center">
        {/* Left Column: Awards Graphic */}
        <div className="col-12 col-lg-6 p-4 p-md-5 text-center">
          <img
            src="media/images/largestBroker.svg"
            alt="Largest stock broker in India graphic"
            className="img-fluid"
            style={{ maxHeight: "380px" }}
          />
        </div>

        {/* Right Column: Copy, Offerings & Press Logos */}
        <div className="col-12 col-lg-6 p-4 p-md-5">
          <h2 className="fs-2 fw-semibold text-dark mb-3">
            Largest stock broker in India
          </h2>
          <p className="text-muted mb-4 lead" style={{ fontSize: "1.05rem" }}>
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>

          {/* Offerings Two-Column List */}
          <div className="row mb-4">
            <div className="col-6">
              <ul className="text-secondary ps-3 mb-0" style={{ lineHeight: "2" }}>
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="text-secondary ps-3 mb-0" style={{ lineHeight: "2" }}>
                <li>Stocks &amp; IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>

          {/* Press Logos */}
          <div className="pt-2">
            <img
              src="media/images/pressLogos.png"
              alt="Press logos featuring Zerodha"
              className="img-fluid"
              style={{ width: "95%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;