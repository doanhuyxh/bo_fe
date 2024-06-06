import React from "react";
import { useState, useEffect } from "react";

const Connection = () => {
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");
  const [iframeSrc, setIframeSrc] = useState("");
  const [height, setHeight] = useState("600px");

  useEffect(() => {
    const params = {
      autosize: true,
      support_host: "https://www.tradingview.com",
      symbol: symbol,
      interval: "1",
      timezone: "Asia/Ho_Chi_Minh",
      theme: "dark",
      withdateranges: true,
      hide_side_toolbar: true,
      style: "8",
      hide_top_toolbar: false,
      hide_legend: true,
      save_image: true,
      container_id: "tradingview",
      popup_width: "1000",
      popup_height: "650",
      utm_source: "vn-trader.net",
      utm_medium: "widget",
      utm_campaign: "advanced-chart",
    };

    const src = `https://www.tradingview-widget.com/embed-widget/advanced-chart/#${encodeURIComponent(
      JSON.stringify(params)
    )}`;
    setIframeSrc(src);

    const updateHeight = () => {
      if (window.innerWidth <= 768) {
        setHeight("400px");
      } else {
        setHeight("600px");
      }
    };

    // Update height on initial render
    updateHeight();

    // Update height on window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateHeight);

  }, [symbol]);

  return (
    <div style={{ minHeight: height }}>
      <iframe src={iframeSrc} style={{ width: "100%", height }}></iframe>
    </div>
  );
};

export default Connection;
