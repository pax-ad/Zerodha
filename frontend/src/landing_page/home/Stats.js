import React from 'react';

function Stats() {
  return (
    <section className="container my-5 py-4">
      <div className="row align-items-center">
        {/* Left Column: Trust Value Propositions */}
        <div className="col-12 col-lg-6 p-4 p-md-5">
          <h2 className="fs-2 fw-semibold text-dark mb-5">
            Trust with confidence
          </h2>

          <div className="mb-4">
            <h3 className="fs-4 fw-medium text-dark mb-2">
              Customer-first always
            </h3>
            <p className="text-muted leading-relaxed" style={{ fontSize: '1.02rem', lineHeight: '1.7' }}>
              That&apos;s why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
              worth of equity investments.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="fs-4 fw-medium text-dark mb-2">
              No spam or gimmicks
            </h3>
            <p className="text-muted leading-relaxed" style={{ fontSize: '1.02rem', lineHeight: '1.7' }}>
              No gimmicks, spam, &ldquo;gamification&rdquo;, or annoying push notifications.
              High quality apps that you use at your pace, the way you like.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="fs-4 fw-medium text-dark mb-2">
              The Zerodha universe
            </h3>
            <p className="text-muted leading-relaxed" style={{ fontSize: '1.02rem', lineHeight: '1.7' }}>
              Not just an app, but a whole ecosystem. Our investments in 30+
              fintech startups offer you tailored services specific to your needs.
            </p>
          </div>

          <div className="mb-2">
            <h3 className="fs-4 fw-medium text-dark mb-2">
              Do better with money
            </h3>
            <p className="text-muted leading-relaxed" style={{ fontSize: '1.02rem', lineHeight: '1.7' }}>
              With initiatives like Nudge and Kill Switch, we don&apos;t just
              facilitate transactions, but actively help you do better with your
              money.
            </p>
          </div>
        </div>

        {/* Right Column: Ecosystem Graphic & CTAs */}
        <div className="col-12 col-lg-6 p-4 p-md-5 text-center">
          <img
            src="media/images/ecosystem.png"
            alt="Zerodha product ecosystem illustration"
            className="img-fluid mb-4"
            style={{ width: '90%', maxHeight: '420px', objectFit: 'contain' }}
          />

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 gap-sm-5 mt-2">
            <a
              href="/products"
              className="text-primary text-decoration-none fw-medium d-inline-flex align-items-center justify-content-center"
            >
              Explore our products
              <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
            </a>

            <a
              href="https://kite-demo.zerodha.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary text-decoration-none fw-medium d-inline-flex align-items-center justify-content-center"
            >
              Try Kite demo
              <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;