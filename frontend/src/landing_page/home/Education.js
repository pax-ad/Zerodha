import React from "react";

function Education() {
  return (
    <section className="container my-5 py-4">
      <div className="row align-items-center">
        {/* Left Column: Education Graphic */}
        <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center">
          <img
            src="media/images/education.svg"
            alt="Market education illustration"
            className="img-fluid"
            style={{ width: "75%", maxHeight: "350px" }}
          />
        </div>

        {/* Right Column: Educational Resources */}
        <div className="col-12 col-lg-6">
          <h2 className="fs-2 fw-semibold text-dark mb-3">
            Free and open market education
          </h2>

          <div className="mb-4">
            <p className="text-muted lead" style={{ fontSize: "1.05rem" }}>
              Varsity, the largest online stock market education book in the
              world covering everything from the basics to advanced trading.
            </p>
            <a
              href="https://zerodha.com/varsity/"
              target="_blank"
              rel="noreferrer"
              className="text-primary text-decoration-none fw-medium"
            >
              Varsity <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>

          <div className="mt-4">
            <p className="text-muted lead" style={{ fontSize: "1.05rem" }}>
              TradingQ&amp;A, the most active trading and investment community in
              India for all your market-related queries.
            </p>
            <a
              href="https://tradingqna.com/"
              target="_blank"
              rel="noreferrer"
              className="text-primary text-decoration-none fw-medium"
            >
              TradingQ&amp;A <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;