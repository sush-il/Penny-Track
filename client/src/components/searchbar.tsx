import { useState } from "react";
import tickers from "../../utils/tickersList"


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTickers, setFilteredTickers] = useState(tickers);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = tickers.filter((ticker) =>
          ticker.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTickers(filtered);
      };

    return(  
        <form className="w-full p-3">   
            {/* <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
            <div className="relative w-full lg:w-1/3">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input onChange={handleSearch} value={searchTerm} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Companies, Tickers ..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                {
                    searchTerm && 
                    <ul className="flex flex-col overflow-x-hidden overflow-scroll w-full h-96 absolute bg-green-400">
                        {filteredTickers.map((ticker, index) => (
                            <li key={index}>{ticker}</li>
                        ))}
                    </ul>
                }
            </div>

        </form>

    )
}

export default SearchBar;