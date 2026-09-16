import React, { useState, useEffect, useContext, useMemo } from "react";
import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist as initialWatchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";
import { simulatePriceChange } from "../utils/ticker";

const WatchList = () => {
  const [stocks, setStocks] = useState(initialWatchlist);
  const [searchTerm, setSearchTerm] = useState("");

  // Live price simulation ticker (ticks every 2.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const oldPrice = Number(stock.price || 0);
          const newPrice = simulatePriceChange(oldPrice);
          const isDown = newPrice < oldPrice;
          const diffPercent = (((newPrice - oldPrice) / (oldPrice || 1)) * 100).toFixed(2);

          return {
            ...stock,
            price: newPrice,
            isDown,
            percent: `${diffPercent >= 0 ? "+" : ""}${diffPercent}%`,
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Filter based on search input
  const filteredWatchlist = useMemo(() => {
    const cleanQuery = searchTerm.trim().toLowerCase();
    if (!cleanQuery) return stocks;
    return stocks.filter((stock) =>
      stock.name.toLowerCase().includes(cleanQuery)
    );
  }, [searchTerm, stocks]);

  // Dynamic Doughnut Chart Data
  const chartLabels = filteredWatchlist.map((stock) => stock.name);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Price",
        data: filteredWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts">
          {filteredWatchlist.length} / {stocks.length}
        </span>
      </div>

      <ul className="list">
        {filteredWatchlist.length === 0 ? (
          <li style={{ padding: "16px", textAlign: "center", color: "#888" }}>
            No instruments found matching "{searchTerm}"
          </li>
        ) : (
          filteredWatchlist.map((stock, index) => (
            <WatchListItem stock={stock} key={stock.name || index} />
          ))
        )}
      </ul>

      {filteredWatchlist.length > 0 && <DoughnutChart data={chartData} />}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{Number(stock.price || 0).toFixed(2)}</span>
        </div>
      </div>

      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    if (generalContext?.openBuyWindow) {
      generalContext.openBuyWindow(uid, "BUY");
    }
  };

  const handleSellClick = () => {
    if (generalContext?.openBuyWindow) {
      generalContext.openBuyWindow(uid, "SELL");
    }
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={handleSellClick}>
            Sell
          </button>
        </Tooltip>

        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" type="button">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" type="button">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};