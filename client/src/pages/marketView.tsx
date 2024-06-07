import MiniStockChart from "../components/miniStockChart";
import SearchBar from "../components/searchbar";
import Sidebar from "../components/sidebar";
import SymbolStockChart from "../components/symbolStockChart";

const MarketView = () => {
    const allTickers = [1,2,3,4,5,6,8]
    return (
        <div className="w-full h-screen flex flex-row ">
            <Sidebar />
            <div className="w-full p-3 flex flex-col">
                <SearchBar />
                <div className="flex flex-row gap-2 p-3 h-5/6">
                    <div className="w-full h-full gap-3 flex flex-col  lg:w-1/3 lg:overflow-y-scroll">
                        {
                            allTickers.map((_,index)=>(
                                <div key={index} className="flex flex-col p-2">
                                    <div className="flex flex-row justify-between p-2">
                                        <button className="text-white bg-red-400 rounded p-2 text-center font-bold"> Cancel </button>
                                        <button className="text-white bg-teal-400 p-2 rounded w-1/6"> View </button>
                                    </div>
                                    <MiniStockChart />
                                </div>
                            ))
                        }
                    </div>
                    
                    <div className="hidden w-full h-full  lg:flex">
                        <SymbolStockChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketView;