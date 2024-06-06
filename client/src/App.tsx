import { useEffect, useState } from "react";
import {accountDetailProp} from "../utils/dataProps";
import {getTokenFromCode, getUserAccounts} from "../utils/appFunctions";
import Login from "./pages/login";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import "./index.css";

function App() {
  const [accounts, setAccounts] = useState<accountDetailProp[]>([]);
  const [gotAccessToken, setGotAccessToken] = useState("");
  const sessionStorageAccessToken = sessionStorage.getItem('gotAccessToken');

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    // If not access token get it from the given code
    if (code !== null && !gotAccessToken) {
      getTokenFromCode(code, setGotAccessToken); 
    } // once the acees token is accessed then only get the data
    else if( sessionStorageAccessToken === "True" && accounts.length == 0) {
      getUserAccounts(setAccounts); 
    }
    window.history.pushState({}, "", "/")
  }, [gotAccessToken, accounts]); //Mount on the first accessToken updata, and then on each refresh



  if(!sessionStorageAccessToken) 
    return <Login />

  return (
    <div className="bg-background text-text font-mono min-h-screen flex">
      <Sidebar />
      <div className="w-full p-2">
        <Dashboard accounts={accounts}/>
      </div>
    </div>
  );
}

export default App;
