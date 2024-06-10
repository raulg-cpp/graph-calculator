import "./styles.css";
import { Chart } from "./graph";
import {useState} from 'react';


const func_array = [ "1 - x^2", "1 + x^3", "sin(6x)" ];
const color_array = [ "red", "black", "purple" ];

export default function App() {
	// placeholder data
	const bounds = { xmin: -2, xmax: 2 ,
	                 ymin: -2, ymax: 2 };
	                 
	const graphs = { functions: func_array, colors: color_array };
	            	
	const DEFAULT_COLOR = "black";
	            		           
	// form submit, update values
	const inputObject = () => ( { equation: "", color: DEFAULT_COLOR } );
	
	const [data, setData] = useState( [inputObject()] );
	
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(data);
	}
		           
	// output          
	return (
	<div>
		{/* input form */}
		<form onSubmit={handleSubmit}>
			{ data.map( (item, index) => (
			<>
			<input id="equation" type="text" 
			    onChange={ event => ( data[index].equation = event.target.value) }>
			</input>
			
			<select id="color" 
				onChange={ event => ( data[index].color = event.target.value ) }>
				{/* colors */}
				<option value={DEFAULT_COLOR}>{DEFAULT_COLOR}</option>
				<option value="blue"> blue </option>
				<option value="red"> red </option>
				<option value="green"> green </option>
				<option value="purple"> purple </option>
			</select>
			</>
			))}
			<button type="submit" onSubmit={handleSubmit}>Submit</button>
		</form>
		
		{/* change equation number */}
		<div>
			{/* add */}
			<button type="button" 
				onClick={ () => setData( data => [ ...data, inputObject() ] ) }
			> Add </button>
			
			{/* remove */}
			<button type="button" 
				onClick={ () => {
					if( data.length > 1 ) {
						let data_new = [...data];
						data_new.pop();				// update variable
						setData(data_new);			// store update
					}
				}}
			> Remove </button>
			
		</div>
	
		{/* plot */}
		<Chart bounds={bounds} graphs={graphs} />
	</div> );
}
