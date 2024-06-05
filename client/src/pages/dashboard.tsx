import { useEffect, useState } from "react";
import { accountDetailProp, accountBalanceProp, transactionsProp, dropdownAccountProp } from "../../utils/dataProps";
import { getBalanceAndTransactions,  getSpendingCategories, calculateTotalSpending, getTransactionCategoryCount } from "../../utils/dashboardFunctions";
import DropdownButton from "../components/dropdownButton";
import SpendingChart from "../components/spendingChart";

const Dashboard: React.FC<{accounts:accountDetailProp[]}> = ({accounts}) => {
  const [chosenMonth, setChosenMonth] = useState("");
  const [chosenAccount, setChosenAccount] = useState("");
  
  const [allAccountNamesAndIds, setAllAccountNamesAndIds] = useState<dropdownAccountProp[]>([]);
  const [accountTransactions, setAccountTransactions] = useState<transactionsProp[]>([])
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [transactionCategoryCounts, setTransactionCategoryCounts] = useState<Map <string, number>>(new Map());
  
  
  const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
  
  const getAllAccountNamesAndIds = () => {
    if (accounts.length !== 0) {
      const names = accounts.map(account => {
        return {
          name: account.displayName,
          id: account.accountId
        };
      });
      setAllAccountNamesAndIds(names);
    }
  };
  
  useEffect(()=>{
    if(accounts.length !== 0){
      fetchData();
      getAllAccountNamesAndIds();
    }
  },[accounts, chosenAccount, chosenMonth])
  
  useEffect(() => {
    if(accountTransactions.length > 0){
      const totalSpend = calculateTotalSpending(accountTransactions);
      const spendingCategories = getSpendingCategories(accountTransactions);

      if(totalSpend && spendingCategories){
        const categoryCounts = getTransactionCategoryCount(spendingCategories);
        setTotalSpending(totalSpend);
        setTransactionCategoryCounts(categoryCounts);
      }
    }
  },[accountTransactions])
  
  const fetchData = async () => {
    try{  
      const balancePromise = getBalanceAndTransactions(chosenAccount, months.indexOf(chosenMonth), "balance")
      const transactionPromise = getBalanceAndTransactions(chosenAccount, months.indexOf(chosenMonth), "transactions")

      const balanceData = await balancePromise;;
      const transactionsData = await transactionPromise;

      setAccountTransactions(transactionsData);
      setTotalBalance(balanceData[0].available)

    }catch(error){
      console.log("Couldn't get Balance and Transactions")
    }
  };

  return (
      <div className="w-full min-h-screen grid grid-cols-1 gap-3 col-span-1 pt-2 lg:grid-cols-2">
        <div className="inline-grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="bg-red-400 ">
            <p> Total Net Worth</p>
            <p>{totalBalance}</p> 
          </div>
          
          <div className="bg-red-400">
            <p> Spendings</p>
            <p>{totalSpending}</p>
          </div>
          
          <div className="bg-red-400">
              <p> Net Worth Goal</p>
              <p> £500, 349</p>
          </div>
          
          <div className="bg-red-400 flex flex-col place-items-center">
              <DropdownButton dropdownDataType="Account" dropdownData={allAccountNamesAndIds} setChoiceCallback={setChosenAccount} />
              <DropdownButton dropdownDataType="Month" dropdownData={months} setChoiceCallback={setChosenMonth} />
          </div>
        </div>
        
        <div className="bg-green-400 gap flex place-items-center flex-col justify-center">
          <p> Spending Breakdown </p>
          <SpendingChart spendingCategories={[...transactionCategoryCounts.keys()]} categoryCount={[...transactionCategoryCounts.values()]} />
        </div>
        
        <div className="bg-blue-400 gap">
          <p> Money In vs Out </p>
          <p> £283, 349</p>
        </div>
        
        <div className="bg-yellow-400 gap"> 
          <p> Transactions </p>
          {/* {
            transactionCategories.map((category)=>(
              <p>{category}</p>
            ))
          } */}
        </div>

      </div>  
  )
}

export default Dashboard;