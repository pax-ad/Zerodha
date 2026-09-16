import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Page Imports
import Homepage from './landing_page/home/Homepage';
import SignupPage from './landing_page/signup/SignupPage';
import LoginPage from './landing_page/login/LoginPage';
import AboutPage from './landing_page/about/Aboutpage';
import ProducPage from './landing_page/products/Productionpage';
import PricingPage from './landing_page/pricing/Pricingpage';
import SupportPage from './landing_page/support/Supportpage';
import Notfound from './landing_page/Notfound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProducPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* Catch-all route MUST be at the very end */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  </BrowserRouter>
);