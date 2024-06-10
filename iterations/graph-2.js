import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

// Define data via function

const funcx = (x) => x**2;
const xvar = [0.001, 0.01, 0.1, 1, 2, 3];

function convertToObjectData(xData, func) {
	return xData.map( x => ( { 'x': x, 'y': func(x) } ) );
}; 

const data = convertToObjectData(xvar, funcx);
const data2 = convertToObjectData(xvar, x => x**3 );

/* graphing */

const minX = Math.min(...data.map((d) => d.x));
const minY = Math.min(...data.map((d) => d.y));

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
        
        {/* plot #1 */}
        <Line
          strokeWidth={2}
          data={data}
          dot={false}
          type="monotone"
          dataKey="y"
          stroke="black"
          tooltipType="none"
        />
        
        {/* plot #2 */}
        <Line
          strokeWidth={2}
          data={data2}
          dot={false}
          type="monotone"
          dataKey="y"
          stroke="black"
          tooltipType="none"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
