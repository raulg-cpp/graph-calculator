import "./styles.css";
import { Chart } from "./graph";

const func_array = [ "1 - x^2", "1 + x^3", "sin(6x)" ];
const color_array = [ "red", "black", "purple" ];

export default function App() {
	const bounds = { xmin: -2, xmax: 2 ,
	                 ymin: -2, ymax: 2 };
	                 
	const graphs = { functions: func_array, colors: color_array };
	                 
	return (
	<div>
		<Chart bounds={bounds} graphs={graphs} />
	</div> );
}
