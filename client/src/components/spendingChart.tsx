import { ResponsivePie } from '@nivo/pie';

const SpendingChart:React.FC<{spendingCategories:string[], categoryCount: number[]}> = ({spendingCategories, categoryCount}) => {
    const data = spendingCategories.map((category,index)=>(
        {
            "id": category,
            "label": category,
            "value": categoryCount[index],
        }
    ))
    
    return <ResponsivePie
            data={data}
            margin={{top:0, bottom:0, right: 120, left: 120 }} 
            enableArcLabels={false}     
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            arcLinkLabelsSkipAngle={5}
            arcLinkLabelsThickness={2}
            arcLabelsSkipAngle={5}
            colors={{scheme:'spectral'}}
            arcLinkLabelsColor={{from:'color'}}
            arcLinkLabelsTextColor = '#e2e8f0'
            tooltip={({ datum: { id, value } }) => (
              <strong className={`bg-red-400 p-2 rounded`}> {id}: {value} </strong>   
            )}
        />    

}


export default SpendingChart;