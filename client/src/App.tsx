import { useEffect, useState } from "react";
import {accountDetailProp} from "../utils/dataProps";
import {authorizeUser, getTokenFromCode, getUserAccounts} from "../utils/appFunctions";

function App() {
  const [gotAccessToken, setGotAccessToken] = useState("");
  const [accounts, setAccounts] = useState<accountDetailProp[]>([]);
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
    return <button onClick={authorizeUser} style={{ width: "5em", height: "2em", backgroundColor: "blue" }}> Login </button>

  return (
    <div>
      <p> In the data section </p>
      {
        accounts.map((account:accountDetailProp)=>(
          <div>
            <p> {account.displayName} </p>
            <p> {account.provider.displayName} </p>
            <p> {account.accountNumber.sortCode} </p>
            <img src={account.provider.logoUri} alt="Provider Image" />          
          </div>

        )) 
      }
    </div>
  );
}

export default App;
