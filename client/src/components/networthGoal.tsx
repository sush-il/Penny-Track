import { useState } from 'react';

const NetWorthGoal = () => {
  const [goal, setGoal] = useState(0);
  const [currentNetWorth, setCurrentNetWorth] = useState(0);

  const handleGoalChange = (e) => {
    setGoal(Number(e.target.value));
  };

  const handleNetWorthChange = (e) => {
    setCurrentNetWorth(Number(e.target.value));
  };

  const progressPercentage = goal > 0 ? Math.min((currentNetWorth / goal) * 100, 100) : 0;

  return (
    <div className="w-full flex flex-col p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-left">Net Worth Goal</h1>
      
      <div className="lg:mb-2">
        <label className="block">Set your net worth goal:</label>
        <input
          type="number"
          min="0"
          value={goal}
          onChange={handleGoalChange}
          className="mt-1 p-2 w-full border rounded-md text-gray-600"
          placeholder="Enter goal amount"
        />
      </div>
      
      <div className="lg:mb-2">
        <label className="block">Current net worth:</label>
        <input
          type="number"
          min="0"
          value={currentNetWorth}
          onChange={handleNetWorthChange}
          className="mt-1 p-2 w-full border rounded-md text-gray-600"
          placeholder="Enter current net worth"
        />
      </div>

      <div className="mt-2">
        <div className="h-4 bg-gray-300 rounded-full">
          <div
            className="h-4 bg-blue-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-right text-sm text-gray-700 mt-1">{progressPercentage.toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default NetWorthGoal;
