import { useEffect, useState } from "react";
import { accountDetailProp, transactionsProp, dropdownAccountProp, incomingOutgoingProp } from "../../utils/dataProps";
import { getBalanceAndTransactions,  getSpendingCategories, calculateTotalSpending, getTransactionCategoryCount, getIncomingOutgoing } from "../../utils/dashboardFunctions";
import DropdownButton from "../components/dropdownButton";
import SpendingChart from "../components/spendingChart";
import IncomingOutgoingChart from "../components/incomingOutgoing";

const Dashboard: React.FC<{accounts:accountDetailProp[]}> = ({accounts}) => {
  const [chosenMonth, setChosenMonth] = useState("");
  const [chosenAccount, setChosenAccount] = useState("");
  
  const [allAccountNamesAndIds, setAllAccountNamesAndIds] = useState<dropdownAccountProp[]>([]);
  const [accountTransactions, setAccountTransactions] = useState<transactionsProp[]>([])
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [transactionCategoryCounts, setTransactionCategoryCounts] = useState<Map <string, number>>(new Map());

  const [incomingOutgoing, setIncomingOutgoing] = useState<incomingOutgoingProp>({incoming: [0], outgoing:[0]});
  
  
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
  },[chosenAccount, accountTransactions])
  
  const fetchData = async () => {
    try{  
      const balancePromise = getBalanceAndTransactions(chosenAccount, months.indexOf(chosenMonth), "balance")
      const transactionPromise = getBalanceAndTransactions(chosenAccount, months.indexOf(chosenMonth), "transactions")
      const incomingOutgoingPromise = getIncomingOutgoing(chosenAccount, months.indexOf(chosenMonth), "transactions")

      const balanceData = await balancePromise;;
      const transactionsData = await transactionPromise;
      const incomingOutgoingData = await incomingOutgoingPromise;

      setAccountTransactions(transactionsData);
      setTotalBalance(balanceData[0].available)
      incomingOutgoingData && setIncomingOutgoing(incomingOutgoingData);

    }catch(error){
      console.log("Couldn't get Balance and Transactions")
    }
  };

  return (
    <div className="ww-full min-h-screen grid grid-rows-2 grid-cols-1 gap-3 lg:grid-cols-2">
      <div className="inline-grid grid-rows-2 grid-cols-1 p-2 gap-3 md:grid-cols-2">     
        <div className="bg-inherit bg-opacity-80 rounded-md p-2 flex flex-col justify-center items-center">
          <p className="text-4xl font-bold text-teal-400"> Total Balance </p>
          <p className="text-8xl font-bold"> £ {Math.round(totalBalance*100)/100} </p>
        </div>

        <div className="bg-red-400 bg-opacity-80 rounded-md p-2 flex flex-col justify-center items-center">
          <p className="text-4xl font-bold p-2"> Total Spend </p>
          <p className="text-4xl font-bold "> £ {Math.round(totalSpending*100)/100} </p>
        </div>

        <div className="bg-red-400 bg-opacity-80 rounded-md p-2 flex flex-col justify-center items-center">
          <p className="text-4xl font-bold p-2"> Total Balance </p>
          <p className="text-4xl font-bold"> £ {Math.round(totalSpending*100)/100} </p>
        </div>

        <div className="bg-red-400 bg-opacity-80 rounded-md pt-2 flex flex-col justify-center items-center">
          <DropdownButton dropdownDataType="Account" dropdownData={allAccountNamesAndIds} setChoiceCallback={setChosenAccount} />
          <DropdownButton dropdownDataType="Month" dropdownData={months} setChoiceCallback={setChosenMonth} />
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-4xl text-left p-3 font-bold md:text-center"> Spending Breakdown </h2>
        <div className="container my-3 h-96 w-full p-1">
          <SpendingChart spendingCategories={[...transactionCategoryCounts.keys()]} categoryCount={[...transactionCategoryCounts.values()]} />
        </div>
      </div>

      <div className="w-full h-96 lg:col-span-2 lg:text-center p-2">
        <h2 className="text-4xl font-bold"> Incoming vs Outgoing Transactions </h2>
        <IncomingOutgoingChart incoming={incomingOutgoing.incoming} outgoing={incomingOutgoing.outgoing}  />
      </div>

      {/* <div className="">
        <h2> Spending Breakdown </h2>
        <SpendingChart spendingCategories={[...transactionCategoryCounts.keys()]} categoryCount={[...transactionCategoryCounts.values()]} />
      </div> */}

    </div>
  )
}

export default Dashboard;