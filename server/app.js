const express = require('express');
const cors = require('cors')
const axios = require('axios')
const app = express();
const port = process.env.PORT || "5000"
require('dotenv').config();
app.use(express.json());
app.use(cors());

const liveClientID = process.env.LIVE_CLIENT_ID;
const liveClientSecret = process.env.LIVE_CLIENT_SECRET;

// const sandboxClientID = process.env.SANDBOX_CLIENT_ID;
// const sandboxClientSecret = process.env.SANDBOX_CLIENT_SECRET;

// const redirectURI = process.env.REDIRECT_URI;
const frontEndURI = "http://localhost:3000/"

const liveRedirectPath = "https://auth.truelayer.com/?response_type=code&client_id=pennytrack-fe3de0&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:3000/callback&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all"
const sandboxRedirectPath = "https://auth.truelayer-sandbox.com/?response_type=code&client_id=sandbox-pennytrack-fe3de0&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:5000/callback&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all"

app.get("/login", (req,res) => {
    try{
        res.redirect(liveRedirectPath)
    } catch (error){
        console.log(`Error ${error}`)
    }
})

app.get("/getToken", async (req,res) => {
    const authCode = req.query.code
    
    try{
        const options = {
            method: 'POST',
            url: 'https://auth.truelayer.com/connect/token',
            headers: {
                accept: 'application/json', 
                'content-type': 'application/json'
            },
            data: {
                grant_type: 'authorization_code',
                client_id: liveClientID,
                client_secret: liveClientSecret,
                code: authCode,
                redirect_uri: "http://localhost:3000/callback"
            }
          };

        const response = await axios.request(options);
        
        res.json(response.data)


    }catch (error){
        console.log(`Error on callback ${error}`)
    }

})


app.get("/getAccounts", async(req,res)=>{

    const accessToken = req.query.accessToken;

    const options = {
        method:"GET",
        url: "https://api.truelayer.com/data/v1/accounts",
        headers:{
            accept:'application/json',
            authorization: `Bearer ${accessToken}`
        }
    }

    try{
        const response = await axios.request(options);
        const requiredData = response.data.results.map((data) => (
            {
                accountId: data.account_id,
                accountType: data.account_type,
                displayName: data.display_name,
                accountNumber: data.account_number,
                provider: {
                    displayName: data.provider.display_name,
                    providerId: data.provider.provider_id,
                    logoUri: data.provider.logo_uri
                },
            }
        ))
        
        res.json(requiredData);
    
    }catch(error){
        console.log(`Couldn't get user accounts: ${error}`)
        res.send(error);
    }
})

app.listen(port, () => {
    `Server Running at port: ${port}`
})