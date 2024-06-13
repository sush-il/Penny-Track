import { useEffect, useState } from "react";
import MiniStockChart from "../components/miniStockChart";
import SearchBar from "../components/searchbar";
import Sidebar from "../components/sidebar";
import SymbolStockChart from "../components/symbolStockChart";
import { getAllFavouriteTickers, removeTickerFromFavourites } from "../../utils/searchbarFunctions";

const MarketView = () => {
    
    const [allFavouritedTickers, setAllFavouritedTickers] = useState<string[]>([]);
    const [selectedTicker, setSelectedTicker] = useState("");
    const [miniChartStatus, setMiniChartStatus] = useState("flex");
    const [largeChartStatus, setLargeChartStatus] = useState("hidden");
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(()=>{
        fetchTickers();
    },[])

    const fetchTickers = async () => {
        try {
            const allTickers = await getAllFavouriteTickers();
            if (allTickers) {
                setAllFavouritedTickers(allTickers);
                setSelectedTicker(allTickers[0]);
            }
        } catch (error) {
            console.log("Error fetching tickers", error);
        }
    };

    const removeFavouriteTicker = async (ticker: string) => {
        console.log("List of all tickers: " + allFavouritedTickers );
        try {
            const tickerRemoved = await removeTickerFromFavourites(ticker);
            if (tickerRemoved) {
                // setAllFavouritedTickers([]);
                const tickersWithFavRemoved = allFavouritedTickers.filter(t => t !== ticker)
                setAllFavouritedTickers(tickersWithFavRemoved);
            }
            console.log("Updated Tickers after removal:", allFavouritedTickers);
        } catch (error) {
            console.log("Error removing ticker", error);
        }
    };

    const handleForwardButtonClick = (ticker: string) => {
        setSelectedTicker(ticker);
        if (!isLargeScreen) {
            setMiniChartStatus("hidden");
            setLargeChartStatus("flex");
        }
    };

    const handleBackButtonClick = () => {
        setMiniChartStatus("flex");
        setLargeChartStatus("hidden");
    };

    return (
        <div className="w-full min-h-screen flex flex-row bg-background text-text lg:h-screen">
            <Sidebar />
            <div className="w-full p-3 flex flex-col">
                <SearchBar setSelectedTicker={setSelectedTicker} handleForwardButtonClick={handleForwardButtonClick} />
                <div className="flex flex-row gap-2 p-3 h-5/6">
                    <div className={`${miniChartStatus} w-full gap-3 flex flex-col lg:w-1/3 lg:overflow-y-scroll`}>
                        {allFavouritedTickers.map((ticker, index) => (
                            <div key={index} className="flex flex-col p-2">
                                <div className="flex flex-row justify-between p-2">
                                    <button
                                        onClick={() => removeFavouriteTicker(ticker)}
                                        className="rounded p-2 text-center hover:bg-slate-700"
                                    >
                                        <svg
                                            className="fill-red-400 w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            width="100"
                                            height="100"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleForwardButtonClick(ticker)}
                                        className="bg-teal-400 p-2 rounded w-1/6 flex justify-center hover:bg-teal-300"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                        >
                                            <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                                        </svg>
                                    </button>
                                </div>
                                <MiniStockChart tickerSymbol={ticker} />
                            </div>
                        ))}
                    </div>
                    <div className={`${largeChartStatus} w-full max-h-screen flex-col lg:flex`}>
                        {miniChartStatus === "hidden" && (
                            <button
                                onClick={handleBackButtonClick}
                                className="bg-teal-400 self-end p-2 rounded w-1/6 flex justify-center hover:bg-teal-300"
                            >
                                <svg
                                    className="w-6 h-6 rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                >
                                    <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                                </svg>
                            </button>
                        )}
                        <SymbolStockChart tickerSymbol={selectedTicker} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketView;
