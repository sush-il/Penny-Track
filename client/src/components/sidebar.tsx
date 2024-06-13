import { Link } from "react-router-dom";
import dashboardIcon from "../assets/dashboardIcon.png"
import trendIcon from "../assets/trend.png"

const Sidebar = () => {
    return(

        <div className="h-screen flex place-items-end">
            {/* Large Screen navbar */}
            <div id="default-sidebar" className="ml-2 hidden place-items-center h-screen w-12 mr-2 hover:w-56 transition-all duration-300 sm:hidden md:hidden lg:flex">
                <div className="flex flex-col place-items-center w-full justify-evenly h-72 overflow-hidden">
                    <Link to="/" className="flex flex-row place-items-center w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-400">
                        <img className="w-12 h-12" src={dashboardIcon} alt="Dashboard Icon" />
                        <h2 className="ms-3"> Dashboard </h2>
                    </Link>
                    
                    <Link to="/marketView" className="flex flex-row place-items-center w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-400">
                        <img className="w-12 h-12 invert" src={trendIcon} alt="Dashboard Icon" />
                        <h2 className="ms-3"> Market</h2>
                    </Link>

                    {/* <Link to="" className="flex flex-row place-items-center w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-400">
                        <img className="w-12 h-12" src={dashboardIcon} alt="Dashboard Icon" />
                        <h2 className="ms-3"> Dashboard </h2>
                    </Link> */}
                </div>
            </div>

            {/* Mobile screen navbar */}
                <div className="z-10 p-1 w-full fixed bg-black flex flex-row justify-center lg:hidden">
                    <Link to="/" className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400">
                        <img className="w-12 h-12" src={dashboardIcon} alt="Dashboard Icon" />
                        {/* <h2 className="ms-3"> Dashboard </h2> */}
                    </Link>
                    
                    <Link to="/marketView" className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400">
                        <img className="w-12 h-12" src={dashboardIcon} alt="Dashboard Icon" />
                        {/* <h2 className="ms-3"> Dashboard </h2> */}
                    </Link>

                    <Link to="" className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400">
                        <img className="w-12 h-12" src={dashboardIcon} alt="Dashboard Icon" />
                        {/* <h2 className="ms-3"> Dashboard </h2> */}
                    </Link>
                </div>
        </div>
    )
} 

export default Sidebar;