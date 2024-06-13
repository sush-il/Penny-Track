import { useEffect, useRef } from "react"

const MiniStockChart:React.FC<{tickerSymbol:string}> = ({tickerSymbol}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: tickerSymbol,
        width: '100%',
        height: '100%',
        locale: 'en',
        dateRange: '1D',
        colorTheme: 'dark',
        isTransparent: false,
        autosize: true,
        largeChartUrl: ''
      });
  
      containerRef.current?.appendChild(script);
  
      return () => {
        containerRef.current?containerRef.current.innerHTML = "" : ""
      };
    }, []);
  
    return (
        <div className="w-30 h-full" ref={containerRef}>
        </div>
    );
  };

export default MiniStockChart;