import React, { useEffect, useRef } from 'react';

interface SingleTickerProps {
  symbol: string;
  width?: string;
  isTransparent?: boolean;
  colorTheme?: 'light' | 'dark';
  locale?: string;
  largeChartUrl?: string;
}

const SingleTicker: React.FC<SingleTickerProps> = ({
        symbol,
        width = '100%',
        isTransparent = false,
        colorTheme = 'dark',
        locale = 'en',
        largeChartUrl = ''
    }) => {
    
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current) {
        container.current.innerHTML = '';

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbol,
            width,
            isTransparent,
            colorTheme,
            locale,
            largeChartUrl,
        });

        container.current.appendChild(script);
        }
    }, [symbol, width, isTransparent, colorTheme, locale, largeChartUrl]);

    return (
        <div className="tradingview-widget-container" ref={container}>
        </div>
    );
};

export default SingleTicker;
