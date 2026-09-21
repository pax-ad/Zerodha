import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)", borderTop: "1px solid #eee" }}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-12 col-md-3">
            <img
              src="media/images/logo.svg"
              alt="Zerodha logo"
              style={{ width: "130px", marginBottom: "16px" }}
            />
            <p className="text-muted" style={{ fontSize: "13px", lineHeight: "1.6" }}>
              &copy; 2010 - 2026, Not Zerodha Broking Ltd.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Company Links */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold text-dark mb-3">Company</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "14px" }}>
              <li><a href="#about" className="text-muted text-decoration-none">About</a></li>
              <li><a href="#products" className="text-muted text-decoration-none">Products</a></li>
              <li><a href="#pricing" className="text-muted text-decoration-none">Pricing</a></li>
              <li><a href="#referral" className="text-muted text-decoration-none">Referral programme</a></li>
              <li><a href="#careers" className="text-muted text-decoration-none">Careers</a></li>
              <li><a href="#tech" className="text-muted text-decoration-none">Zerodha.tech</a></li>
              <li><a href="#press" className="text-muted text-decoration-none">Press &amp; media</a></li>
              <li><a href="#csr" className="text-muted text-decoration-none">Zerodha cares (CSR)</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold text-dark mb-3">Support</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "14px" }}>
              <li><a href="#contact" className="text-muted text-decoration-none">Contact</a></li>
              <li><a href="#support" className="text-muted text-decoration-none">Support portal</a></li>
              <li><a href="#blog" className="text-muted text-decoration-none">Z-Connect blog</a></li>
              <li><a href="#charges" className="text-muted text-decoration-none">List of charges</a></li>
              <li><a href="#downloads" className="text-muted text-decoration-none">Downloads &amp; resources</a></li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold text-dark mb-3">Account</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "14px" }}>
              <li><a href="#open-account" className="text-muted text-decoration-none">Open an account</a></li>
              <li><a href="#fund-transfer" className="text-muted text-decoration-none">Fund transfer</a></li>
              <li><a href="#60-day-challenge" className="text-muted text-decoration-none">60 day challenge</a></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Compliance Notices */}
        <div
          className="mt-5 pt-4 border-top text-muted"
          style={{ fontSize: "12px", lineHeight: "1.7" }}
        >
          <p className="mb-2">
            Zerodha Broking Ltd.: Member of NSE &amp; BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to{" "}
            <a href="mailto:complaints@zerodha.com" className="text-decoration-none">
              complaints@zerodha.com
            </a>
            , for DP related to{" "}
            <a href="mailto:dp@zerodha.com" className="text-decoration-none">
              dp@zerodha.com
            </a>
            . Please ensure you carefully read the Risk Disclosure Document as
            prescribed by SEBI | ICF.
          </p>

          <p className="mb-2">
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name, PAN,
            Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances.
          </p>

          <p className="mb-2">
            Investments in securities market are subject to market risks; read all
            the related documents carefully before investing.
          </p>

          <p className="mb-0">
            &quot;Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same process
            again when you approach another intermediary.&quot; Dear Investor, if
            you are subscribing to an IPO, there is no need to issue a cheque.
            Please write the Bank account number and sign the IPO application
            form to authorize your bank to make payment in case of allotment. In
            case of non allotment the funds will remain in your bank account. As a
            business we don&apos;t give stock tips, and have not authorized
            anyone to trade on behalf of others. If you find anyone claiming to be
            part of Zerodha and offering such services, please create a ticket
            here.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;