import { useEffect, useState } from "react";
import { accountDetailProp, accountBalanceProp, transactionsProp } from "../../utils/dataProps";
import { getBalanceAndTransactions } from "../../utils/appFunctions";


const Dashboard: React.FC<{accounts:accountDetailProp[]}> = ({accounts}) => {
    const [allAccountsBalanceData, setAllAccountsBalanceData] = useState<accountBalanceProp[]>([]);
    const [allAccountsTransactions, setAllAccountsTransactions] = useState<transactionsProp[]>([]);

    useEffect(()=>{
      if(accounts.length!==0){
        fetchData();
      }
    },[accounts])

    const balanceTemp:Promise<accountBalanceProp>[] = [];
    const transactionsTemp:Promise<transactionsProp>[] = [];
    
    //Basically currently the state is getting update whereas we want ot push the data; look into appFunctions will make sense
    const fetchData = async () => {
      try{
        //const promises = accounts.map((account) => {getBalanceAndTransactions(account.accountId, "balance", allAccountsBalanceData)})
        accounts.forEach(account => {
          const balancePromise = getBalanceAndTransactions(account.accountId, "balance")
          const transactionPromise = getBalanceAndTransactions(account.accountId, "transactions")
          balanceTemp.push(balancePromise);
          transactionsTemp.push(transactionPromise);
        })
        const balanceData = await Promise.all(balanceTemp);
        const transactionData = await Promise.all(transactionsTemp);
        setAllAccountsBalanceData(balanceData);
        setAllAccountsTransactions(transactionData)
      }catch(error){
        console.log("Couldn't get Balance and Transactions")
      }
    };
    
    
    return (
        <div className="grid grid-cols-1 gap-3 col-span-1 w-full pt-2 lg:grid-cols-2">
          <div className="inline-grid grid-cols-2 gap-3">
            <div className="bg-red-400">
              <p> Total Net Worth</p>
              <p> £283, 349</p>
            </div>
            
            <div className="bg-red-400">
              <p> Spendings</p>
              <p> £283, 349</p>
            </div>
            
            <div className="bg-red-400">
                <p> Net Worth Goal</p>
                <p> £500, 349</p>
            </div>
            
            <div className="bg-red-400">
                <p> Total Net Worth</p>
                <p> £283, 349</p>
            </div>
          </div>
          
          <div className="bg-green-400 gap">
            <p> Spending Breakdown </p>
            <p> £283, 349</p>
          </div>
          
          <div className="bg-blue-400 gap">
            <p> Money In vs Out </p>
            <p> £283, 349</p>
          </div>
          
          <div className="bg-yellow-400 gap"> 
            <p> Transactions </p>
            <p> £283, 349</p> 
          </div>

          <div>
          {
              allAccountsBalanceData.map((account:accountBalanceProp, index)=>(
                <div key={index}>
                  <p> {account.available} </p>
                </div>

              )) 
            }

            {
              allAccountsTransactions.map((transaction:transactionsProp)=>(
                <div>
                    <p> {transaction.transactionId} </p>
                  </div>
              ))
            }
          </div>
        </div>  
    )
}

export default Dashboard;