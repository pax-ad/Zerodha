import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container py-5 my-5">
      <div className="row justify-content-center text-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="display-4 fw-semibold text-dark mb-3">
            404 Not Found
          </h1>
          <p className="text-secondary lead fs-6 mb-4">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="btn btn-primary fw-medium px-4 py-2"
            style={{
              minWidth: "160px",
              backgroundColor: "#387ed1",
              borderColor: "#387ed1",
              fontSize: "1rem",
            }}
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;