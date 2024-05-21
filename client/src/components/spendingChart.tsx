import { Chart, ScaleOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut} from 'react-chartjs-2';
Chart.register(...registerables, ChartDataLabels);

const SpendingChart:React.FC<{spendingCategories:string[], categoryCount: number[]}> = ({spendingCategories, categoryCount}) => {
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "50%",
        plugins: {
          legend: {display:false},
          title: { display: true},
          datalabels: {
            color: 'black',
            font: { weight: 'bold' },
            padding: 10,
        }},

        scales: {
            y: {
                display: false,
                grid:{display: false, showLabelBackdrop:true}, 
                }, //as ScaleOptions<'linear'>,
            
            x : {
                display:false,
                grid: { display: false, showLabelBackdrop:true },   
            }
        },   
    }

    const chartData = {
        labels: spendingCategories,
        datasets: [
            {
                data: categoryCount, 
                backgroundColor: [
                    "#6ee7b7","#34d399", "#10b981",
                    "#5eead4","#2dd4bf", "#14b8a6",
                    "#fda4af","#fb7185", "#f43f5e",
                ],   
                datalabels: {
                    anchor: 'end',
                    backgroundColor: '#6ee7b7',
                    borderRadius: 360
                  }             
            },
    ]}

    return (
        <div className='flex justify-center h-80 w-full '>
            <Doughnut data={chartData} options={options} />
        </div>

    )
}

export default SpendingChart;