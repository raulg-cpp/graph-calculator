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
  Range
} from 'mathjs'

// Define data via function

const func_array = [ (x) => x**2,
                     (x) => 1 + x**3,
                     (x) => Math.sin(4*x)
                   ];

const X_MIN = 0;
const X_MAX = 1;
const N_STEP = 25;

const range = new Range(X_MIN, X_MAX, (X_MAX-X_MIN)/N_STEP ); 
const xvar = range.toArray();

function funcToObject(xval, func) {
	return xval.map( x => ( { 'x': x, 'y': func(x) } ) );
}; 

const data_array = func_array.map( func => funcToObject(xvar, func) );

/* graphing */

const minX = 0; // Math.min(...data.map((d) => d.x));
const minY = 0; // Math.min(...data.map((d) => d.y));

export function Chart() {
  return (
    <ResponsiveContainer minWidth="400" height={444}>
      <LineChart
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 20
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <YAxis
          dataKey="y"
          domain={["auto", "auto"]}
          type="number"
          interval={0}
          label={{
            value: `y`,
            style: { textAnchor: "middle" },
            angle: -90,
            position: "left",
            offset: 0
          }}
          allowDataOverflow={true}
          strokeWidth={minX < 0 ? 0 : 1}
        />

        <XAxis
          dataKey="x"
          domain={["auto", "auto"]}
          interval={0}
          type="number"
          label={{
            key: "xAxisLabel",
            value: "x",
            position: "bottom"
          }}
          allowDataOverflow={true}
          strokeWidth={minY < 0 ? 0 : 1}
        />

        {minY < 0 && (
          <ReferenceLine
            y={0}
            stroke="gray"
            strokeWidth={1.5}
            strokeOpacity={0.65}
          />
        )}
        {minX < 0 && (
          <ReferenceLine
            x={0}
            stroke="gray"
            strokeWidth={1.5}
            strokeOpacity={0.65}
          />
        )}

		{/* add multiple lin objects per graph */}
                {/*stroke =  use css named color */}
        { data_array.map( data => (
        	<Line
          		strokeWidth={2}
          		data={ data }
          		dot={false}
          		type="monotone"
          		dataKey="y"
          		stroke="magenta" 
          		tooltipType="none"
        	/>	
        ))}
        
      </LineChart>
    </ResponsiveContainer>
  );
}
