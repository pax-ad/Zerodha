import React from "react";
import Navbar from "../Navbar"; // Adjust path if Navbar is in a different folder
import Footer from "../Footer"; // Adjust path if Footer is in a different folder
import Login from "./Login";

function LoginPage() {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}

export default LoginPage;