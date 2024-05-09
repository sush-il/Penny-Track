import {accountBalanceProp, transactionsProp} from "./dataProps";

export const getBalanceAndTransactions = async(accountId:string, month:number, dataTypeToGet:string) => {
    try{
      const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: sessionStorage.getItem('accessToken'),
          accountId: accountId,
          dataTypeToGet: dataTypeToGet,
          monthNumber: month
        }),
      }
      
      const accountBalanceResponse = await fetch(" http://localhost:5000/getBalanceAndTransactions", options);
      
      if(accountBalanceResponse.ok){
        const data = await accountBalanceResponse.json();
        return data;
      }
    }catch(error){
      console.log("Error getting " + dataTypeToGet + error )
    }
  }
  
export const calculateTotal = (allData: accountBalanceProp[] | transactionsProp[], dataType:string) => {
    let total:number = 0;
    allData.map((account)=>{
      if(dataType === "balance" && 'available' in account){ total += account.available;} 
      else if(dataType === "spending" && 'amount' in account && account.amount < 0){ total += account.amount }
      else {return "Data type invalid when calculating total"};
    })
    return total;
  }

export const getSpendingCategories = (allTransactions:transactionsProp[]) => {
    let categories:string[] = [];
    allTransactions.forEach( transaction =>{
        transaction.transactionClassification.forEach(element => {
            categories.push(element);
        })
    })
    return categories;
}