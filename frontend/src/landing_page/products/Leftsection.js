import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <section className="container my-5 py-3">
      <div className="row align-items-center">
        {/* Left Column: Product Showcase Graphic */}
        <div className="col-12 col-lg-6 text-center mb-4 mb-lg-0">
          <img
            src={imageURL}
            alt={productName || "Product showcase illustration"}
            className="img-fluid"
            style={{ maxHeight: "380px" }}
          />
        </div>

        {/* Right Column: Content, Links & App Badges */}
        <div className="col-12 col-lg-6 p-4 p-md-5">
          <h2 className="fs-2 fw-semibold text-dark mb-3">{productName}</h2>
          <p
            className="text-secondary lead fs-6 mb-4"
            style={{ lineHeight: "1.8" }}
          >
            {productDesription}
          </p>

          {/* Action Links */}
          <div className="d-flex align-items-center gap-4 mb-4">
            {tryDemo && (
              <a
                href={tryDemo}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-decoration-none fw-medium"
              >
                Try Demo{" "}
                <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
              </a>
            )}
            {learnMore && (
              <a
                href={learnMore}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-decoration-none fw-medium"
              >
                Learn More{" "}
                <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
              </a>
            )}
          </div>

          {/* Store Download Badges */}
          <div className="d-flex align-items-center gap-3">
            {googlePlay && (
              <a href={googlePlay} target="_blank" rel="noreferrer">
                <img
                  src="media/images/googlePlayBadge.svg"
                  alt="Get it on Google Play"
                  style={{ height: "40px" }}
                />
              </a>
            )}
            {appStore && (
              <a href={appStore} target="_blank" rel="noreferrer">
                <img
                  src="media/images/appstoreBadge.svg"
                  alt="Download on the App Store"
                  style={{ height: "40px" }}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeftSection;