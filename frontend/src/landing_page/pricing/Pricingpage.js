import React from "react";
import Hero from "./Hero";
import Brokerage from "./Brokerage";
import OpenAccount from "../Openaccount";
import Navbar from "../Navbar";
import Footer from "../Footer";

function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OpenAccount />
        <Brokerage />
      </main>
      <Footer />
    </>
  );
}

export default PricingPage;