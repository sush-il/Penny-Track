import { useEffect, useState } from "react";
import {accountDetailProp} from "../utils/dataProps";
import {getBalanceAndTransactions, getTokenFromCode, getUserAccounts} from "../utils/appFunctions";
import Login from "./components/login";
import Sidebar from "./components/sidebar";
import "./index.css";

function App() {
  const [gotAccessToken, setGotAccessToken] = useState("");
  const [accounts, setAccounts] = useState<accountDetailProp[]>([]);
  const [accountBalance, setAccountBalance] = useState("");
  const sessionStorageAccessToken = sessionStorage.getItem('gotAccessToken');
  const testAccountId = "56c7b029e0f8ec5a2334fb0ffc2fface";

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    // If not access token get it from the given code
    if (code !== null && !gotAccessToken) {
      getTokenFromCode(code, setGotAccessToken); 
    } // once the acees token is accessed then only get the data
    else if( sessionStorageAccessToken === "True" && accounts.length == 0) {
      getUserAccounts(setAccounts); 
      getBalanceAndTransactions(testAccountId, "transactions", setAccountBalance);
    }
    window.history.pushState({}, "", "/")
  }, [gotAccessToken, accounts]); //Mount on the first accessToken updata, and then on each refresh



  if(!sessionStorageAccessToken) 
    return <Login />

  return (
    <div className="flex w-screen h-screen flex-col-reverse bottom-0 sm:flex-row ">
      <Sidebar />
      <div className="grid grid-cols-1 gap-3 col-span-1 w-full pt-2 lg:grid-cols-2">
        <div className="inline-grid grid-cols-2 gap-3">
          <div className="bg-red-400">1</div>
          <div className="bg-red-400">2</div>
          <div className="bg-red-400">3</div>
          <div className="bg-red-400">4</div>
        </div>
        <div className="bg-green-400 gap"> 5 </div>
        <div className="bg-blue-400 gap"> 5 </div>
        <div className="bg-yellow-400 gap"> 5 </div>
      </div>
    </div>
  );
}


// {
//   accounts.map((account:accountDetailProp)=>(
//     <div>
//       <p> {account.displayName} </p>
//       <p> {account.provider.displayName} </p>
//       <p> {account.accountNumber.number} </p>
//       <img src={account.provider.logoUri} alt="Provider Image" />     
//       {/* <p> balance: {accountBalance} </p>      */}
//     </div>

//   )) 
// }

export default App;
