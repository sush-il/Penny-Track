const session = require('express-session');
const bcrypt = require('bcrypt');
const {sequelize, User} = require('./models/userModel');
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

//User log in
const authorize = async (enteredUsername, enteredPassword) => {
    try{
        const user = await User.findOne({
            where: { username: enteredUsername,},
            raw: true
        });

        if(user){
            const isPasswordValid = await bcrypt.compare(enteredPassword, user.password);
            if(isPasswordValid) return true; //correct password
            else return false; //wrong password
        }else return null; //user doen't exist

    }catch(error){
        console.error("Couldn't authorize user: " + error)
    }
}

//User registration
const register = async(enteredUsername, enteredPassword) => {
    try{    
        const user = await User.findOne({
            where: { username: enteredUsername,},
            raw: true
        });

        if(user){
            return ({message: "Email already exists !", redirect:false})
        } else{  
            await User.create({
                username: enteredUsername,
                password:enteredPassword
            })
            return ({message: "User registration successful !", redirect:true})
        }
        
    }catch(error){
        console.error("Couldn't register user: " + error)
    }
}

module.exports = (app) => {
    app.use(session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set secure to true if using HTTPS
      }));


    app.post("/authenticate", async(req, res) => {
        const enteredUsername = req.body.username;
        const enteredPassword = req.body.password; 
        
        try{
            const response = await authorize(enteredUsername, enteredPassword);
            if(response === null){res.json({message: 'User does not exist', redirect: false})}
            else if (!response) {res.json({message: 'Incorrect Password', redirect: false})}
            else if(response){res.json({message: 'User Authenticated', redirect:true})}
        }catch(error){
            console.log('Authentication Problem: ' + error )
        }
    })


    app.post("/registerUser", async(req,res)=>{
        const enteredUsername = req.body.username;
        const enteredPassword = req.body.password;

        try{
            const response = await register(enteredUsername, enteredPassword);
            res.json(response);
        }catch(error){
            console.error("Couldn't register user: " + error)
        }
    })
}
