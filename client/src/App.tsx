import React, { useEffect, useState } from "react";
import {accountDetailProp} from "../utils/dataProps";

function App() {
  const [gotAccessToken, setIsgotAccessToken] = useState("");
  const [accounts, setAccounts] = useState<accountDetailProp[]>([]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code !== null) {
      fetch(`http://localhost:5000/getAccounts?accessToken=${sessionStorage.getItem("accessToken")}`);
      getTokenFromCode(code);
      getUserAccounts();
    }
    window.history.pushState({}, "", "/")
  }, []);

  const authorizeUser = async () => {
    window.location.href = "http://localhost:5000/login";
  };

  const getTokenFromCode = async (authorizationCode:string) => {
    try {
      const response = await fetch(`http://localhost:5000/getToken?code=${authorizationCode}`);
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("refreshToken", data.refresh_token);
        setIsgotAccessToken("True");
      }
    } catch (error) {
      console.error("Error getting the accessToken", error);
    }
  };

  const getUserAccounts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getAccounts?accessToken=${sessionStorage.getItem("accessToken")}`);
      if (response.ok) {
        const data:accountDetailProp[] = await response.json();
        setAccounts(data);
      }
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  };

  if(!gotAccessToken) return <button onClick={authorizeUser} style={{ width: "5em", height: "2em", backgroundColor: "blue" }}> Login </button>

  return (
    <div>
      {
        accounts.map((account)=>(
          <div>
            <p> {account.displayName} </p>
            <p> {account.provider.displayName} </p>
            <img src={account.provider.logoUri} alt="Provider Image" />          
          </div>

        )) 
      }
    </div>
  );
}

export default App;
