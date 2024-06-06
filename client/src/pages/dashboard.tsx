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

  // grid grid-cols-auto gap-3 pt-2 lg:grid-cols-2

  return (
    <div className="w-full min-h-screen grid grid-rows-2 grid-cols-1 gap-3 md:grid-cols-2">
      <div className="inline-grid grid-rows-2 grid-cols-1 p-2 gap-3 lg:grid-cols-2">     
        <div className="bg-green-400 rounded-md p-2 shadow-md shadow-slate-200 drop-shadow-xl">
          <p className="text-xl"> Total Balance </p>
          <p className="text-2xl"> £ {totalBalance} </p>
        </div>

        <div className="bg-green-400 rounded-md p-2">
          <p className="text-xl"> Total Balance </p>
          <p className="text-2xl"> £ {totalSpending} </p>
        </div>

        <div className="bg-green-400 rounded-md p-2">
          <p className="text-xl"> Total Balance </p>
          <p className="text-2xl"> £ {totalBalance} </p>
        </div>

        <div className="bg-green-400 rounded-md p-2">
          <DropdownButton dropdownDataType="Account" dropdownData={allAccountNamesAndIds} setChoiceCallback={setChosenAccount} />
          <DropdownButton dropdownDataType="Month" dropdownData={months} setChoiceCallback={setChosenMonth} />
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl"> Spending Breakdown </h2>
        <div className="container my-3 h-96">
          <SpendingChart spendingCategories={[...transactionCategoryCounts.keys()]} categoryCount={[...transactionCategoryCounts.values()]} />
        </div>
      </div>

      <div className="">
        <h2> Spending Breakdown </h2>
        {/* <SpendingChart spendingCategories={[...transactionCategoryCounts.keys()]} categoryCount={[...transactionCategoryCounts.values()]} /> */}
      </div>

      <div className="">
        <h2> Spending Breakdown </h2>
        {/* <SpendingChart spendingCategories={[...transactionCategoryCounts.keys()]} categoryCount={[...transactionCategoryCounts.values()]} /> */}
      </div>
    </div>
  )
}

export default Dashboard;