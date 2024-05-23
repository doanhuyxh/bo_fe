import React from "react";
import { useState, useEffect } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";


//const Connection = ({ payload, betRecordChange, typeMoney }) => {
const Connection = () => {
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");

  useEffect(() => {
    
  }, [symbol]);

  return (
    <>
      <TradingViewWidget
        symbol={symbol}
        theme={Themes.DARK}
        locale="vi"
        minHeight="225"
        width="100%"
        interval= "1"
        timezone="Asia/Ho_Chi_Minh"
      />
    </>
  );
};

export default Connection;
