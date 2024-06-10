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

/*
const funcx = (x) => x^2;
const xvar = [0, 1, 2, 3]
const yvar = [ for( var i = 0; i < length(xvar); i += 1 ) funcx(i) ];
*/

const func = (x) => x**2;
const xvar = [0, 1, 2, 3];

const yvar = xvar.map( x => func(x) );

const data = xvar.map( x => ( {'x': x, 'y': func(x)} ) );
/*
const data = [
  {
    x: -50,
    y: 0
  },
  {
    x: 0,
    y: 0
  },
  {
    x: 50,
    y: 50
  },
  {
    x: 100,
    y: 20
  },
  {
    x: 150,
    y: 150
  },
  {
    x: 200,
    y: 100
  },
  {
    x: 250,
    y: 0
  },
  {
    x: 350,
    y: 15
  },
  {
    x: 400,
    y: 400
  },
  {
    x: 450,
    y: 450
  },
  {
    x: 500,
    y: 500
  }
];
*/
// chart

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

        <Line
          strokeWidth={2}
          data={data}
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
