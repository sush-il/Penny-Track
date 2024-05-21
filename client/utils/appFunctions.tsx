import { Dispatch, SetStateAction} from "react";
import { accountDetailProp} from "./dataProps";

export const getTokenFromCode = async (authorizationCode:string, setGotAccessToken:Dispatch<SetStateAction<string>>) => {
    try {
      const response = await fetch(`http://localhost:5000/getToken?code=${authorizationCode}`);
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("refreshToken", data.refresh_token);
        setGotAccessToken("True");
        sessionStorage.setItem('gotAccessToken', "True");
      }
    } catch (error) {
      console.error("Error getting the accessToken", error);
    }
  };


export const getUserAccounts = async (setAccounts:Dispatch<SetStateAction<accountDetailProp[]>>) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:5000/getAccounts?accessToken=${accessToken}`);
        if (response.ok) {
            const data:accountDetailProp[] = await response.json();
            setAccounts(data);
        }
        } catch (error) {
        console.error("Error fetching user accounts:", error);
        }
  };
