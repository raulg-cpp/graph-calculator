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

/* graphing */
const N_STEP = 100.0;	// x-grid divisions

export function Chart({bounds, graphs}) {
	/* helper values */
	
		// function parsing	
	const range = new Range(bounds.xmin, bounds.xmax, (bounds.xmax - bounds.xmin)/N_STEP ); 
	
	function funcToObject(func) {
		return range.toArray().map( x => ( { 'x': x, 'y': func(x) } ) );
	}; 
	
	function parseEquation(func) {
		function output(xin) { 
			try {	// check output
				var value = evaluate( func, {'x': xin} ); // declare variable
			} catch(error) {
				value = null;
			} 	
			return value;
		}
		return xin => output(xin);
	};
	
	const func_array = graphs.functions.map( func => parseEquation(func) );
	
		// grid points
	const object_array = func_array.map( func => funcToObject(func) );	
	
	/* graph components */
	return (
	<ResponsiveContainer minWidth="400" height={400}>
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
          		domain={[bounds.ymin, bounds.ymax]}
          		type="number"
          		label={{
            		value: `y`,
            		style: { textAnchor: "middle" },
            		angle: -90,
            		position: "left",
            		offset: 0
          		}}
          		allowDataOverflow={true}
        	/>
	
        	<XAxis
          		dataKey="x"
          		domain={[bounds.xmin, bounds.xmax]}
          		type="number"
          		label={{
            		key: "xAxisLabel",
            		value: "x",
            		position: "bottom"
          		}}
          		allowDataOverflow={true}
        	/>
	
			{/* Plots */}        	
        	{ object_array.map( (data, index) => (
        		<Line
        			key={index}
          			strokeWidth={2}
          			data={ data }
          			dot={false}
          			type="monotone"
          			dataKey="y"
          			stroke={ graphs.colors[index] } 
          			tooltipType="none"
          			isAnimationActive={false}
        		/>	
        	))}
    	</LineChart>
	</ResponsiveContainer>
	);
}
