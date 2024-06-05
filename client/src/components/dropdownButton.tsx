import { useEffect, useState } from 'react';
import { dropdownProp } from '../../utils/dataProps';

const DropdownButton:React.FC<dropdownProp> = ({dropdownDataType, dropdownData, setChoiceCallback}) => {
    let defaultData:string = ""; // On first load before any selection default data to load is created
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState("");
    const [selectedAccountName, setSelectedAccountName] = useState("");
    
    useEffect(()=>{
        if(dropdownDataType === "Month" && selectedData === ""){
            const currentDate = new Date();
            defaultData = dropdownData[currentDate.getMonth()];
            setSelectedData(defaultData);
        } else if (dropdownDataType === "Account" && selectedData === "" && dropdownData.length > 0 && 'id' in dropdownData[0]){
            defaultData = dropdownData[0].id;
            setSelectedData(defaultData);
            setSelectedAccountName(dropdownData[0].name)
        }
        setChoiceCallback(selectedData);

    },[dropdownData, selectedData])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const chooseData =  (chosenData:string, chosenDataName?:string) => {
        if(chosenData !== ""){
            setSelectedData(chosenData)
            chosenDataName && setSelectedAccountName(chosenDataName);
        }
        setIsOpen(false);
    }

    return (
        <div className='relative overflow-hidden w-full flex flex-col justify-start'>
            <button
                onClick={toggleDropdown}
                className="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
            >
                Selected {`${dropdownDataType} : ${dropdownDataType === "Account" ? selectedAccountName: selectedData}` }
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            
            <div className={`${isOpen ? '' : 'hidden'} h-52 oveflow-hidden flex justify-center`}>
                <ul className="h-2/3 absolute p-3 flex flex-col divide-y-2 divide-gray-500 bg-slate-400 overflow-scroll overflow-x-hidden text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {dropdownData.map((data,index) => {
                        if (dropdownDataType === "Account" && 'id' in data) {
                            return (
                                <li key={index}>
                                    <button onClick={() => chooseData(data.id, data.name)} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-300 dark:hover:text-white">
                                        {data.name}
                                    </button>
                                </li>
                            );
                        } else if (dropdownDataType === "Month" && typeof(data) == 'string') {
                            return (
                                <li key={index}>
                                    <button onClick={() => chooseData(data)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {data}
                                    </button>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        
        </div>
    );
}

export default DropdownButton;
