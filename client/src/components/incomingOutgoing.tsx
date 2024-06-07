import { ResponsiveLine } from '@nivo/line';
import { incomingOutgoingProp } from '../../utils/dataProps';

const IncomingOutgoingChart:React.FC<incomingOutgoingProp> = ({incoming, outgoing}) => {
   
    // Transform the data
    const incomingData = incoming.map((y, index) => ({
        x: index + 1, // Sequential x values
        y: y,
    }));
    
    const outgoingData = outgoing.map((y, index) => ({
        x: index + 1, // Sequential x values
        y: y,
    }));
    
    const data = [
        {
            id: 'Incoming',
            data: incomingData,
            color: 'hsl(200, 70%, 50%)' // Customize color for Incoming
        },
        {
            id: 'Outgoing',
            data: outgoingData,
            color: 'hsl(50, 70%, 50%)' // Customize color for Outgoing
        }
    ];
    
    return <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            enableGridX={false}
            enableGridY={false}
            xScale={{ type: 'linear', min: 1, max: Math.max(incomingData.length, outgoingData.length) }} // Adjust scale as necessary
            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            axisBottom={null}
            useMesh={true}
            axisLeft={{
                legend: 'Amount £',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ datum: 'color' }} // Use color defined in data
            pointSize={3}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            tooltip={({point}) => (
                <strong className={`bg-red-400 p-2 rounded`}> {point.data.yFormatted} </strong>   
              )}
            
            theme={{
                axis: {
                    ticks: {
                        text: { fill: '#e2e8f0' }
                    },

                    legend: {
                        text: { fill: '#e2e8f0' }
                    }
                }
            }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateY: 50,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    symbolSize: 10,
                    symbolShape: 'circle',
                }
            ]}
        />    

}


export default IncomingOutgoingChart;