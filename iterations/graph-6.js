/* libraries */
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
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

const X_OFFSET = 0;
const Y_OFFSET = 0;

const Y_MAX = 2 + Y_OFFSET;
const Y_MIN = -2 + Y_OFFSET;

const X_MIN = -2 + X_OFFSET;
const X_MAX = 2 + X_OFFSET;
const N_STEP = 100.0;

	// function parsing
const func_array = func_array_text.map( func => (xin => evaluate(func, {'x': xin}) ) );

const range = new Range(X_MIN, X_MAX, (X_MAX-X_MIN)/N_STEP ); 

function funcToObject(func) {
	return range.toArray().map( x => ( { 'x': x, 'y': func(x) } ) );
}; 

	// grid points
const data_array = func_array.map( func => funcToObject(func) );

/* graphing */
export function Chart() {
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
          		domain={[Y_MIN, Y_MAX]}
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
          		domain={[X_MIN, X_MAX]}
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
