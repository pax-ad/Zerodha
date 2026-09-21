import React, { useState, useCallback, useMemo } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode, availableQty) => {},
  closeBuyWindow: () => {},
  refreshCounter: 0,
  triggerRefresh: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");
  const [orderQty, setOrderQty] = useState(1);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleOpenBuyWindow = useCallback((uid, mode = "BUY", availableQty = 1) => {
    const parsedQty = parseInt(availableQty, 10);
    const sanitizedQty = !isNaN(parsedQty) && parsedQty > 0 ? parsedQty : 1;

    setSelectedStockUID(uid || "");
    setOrderMode(mode === "SELL" ? "SELL" : "BUY");
    setOrderQty(sanitizedQty);
    setIsBuyWindowOpen(true);
  }, []);

  const handleCloseBuyWindow = useCallback(() => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
    setOrderQty(1);
  }, []);

  const triggerRefresh = useCallback(() => {
    setRefreshCounter((prev) => prev + 1);
  }, []);

  const contextValue = useMemo(
    () => ({
      openBuyWindow: handleOpenBuyWindow,
      closeBuyWindow: handleCloseBuyWindow,
      refreshCounter,
      triggerRefresh,
    }),
    [handleOpenBuyWindow, handleCloseBuyWindow, refreshCounter, triggerRefresh]
  );

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          key={`${selectedStockUID}-${orderMode}`}
          uid={selectedStockUID}
          initialMode={orderMode}
          availableQty={orderQty}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;