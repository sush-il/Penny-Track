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
          monthNumber: month,
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
  
export const calculateTotalSpending = (allTransactions: transactionsProp[]) => {
    let total:number = 0;
    allTransactions.map((account)=>{
      if('amount' in account && account.amount < 0){ total += account.amount }
      else {return "Data type invalid when calculating total"};
    })
    return total;
  }

export const getSpendingCategories = (allTransactions:transactionsProp[]) => {
    let categories:string[] = [];
    allTransactions.forEach(transaction => {
        (transaction.amount < 0 && transaction.transactionClassification.length > 0) && transaction.transactionClassification.forEach(element => {
            categories.push(element);
        })
    })
    return categories;
}

// Creates a map with all the transaction categories for spending
export const getTransactionCategoryCount = (categories:string[]) => {
  const countTable = new Map<string, number>();
  categories.forEach(element => {
    countTable.set(element, (countTable.get(element) ?? 0) + 1);
  });
  return countTable;
}


export const getIncomingOutgoing = async(accountId:string, month:number, dataTypeToGet:string) => {
  try{

    const allIncoming:number[] = []
    const allOutgoing:number[] = []

    const allTransactions:transactionsProp[] = await getBalanceAndTransactions(accountId, month, dataTypeToGet )

    allTransactions.forEach(transaction => {
      if('amount' in transaction && transaction.amount > 0){
        allIncoming.push(transaction.amount);
      }else{
        allOutgoing.push(transaction.amount);
      }
    });

    return {
      incoming: allIncoming,
      outgoing: allOutgoing,
    };

  }catch(error){
    console.log("Error getting incoming and outgoing transactions" )
  }
}