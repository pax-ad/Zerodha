import React from "react";

import Hero from "./Hero";
import CreateTickets from "./CreateTickets";
import Navbar from "../Navbar";
import Footer from "../Footer";

function SupportPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CreateTickets />
      </main>
      <Footer />
    </>
  );
}

export default SupportPage;