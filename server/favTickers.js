const {sequelize} = require("./db");

const Favourites = require("./models/favTickerModel")(sequelize);

const getAllFav = async(authenticatedUserId) => {
    try{
        const allTickers = await Favourites.findAll({
            where: {
                userId: authenticatedUserId
            },
            raw:true
        })

        if(allTickers){
            console.log("All Favourite Tickers retrived from the database")
            return allTickers;
        }else{
            return false;
        }

    }catch (error) {
        console.error("Couldn't get favourite tickers from the database");
    }
}

const addToFav = async (authenticatedUserId, tickerSymbol) => {
    try{
        const tickerExists = await Favourites.findOne({
            where: {
                userId: authenticatedUserId,
                ticker: tickerSymbol,
                },
            raw: true
        })

        if(tickerExists){
            return false;
        }else{
            await Favourites.create({
                userId: authenticatedUserId,
                ticker: tickerSymbol
            })
            
            return true;
        }
    }catch(error){
        console.error("Failed to add ticker to favourites: " + error)
    }
}

const deleteFav = async (authenticatedUserId, tickerSymbol) => {
    try{
        const response = await Favourites.destroy({
            where: {
                userId: authenticatedUserId,
                ticker: tickerSymbol
            }
        })

        if (response) return true; else return false;
    }catch(error){
        console.error("Failed to delete the symbol from the database: " + error )
    }
}


module.exports = (app) => {
    app.post("/addToFav", async (req,res)=>{
        const savedTicker = req.body.tickerSymbol;
        const authenticatedUserId = req.body.authenticatedUserId;
        console.log("Received Id: " + authenticatedUserId)
        try{
            const response = await addToFav(authenticatedUserId, savedTicker);
            if(response){
                res.json({message:"Symbol Added to Favourite", alreadyExists: false })
                console.log("Favourite ticker added to the database")
            }else{
                res.json({message:"Couldn't add ticker to favourites", alreadyExists: true })
                console.log("Ticker already exists");
            }
        }catch(error){
            console.error("Couldn't add to favourites: " + error)
        }
    })

    app.post("/getAllFav", async(req,res)=>{
        const authenticatedUserId = req.body.authenticatedUserId;
        try{
            const allFavs = await getAllFav(authenticatedUserId);
            if(allFavs){
                const allTickers = allFavs.map((item)=>{
                    return item.ticker
                })
                res.json(allTickers);
            } 
            else res.json(false);
        }catch(error){
            console.error("Error getting all Favourites: " + error)
        }
    })

    app.post("/deleteFav", async(req,res)=>{
        const authenticatedUserId = req.body.authenticatedUserId;
        const tickerSymbol = req.body.ticker;

        console.log(tickerSymbol);

        try{
            const response = await deleteFav(authenticatedUserId, tickerSymbol);
            if(response){ console.log("Tickery successfully removed from the database"); res.json(true) }
            else{res.json(false)}

        }catch(error){
            console.error("Failed to remove the ticker from the database: " + error)
        }
    })
}