import React from "react";

function Hero() {
  return (
    <section className="container border-bottom mb-5">
      <div className="row justify-content-center text-center mt-5 p-3">
        <div className="col-12 col-md-8">
          <h1 className="fw-semibold text-dark mb-2">Technology</h1>
          <h3 className="text-secondary mt-3 fs-4 fw-normal">
            Sleek, modern, and intuitive trading platforms
          </h3>
          <p className="mt-3 mb-5 text-muted">
            Check out our{" "}
            <a
              href="#offerings"
              className="text-primary text-decoration-none fw-medium"
            >
              investment offerings{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;