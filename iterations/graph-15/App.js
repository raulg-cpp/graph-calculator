import "./styles.css";
import { Chart } from "./graph";
import {useState} from 'react';

const COLORS = ["black", "gray", "blue", "red", "yellow", "magenta", "gold", "teal"];
const DEFAULT_BOUND = 5;
const STEP_BOUND = 0.0001;

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
	<div className="container">
		<div id="header" className="text-center my-2">
			<h1 className="fw-bold">Graphing Calculator</h1>
			<p>Enter a function y = f( <b>x</b> ). Example: "sin(x) + 1"</p>
		</div>
		
		<div className="container">
			{/* change equation number */}
			<div id="equation_buttons">
				{/* add */}
				<button type="button" className="btn btn-success" 
					onClick={ () => {
						if( graphsRaw.length < COLORS.length ) {
							setGraphsRaw( data => [ ...data, inputObject() ] )
						}
					}}
				> Add </button>
				
				{/* remove */}
				<button type="button" className="btn btn-danger mx-1" 
					onClick={ () => {
						if( graphsRaw.length > 1 ) {
							let data_new = [...graphsRaw];
							data_new.pop();			
							setGraphsRaw(data_new);	
						}
					}}
				> Remove </button>	
			
				{/* description */}
				<h4 className="d-inline"> Equation </h4>
			</div>
		
			{/* input form */}
			<form onSubmit={inputSubmit} className="my-2">
				{/* graphs */}
				<div className="">
					{ graphsRaw.map( (item, index) => (
					<div key={index} className="input-group my-2">
						{/* equation */}
						<input id="equation" type="text" className="form-control form-equation d-inline"
			    			onChange={ event => ( item.equation = event.target.value) }>
						</input>
						{/* colors */}
						<select id="color" className="form-select form-color d-inline mx-1"
							onChange={ event => ( item.color = event.target.value ) }>
							{ COLORS.map( color => (
								<option key={color+index} value={color}> {color} </option>
							))}
						</select>
					</div>
					))}
				</div>
				
				{/* Bounds */}
				<div className="row my-2">
					{ Object.keys(bounds).map( key => (
						<div key={key} className="input-group col">
							<label htmlFor={key} 
								className="form-label w-25 text-center align-self-center bold fw-bold" 
							> {key} 
							</label>
							
							{/* Bound inputs */}
							<input type="number" step={STEP_BOUND} value={ boundsRaw[key] } id={key}
								className="form-control"	
								onChange={ event => boundSubmit(event.target.value, key) }
							></input>
						</div>
					))}
				</div>
				
				{/* buttons */}
				<div className="my-2">
					{/* submit form */}
					<button type="submit" className="btn btn-primary"> Submit </button>
					
					{/* reset bounds */}
					<button className="btn btn-warning mx-1" 
						onClick={ event => { setBoundsRaw( defaultBounds() ) } } 
					> Reset Bounds </button>
				</div>
			</form>
		</div>
	
		{/* plot */}
		<Chart bounds={bounds} graphs={graphs} />
	</div> );
}
