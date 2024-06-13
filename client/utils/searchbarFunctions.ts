const addTickerToFavourites = async (tickerSymbol:string) => {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            authenticatedUserId: 1,
            tickerSymbol: tickerSymbol
        })
      }
    try{
        const response = await fetch("http://localhost:5000/addToFav", options);
        const data = await response.json();
        return data.message;
   
    }catch(error){
        console.log("Couldn't add ticker to favourites: " + error)
    }
}

const getAllFavouriteTickers = async(authenticatedUserId?:Number) =>{
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            authenticatedUserId: 1,
        })
    }
    try{
        const response = await fetch("http://localhost:5000/getAllFav", options);
        if(response){
            const data = await response.json();
            return data;
        }
    }catch(error){
        console.error("Couldn't get the favourite tickers");
    }
}

const removeTickerFromFavourites = async (ticker:string, authenticatedUserId?:Number) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            authenticatedUserId: 1,
            ticker: ticker
        })
    }

    try{
        const response = await fetch("http://localhost:5000/deleteFav",options);
        const data = await response.json();

        return data;
        
    }catch(error){
        console.error("Failed to remove the favourite: " + error )
    }
}





export {
    getAllFavouriteTickers,
    addTickerToFavourites, 
    removeTickerFromFavourites
}