import { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
    const [sidebarIsVisible, setSidebarIsVisible] = useState(false);

    const setVisibility = () => {
        setSidebarIsVisible(!sidebarIsVisible);
    }

    return(
        <div id="default-sidebar" className="flex align-middle justify-center place-items-center w-screen h-72 sm:h-screen sm:flex-row sm:w-20 ">
            <div className="flex flex-row place-items-center fixed w-full sm:flex-col">
                <Link to="">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="72" height="72" 
                        viewBox="0 0 24 24">
                        <path d="M24 12.148l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148zm-4 1.749l-2 10.103h-12l-2-10.103 8-7.444 8 7.444zm-7 6.103c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm1-5c0-1.105-.896-2-2-2s-2 .895-2 2 .896 2 2 2 2-.895 2-2z"/>
                    </svg>
                </Link>
                
                <Link to="">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="72" height="72" 
                        viewBox="0 0 24 24">
                        <path d="M24 12.148l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148zm-4 1.749l-2 10.103h-12l-2-10.103 8-7.444 8 7.444zm-7 6.103c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm1-5c0-1.105-.896-2-2-2s-2 .895-2 2 .896 2 2 2 2-.895 2-2z"/>
                    </svg>
                </Link>

                <Link to="">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="72" height="72" 
                        viewBox="0 0 24 24">
                        <path d="M24 12.148l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148zm-4 1.749l-2 10.103h-12l-2-10.103 8-7.444 8 7.444zm-7 6.103c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm1-5c0-1.105-.896-2-2-2s-2 .895-2 2 .896 2 2 2 2-.895 2-2z"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
} 

export default Sidebar;

// ${sidebarIsVisible ? "" : "-translate-x-full"

// <button
// type="button"
// className={`rounded-md mt-2 items-center transition-transform ${sidebarIsVisible ? "" : "-translate-x-full"} z-100`}
// data-drawer-target="default-sidebar"
// data-drawer-toggle="default-sidebar"
// aria-controls="default-sidebar"
// onClick={setVisibility}>

// <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     width="72" 
//     height="72" 
//     viewBox="0 0 24 24">
//     <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
// </svg>
// </button>