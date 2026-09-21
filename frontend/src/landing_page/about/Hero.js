import React from "react";

function Hero() {
  return (
    <section className="container py-4 py-md-5">
      {/* Hero Headline */}
      <div className="row justify-content-center py-4 my-2 my-md-4">
        <div className="col-12 col-lg-10 text-center">
          <h1 className="fs-2 fw-semibold text-dark lh-base">
            We pioneered the discount broking model in India.
            <br className="d-none d-md-block" />
            Now, we are breaking ground with our technology.
          </h1>
        </div>
      </div>

      {/* Two-Column About Story */}
      <div className="row border-top pt-4 pt-md-5 text-secondary lead" style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
        <div className="col-12 col-md-6 px-3 px-md-4 mb-4 mb-md-0">
          <p className="mb-4">
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company
            Zerodha, a combination of Zero and &ldquo;Rodha&rdquo;, the Sanskrit word for
            barrier.
          </p>
          <p className="mb-4">
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <p className="mb-0">
            Over 1+ Crore clients place millions of orders every day through our
            powerful ecosystem of investment platforms, contributing over 15% of
            all Indian retail trading volumes.
          </p>
        </div>

        <div className="col-12 col-md-6 px-3 px-md-4">
          <p className="mb-4">
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p className="mb-4">
            <a 
              href="https://rainmatter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-primary text-decoration-none fw-medium"
            >
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing the Indian capital markets.
          </p>
          <p className="mb-0">
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our{" "}
            <a href="#blog" className="text-primary text-decoration-none fw-medium">
              blog
            </a>{" "}
            or see what the{" "}
            <a href="#media" className="text-primary text-decoration-none fw-medium">
              media is saying about us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;