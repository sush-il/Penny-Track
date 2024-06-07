const data = {
    colorTheme: 'dark',
    dateRange: '1D',
    showChart: true,
    locale: 'en',
    width: '100%',
    height: '100%',
    largeChartUrl: '',
    isTransparent: false,
    showSymbolLogo: true,
    showFloatingTooltip: false,
    plotLineColorGrowing: 'rgba(24, 196, 128, 1)',
    plotLineColorFalling: 'rgba(255, 0, 0, 1)',
    gridLineColor: 'rgba(151, 0, 0, 0)',
    scaleFontColor: 'rgba(209, 212, 220, 1)',
    belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
    belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
    symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
    tabs: [
      {
        title: 'Indices',
        symbols: [
          { s: 'FOREXCOM:SPXUSD', d: 'S&P 500 Index' },
          { s: 'FOREXCOM:DJI', d: 'Dow Jones Industrial Average Index' },
          { s: 'FOREXCOM:UKXGBP', d: 'FTSE 100 Index' },
          { s: 'NASDAQ:TSLA' },
          { s: 'NYSE:PLTR' },
          { s: 'NASDAQ:AAPL' },
          { s: 'NASDAQ:MSFT' },
          { s: 'NYSE:DIS' },
          { s: 'NASDAQ:GOOGL' },
          { s: 'NASDAQ:META' }
        ],
        originalTitle: 'Indices'
      },
      {
        title: 'Forex',
        symbols: [
          { s: 'FX:EURUSD', d: 'EUR to USD' },
          { s: 'FX:GBPUSD', d: 'GBP to USD' },
          { s: 'FX:USDJPY', d: 'USD to JPY' },
          { s: 'FX:USDCHF', d: 'USD to CHF' },
          { s: 'FX:AUDUSD', d: 'AUD to USD' },
          { s: 'FX:USDCAD', d: 'USD to CAD' }
        ],
        originalTitle: 'Forex'
      }
    ]
  }

export default data;