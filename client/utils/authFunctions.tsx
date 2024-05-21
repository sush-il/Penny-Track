import { redirect } from "react-router-dom";

//Handling user login
export const authorizeUser = async (username:string, password:string) => {
    const options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        username: username,
        password: password
      })
    }
  
    try{
      if(username && password){
        const response = await fetch('http://localhost:5000/authenticate',options);
        const data = await response.json()
        if(data.redirect===true){window.location.href = "http://localhost:5000/login";}
        else{return data.message};
      }
    }catch(error){
      console.log("Coudn't Login: " + error)
    }
  };

// Handling user registration
export const registerUser = async (username:string, password:string, password2:string) => {    
    
    if(password !== password2) return "Passwords don't match !"

    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
          username: username,
          password: password
        })
    }

    try{
        if(username && password){
            const response = await fetch('http://localhost:5000/registerUser',options)
            if(response.ok){
              const data = await response.json()
              if(data.redirect) return 
              else return data.message
            }
        }
    }catch(error){
        console.error("Error registering user: " + error);
    }

}


