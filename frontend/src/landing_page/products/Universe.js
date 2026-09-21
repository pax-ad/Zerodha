import React from "react";

function Universe() {
  const partners = [
    {
      img: "media/images/zerodhaFundhouse.png",
      name: "Zerodha Fund House",
      desc: "Our asset management venture that is creating simple and transparent index funds to help you save for your goals.",
      url: "https://zerodhafundhouse.com",
    },
    {
      img: "media/images/sensibullLogo.svg",
      name: "Sensibull",
      desc: "Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.",
      url: "https://sensibull.com",
    },
    {
      img: "media/images/tijori.svg",
      name: "Tijori",
      desc: "Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.",
      url: "https://tijorifinance.com",
    },
    {
      img: "media/images/streakLogo.png",
      name: "Streak",
      desc: "Systematic trading platform that allows you to create and backtest strategies without coding.",
      url: "https://streak.tech",
    },
    {
      img: "media/images/smallcaseLogo.png",
      name: "smallcase",
      desc: "Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.",
      url: "https://smallcase.com",
    },
    {
      img: "media/images/dittoLogo.png",
      name: "Ditto",
      desc: "Personalized advice on life and health insurance. No spam and no mis-selling.",
      url: "https://joinditto.in",
    },
  ];

  return (
    <section className="container my-5 py-4">
      <div className="text-center mb-5">
        <h2 className="fs-2 fw-semibold text-dark mb-3">The Zerodha Universe</h2>
        <p className="text-secondary lead fs-6">
          Extend your trading and investment experience even further with our partner platforms
        </p>
      </div>

      <div className="row g-4 justify-content-center text-center">
        {partners.map((partner, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4 p-3 d-flex flex-column align-items-center">
            <a
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none d-flex flex-column align-items-center"
            >
              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{ height: "60px", width: "180px" }}
              >
                <img
                  src={partner.img}
                  alt={`${partner.name} logo`}
                  className="img-fluid"
                  style={{ maxHeight: "45px", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              <p
                className="text-muted px-2"
                style={{ fontSize: "12px", lineHeight: "1.6", maxWidth: "260px" }}
              >
                {partner.desc}
              </p>
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
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
    </section>
  );
}

export default Universe;