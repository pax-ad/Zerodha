import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';


import Homepage from './landing_page/home/Homepage';
import Signup from './landing_page/signup/signup';
import AboutPage from './landing_page/about/Aboutpage';
import ProducPage from './landing_page/products/Productionpage';
import PricingPage from './landing_page/pricing/Pricingpage';
import SupportPage from './landing_page/support/Supportpage';


import Notfound from "./landing_page/Notfound";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProducPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  </BrowserRouter>
);

