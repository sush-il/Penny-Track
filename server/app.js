const express = require('express');
const cors = require('cors')
const axios = require('axios')
const app = express();
// const { Sequelize } = require('sequelize');
const authSessions = require('./authSessions');
const favTicker = require('./favTickers');
const port = process.env.PORT || "5000"

const { syncModels } = require('./db');

require('dotenv').config();
app.use(express.json());
app.use(cors());

authSessions(app);
favTicker(app);



const liveClientID = process.env.LIVE_CLIENT_ID;
const liveClientSecret = process.env.LIVE_CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;

const liveRedirectPath = `https://auth.truelayer.com/?response_type=code&client_id=${liveClientID}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=${redirectURI}&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all`

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
                redirect_uri: `http://localhost:3000/home`
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
                accountNumber: {
                    iban: data.account_number.iban,
                    swiftBic: data.account_number.swift_bic,
                    number: data.account_number.number,
                    sortCode: data.account_number.sort_code,
                },

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

app.post("/getBalanceAndTransactions", async(req,res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const accountId = req.body.accountId;
    const accessToken = req.body.accessToken;
    const dataTypeToGet = req.body.dataTypeToGet;
    const getDataFrom = `${currentYear}-${req.body.monthNumber}-01`;
    const getDataTo = `${currentYear}-${req.body.monthNumber}-31`;

    const startMonth = req.body.startMonth;
    const endMonth = req.body.endMonth;

    if(startMonth && endMonth){
        getDataFrom = `${currentYear}-${startMonth}-01`;
        getDataTo = `${currentYear}-${endMonth}-31`;
    }

    const options = {
        method: "GET",
        url: `https://api.truelayer.com/data/v1/accounts/${accountId}/${dataTypeToGet}?from=${getDataFrom}&to=${getDataTo}`,
        headers: {
            accept: "application/json", 
            authorization: `Bearer ${accessToken}`
        }
    } 

    try{
        const response = await axios.request(options);
        if(dataTypeToGet === "transactions"){
            const requiredData = response.data.results.map((transaction) =>(
                {

                    transactionId: transaction.transaction_id,
                    timestamp: transaction.timestamp,
                    description: transaction.description,
                    amount: transaction.amount,
                    currency: transaction.currency,
                    transactionClassification: transaction.transaction_classification,
                    merchantName: transaction.merchant_name,
            }))

            res.json(requiredData);
        } else{
            res.json(response.data.results);
        }
    }catch(error){
        console.log("Error getting Balance: " + error)
        res.send(error);
    }
})

syncModels()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to synchronize models:', err);
  });