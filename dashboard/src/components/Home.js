import React from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import WatchList from "./WatchList";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Funds from "./Funds";
import Summary from "./Summary";
import { GeneralContextProvider } from "./GeneralContext";

const Home = () => {
  return (
    <GeneralContextProvider>
      <TopBar />
      <div className="dashboard-container" style={{ display: "flex" }}>
        <WatchList />
        <div className="content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Home;