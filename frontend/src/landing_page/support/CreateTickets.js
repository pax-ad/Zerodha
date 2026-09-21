import React from "react";

function CreateTickets() {
  const topics = [
    {
      title: "Account Opening",
      icon: "fa-plus-circle",
      links: [
        "Online Account Opening",
        "Offline Account Opening",
        "Company, Partnership and HUF Account Opening",
        "NRI Account Opening",
        "Charges at Zerodha",
        "Zerodha IDFC FIRST Bank 3-in-1 Account",
        "Getting Started",
      ],
    },
    {
      title: "Your Zerodha Account",
      icon: "fa-user-o",
      links: [
        "Login Credentials",
        "Account Modification and Segment Addition",
        "CMR & DP ID",
        "Nomination",
        "Transfer and Conversion of Shares",
      ],
    },
    {
      title: "Trading and Markets",
      icon: "fa-bar-chart",
      links: [
        "Trading FAQs",
        "Kite",
        "Margins",
        "Product and Order Types",
        "Corporate Actions",
        "Kite Features",
      ],
    },
    {
      title: "Funds",
      icon: "fa-credit-card",
      links: [
        "Fund Withdrawal",
        "Adding Funds",
        "Adding Bank Accounts",
        "eMandates",
      ],
    },
    {
      title: "Console",
      icon: "fa-circle-o-notch",
      links: [
        "IPO",
        "Portfolio",
        "Funds Statement",
        "Profile",
        "Reports",
        "Referral Program",
      ],
    },
    {
      title: "Coin",
      icon: "fa-circle-thin",
      links: [
        "Understanding Mutual Funds",
        "About Coin",
        "Buying and Selling through Coin",
        "Starting an SIP",
        "Managing SIPs",
        "Coin App",
      ],
    },
  ];

  return (
    <section className="container my-5 py-4">
      <h2 className="fs-3 fw-normal text-secondary mb-5 px-3">
        To create a ticket, select a relevant topic
      </h2>

      <div className="row g-4">
        {topics.map((topic, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 px-3 mb-4">
            <h3 className="fs-5 fw-medium text-dark mb-3 d-flex align-items-center">
              <i
                className={`fa ${topic.icon} me-2 text-secondary`}
                aria-hidden="true"
              ></i>
              {topic.title}
            </h3>
            <ul className="list-unstyled d-flex flex-column gap-2 ps-4">
              {topic.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-primary text-decoration-none fw-normal"
                    style={{ fontSize: "14px", lineHeight: "1.8" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CreateTickets;