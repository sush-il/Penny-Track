import { useEffect, useState } from "react"

function App() {

  useEffect(()=>{
    const code = new URLSearchParams(window.location.search).get('code')
    if(code !== null){
      getTokenFromCode(code);
    }
    getUserAccounts();
  },[])
  
  const getTokenFromCode = async(authorizationCode:string) => {
    try{
      const response = await fetch(`http://localhost:5000/getToken?code=${authorizationCode}`)
      if(response.ok){
        const data = await response.json();
        sessionStorage.setItem("accessToken",data.access_token);
        sessionStorage.setItem("refreshToken",data.refresh_token);
      }

    }catch(error){
      console.log(`Error getting the accessToken ${error}`)
    }

    
  }

  const getUserAccounts = async() => {
    try{
      const response = await fetch(`http://localhost:5000/getAccounts?accessToken=${sessionStorage.getItem('accessToken')}`);
      if(response.ok){
        console.log(response);
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App
