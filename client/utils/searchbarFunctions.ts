const authenticatedUserId = sessionStorage.getItem("authenticatedUserId")

const addTickerToFavourites = async (tickerSymbol:string) => {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            authenticatedUserId: authenticatedUserId,
            tickerSymbol: tickerSymbol
        })
      }
    try{
        const response = await fetch("http://localhost:5000/addToFav", options);
        const data = await response.json();
        return data;
   
    }catch(error){
        console.log("Couldn't add ticker to favourites: " + error)
    }
}

const getAllFavouriteTickers = async() =>{
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            authenticatedUserId: authenticatedUserId,
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

const removeTickerFromFavourites = async (ticker:string) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            authenticatedUserId: authenticatedUserId,
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