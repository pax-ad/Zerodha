import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img src="media/images/homeHero.png" alt="Hero Image mb-5" />
        <h1 className="mt-5">Invest in everything</h1>
        <p>online platform to invest in stocks , derivatives, mutual funds, </p>
        <button
          className="p-2 btn btn-primary f-s"
          style={{ width: "35%", margin: "0 auto" }}
        >
          {" "}
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Hero;
