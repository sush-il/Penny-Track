import { useEffect, useState } from "react";
import tickers from "../../utils/tickersList"
import SingleTicker from "./singleTicker";
import { Dispatch, SetStateAction } from 'react';
import {addTickerToFavourites} from "../../utils/searchbarFunctions";

interface searchBarProps{
    setSelectedTicker?: Dispatch<SetStateAction<string>>;
    handleForwardButtonClick? : (selectedTicker:string) => void;
}

const SearchBar:React.FC<searchBarProps> = ({ setSelectedTicker, handleForwardButtonClick })  => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTickers, setFilteredTickers] = useState(tickers);

    const handleSearch = (event:any) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = tickers.filter((ticker) =>
          ticker.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTickers(filtered);
      };

    const handleButtonClick = (ticker:string) => {
        setSearchTerm("");
        setSelectedTicker && setSelectedTicker(ticker);
        handleForwardButtonClick && handleForwardButtonClick(ticker);
    }

    const handleFavourites = async (ticker:string) => {
        try{
            const response = await addTickerToFavourites(ticker);
        }catch{

        }
    }

    // useEffect(()=>{

    // },[])

    return(  
        <div className="w-full p-3">   
            {/* <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
            <div className="relative w-full lg:w-1/3">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input onChange={handleSearch} value={searchTerm} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Companies, Tickers ..." required />
                {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                {
                    searchTerm && 
                    <div className="rounded gap-2 p-2 w-full max-h-96 absolute flex flex-col overflow-x-hidden overflow-scroll bg-opacity-70 backdrop-blur-md">
                        {filteredTickers.slice(0,5).map((ticker, index) => (
                            <div className="bg-background bg-opacity-80 p-2 rounded-lg flex flex-row w-full items-center">
                                <SingleTicker key={index} symbol={ticker} />
                                <div className="flex flex-col p-1">
                                {/* onClick={()=>handleForwardButtonClick(ticker)} */}
                                    <button onClick={()=>handleButtonClick(ticker)}  className="bg-teal-400 p-1 rounded w-full flex justify-center hover:bg-teal-300">
                                        <svg 
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="24" height="24">
                                            <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z"/>
                                        </svg>
                                    </button>

                                    <svg 
                                        onClick={() => handleFavourites(ticker)}
                                        className="w-8 h-8 fill-white transition-colors duration-300 hover:fill-orange-400 p-1"
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 25 25">
                                        <path d="m18.25 15.52 1.36 7.92-7.11-3.74-7.11 3.74 1.36-7.92L1 9.92l7.95-1.16 3.55-7.2 3.55 7.2L24 9.92z" />
                                    </svg> 
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>

        </div>

    )
}

export default SearchBar;