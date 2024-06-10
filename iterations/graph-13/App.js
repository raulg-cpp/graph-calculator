import "./styles.css";
import { Chart } from "./graph";
import {useState} from 'react';

const COLORS = ["black", "gray", "blue", "red", "yellow", "magenta", "gold", "teal"];
const DEFAULT_BOUND = 5;

export default function App() {
	// -- axis bounds
	const defaultBounds = () => ({ xmin: -DEFAULT_BOUND, xmax: DEFAULT_BOUND ,
	               	               ymin: -DEFAULT_BOUND, ymax: DEFAULT_BOUND });
	
	const [bounds, setBounds] = useState( defaultBounds() );	         
	               
	const [boundsRaw, setBoundsRaw] = useState( 
					{ xmin: bounds.xmin, xmax: bounds.xmax  ,
					  ymin: bounds.ymin, ymax: bounds.ymax } );
	              	  		
	const boundSubmit = (value, key) => {
		const data_new = {...boundsRaw};
		data_new[key] = Number(value);
		setBoundsRaw(data_new);
	}
		
	// -- form submit, update values
	const inputObject = () => ( { equation: "", color: COLORS[0] } );
	
	const [graphsRaw, setGraphsRaw] = useState( [inputObject()] );
	const [graphs, setGraphs] = useState( {functions: [], colors: []} );
	
	const inputSubmit = (event) => {
		// update graphs
		event.preventDefault();
		const obj = { functions: graphsRaw.map( item => item.equation ),
		              colors:    graphsRaw.map( item => item.color )  };
		setGraphs( obj );
		
		// update bounds
		if( boundsRaw['xmax'] > boundsRaw['xmin'] && 
		    boundsRaw['ymax'] > boundsRaw['ymin'] ) {
			setBounds(boundsRaw);
		}
	}
		           
	// -- output          
	return (
	<div>
		{/* input form */}
		<form onSubmit={inputSubmit}>
			{/* graphs */}
			<div>
				{ graphsRaw.map( (item, index) => (
				<div>
					<input id="equation" type="text" 
			    		onChange={ event => ( item.equation = event.target.value) }>
					</input>
					
					<select id="color" onChange={ event => ( item.color = event.target.value ) }>
						{ COLORS.map( color => (
							<option value={color}> {color} </option>
						))}
					</select>
				</div>
				))}
			</div>
			
			{/* Bounds */}
			<div>
				{ Object.keys(bounds).map( key => (
					<div>
						<label target={key}> {key} </label>
						<input id="bound_input" type="number" step="0.0001" value={ boundsRaw[key] } id={key}
							   onChange={ event => boundSubmit(event.target.value, key) }
						></input>
					</div>
				))}
				<button onClick={ event => { setBoundsRaw( defaultBounds() ) } } > Reset </button>
			</div>
			
			<button type="submit">Submit</button>
		</form>
		
		{/* change equation number */}
		<div>
			{/* add */}
			<button type="button" 
				onClick={ () => {
					if( graphsRaw.length < COLORS.length ) {
						setGraphsRaw( data => [ ...data, inputObject() ] )
					}
				}}
			> Add </button>
			
			{/* remove */}
			<button type="button" 
				onClick={ () => {
					if( graphsRaw.length > 1 ) {
						let data_new = [...graphsRaw];
						data_new.pop();			
						setGraphsRaw(data_new);	
					}
				}}
			> Remove </button>	
		</div>
	
		{/* plot */}
		<Chart bounds={bounds} graphs={graphs} />
	</div> );
}
