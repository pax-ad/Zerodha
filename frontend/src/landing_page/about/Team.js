import React from "react";

function Team() {
  return (
    <section className="container py-4 py-md-5">
      {/* Section Header */}
      <div className="row border-top pt-5 pb-3">
        <h2 className="text-center text-dark fw-semibold">People</h2>
      </div>

      {/* Profile & Biography Row */}
      <div
        className="row align-items-center text-secondary py-3"
        style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
      >
        {/* Founder Portrait & Titles */}
        <div className="col-12 col-md-6 p-4 text-center">
          <img
            src="media/images/nithinKamath.jpg"
            alt="Nithin Kamath - Founder and CEO of Zerodha"
            className="rounded-circle shadow-sm"
            style={{ width: "55%", maxWidth: "260px", objectFit: "cover" }}
          />
          <h4 className="mt-4 mb-1 text-dark fw-medium">Nithin Kamath</h4>
          <p className="text-muted mb-0">Founder, CEO</p>
        </div>

        {/* Bio & Links */}
        <div className="col-12 col-md-6 p-4">
          <p className="mb-3">
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade-long stint as a trader. Today,
            Zerodha has transformed the landscape of the Indian broking industry.
          </p>
          <p className="mb-3">
            He is an active member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p className="mb-4">Playing basketball is his zen.</p>
          <p className="mb-0">
            Connect on{" "}
            <a
              href="https://nithinkamath.me"
              target="_blank"
              rel="noreferrer"
              className="text-primary text-decoration-none fw-medium"
            >
              Homepage
            </a>{" "}
            /{" "}
            <a
              href="https://tradingqna.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary text-decoration-none fw-medium"
            >
              TradingQnA
            </a>{" "}
            /{" "}
            <a
              href="https://twitter.com/Nithin0dha"
              target="_blank"
              rel="noreferrer"
              className="text-primary text-decoration-none fw-medium"
            >
              Twitter
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Team;