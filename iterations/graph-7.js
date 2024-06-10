/* libraries */
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

import {
  Range, evaluate
} from 'mathjs'

/* Define data via function */

	// Inputs
const func_array_text = [ "1 - x^2", "1 + x^3", "sin(6x)" ];
const color_array = [ "red", "black", "purple" ];

const N_STEP = 100.0;

/* graphing */
export function Chart({xmin, xmax, ymin, ymax}) {
	/* helper values */
	
		// function parsing	
	const range = new Range(xmin, xmax, (xmax-xmin)/N_STEP ); 
	
	function funcToObject(func) {
		return range.toArray().map( x => ( { 'x': x, 'y': func(x) } ) );
	}; 
		// grid points
	const func_array = func_array_text.map( func => (xin => evaluate(func, {'x': xin}) ) );
	const data_array = func_array.map( func => funcToObject(func) );	
	
	
	/* graph components */
	return (
	<ResponsiveContainer minWidth="400" height={444}>
    	<LineChart
    		margin={{
        		top: 10,
        		right: 20,
        		left: 20,
        		bottom: 20
    	}}>
        	
        	{/* Grid highlight */}
        	<CartesianGrid strokeDasharray="3 3" />
	
			{/* Axes */}
        	<YAxis
          		dataKey="y"
          		domain={[ymin, ymax]}
          		type="number"
          		label={{
            		value: `X`,
            		style: { textAnchor: "middle" },
            		angle: -90,
            		position: "left",
            		offset: 0
          		}}
          		allowDataOverflow={true}
        	/>
	
        	<XAxis
          		dataKey="x"
          		domain={[xmin, xmax]}
          		type="number"
          		label={{
            		key: "xAxisLabel",
            		value: "Y",
            		position: "bottom"
          		}}
          		allowDataOverflow={true}
        	/>
	
			{/* Plots */}        	
        	{ data_array.map( (data, index) => (
        		<Line
          			strokeWidth={2}
          			data={ data }
          			dot={false}
          			type="monotone"
          			dataKey="y"
          			stroke={ color_array[index] } 
          			tooltipType="none"
        		/>	
        	))}
    	</LineChart>
	</ResponsiveContainer>
	);
}
