// dashboard/src/components/GeneralContext.js
import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode, availableQty) => {},
  closeBuyWindow: () => {},
  refreshCounter: 0,
  triggerRefresh: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");
  const [orderQty, setOrderQty] = useState(1);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleOpenBuyWindow = (uid, mode = "BUY", availableQty = 1) => {
    setSelectedStockUID(uid);
    setOrderMode(mode);
    setOrderQty(availableQty > 0 ? availableQty : 1);
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
    setOrderQty(1);
  };

  const triggerRefresh = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        refreshCounter,
        triggerRefresh,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          initialMode={orderMode}
          availableQty={orderQty}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;