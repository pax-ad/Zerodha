import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <section className="container my-5 py-3">
      <div className="row align-items-center">
        {/* Content Column (Appears first on desktop, second on mobile if ordered) */}
        <div className="col-12 col-lg-6 p-4 p-md-5 order-2 order-lg-1">
          <h2 className="fs-2 fw-semibold text-dark mb-3">{productName}</h2>
          <p
            className="text-secondary lead fs-6 mb-4"
            style={{ lineHeight: "1.8" }}
          >
            {productDesription}
          </p>
          <div>
            <a
              href={learnMore}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-decoration-none fw-medium"
            >
              Learn More{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className="col-12 col-lg-6 text-center mb-4 mb-lg-0 order-1 order-lg-2">
          <img
            src={imageURL}
            alt={productName || "Product illustration"}
            className="img-fluid"
            style={{ maxHeight: "380px" }}
          />
        </div>
      </div>
    </section>
  );
}

export default RightSection;