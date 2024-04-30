import { useEffect, useState } from "react";
import { accountDetailProp, accountBalanceProp, transactionsProp } from "../../utils/dataProps";
import { getBalanceAndTransactions } from "../../utils/appFunctions";


const Dashboard: React.FC<{accounts:accountDetailProp[]}> = ({accounts}) => {
    const [allAccountsBalanceData, setAllAccountsBalanceData] = useState<accountBalanceProp[]>([]);
    const [allAccountsTransactions, setAllAccountsTransactions] = useState<transactionsProp[]>([]);

    useEffect(()=>{
        fetchData();
    },[accounts])
    
    //Basically currently the state is getting update whereas we want ot push the data; look into appFunctions will make sense
    const fetchData = async () => {
      
      const response = await getBalanceAndTransactions(accounts[0].accountId, "balance", allAccountsBalanceData)
      try{
        console.log(response);


      }catch(error){

      }
    };

    //const balances = await Promise.all(balancePromises);
    //console.log(balances);
    //setAllAccountsBalanceData(balances);

    //console.log(allAccountsBalanceData)
    
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
                  <p> {account.currency} </p>
                  {/* <p> {account.accountNumber.number} </p>
                  <img src={account.provider.logoUri} alt="Provider Image" />      */}
                  {/* <p> balance: {accountBalance} </p>      */}
                </div>

              )) 
            }
{/* 
            {
              allAccountsTransactions.map((transaction:transactionsProp)=>(
                <div>
                    <p> {transaction.transactionId} </p>
                  </div>
              ))
            } */}
          </div>
        </div>  
    )
}

export default Dashboard;

// {
//   accounts.map((account:accountDetailProp)=>(
//     <div>
//       <p> {account.displayName} </p>
//       <p> {account.provider.displayName} </p>
//       <p> {account.accountNumber.number} </p>
//       <img src={account.provider.logoUri} alt="Provider Image" />     
//       {/* <p> balance: {accountBalance} </p>      */}
//     </div>

//   )) 
// }