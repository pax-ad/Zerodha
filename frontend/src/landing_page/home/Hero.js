import React from "react";

function Hero() {
  return (
    <section className="container py-5 my-2 my-md-4">
      <div className="row justify-content-center text-center">
        {/* Hero Illustration */}
        <div className="col-12 mb-4">
          <img
            src="media/images/homeHero.png"
            alt="Zerodha investment ecosystem illustration"
            className="img-fluid"
            style={{ maxHeight: "380px" }}
          />
        </div>

        {/* Hero Copy */}
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="fw-semibold text-dark mb-3 fs-1">
            Invest in everything
          </h1>
          <p className="text-secondary lead fs-5 mb-4">
            Online platform to invest in stocks, derivatives, mutual funds, and more
          </p>

          {/* Action Button */}
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

export default Hero;