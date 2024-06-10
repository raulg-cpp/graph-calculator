import "./styles.css";
import { Chart } from "./graph";
import {useState} from 'react';

const DEFAULT_COLOR = "black";
const DEFAULT_BOUND = 2;

export default function App() {
	// placeholder data
	const [bounds, setBounds] = useState( 
					{ xmin: -DEFAULT_BOUND, xmax: DEFAULT_BOUND ,
	               	  ymin: -DEFAULT_BOUND, ymax: DEFAULT_BOUND } );	         
	               	  	
	// axis bounds
	const shiftBound = (offset, axis) => {
		let bounds_new = bounds;
		if( axis === 'y' ) {
			bounds_new.ymax += offset;
			bounds_new.ymin += offset;
		} else if ( axis === 'x' ) {
			bounds_new.xmax += offset;
			bounds_new.xmin += offset;
		}
		setBounds(bounds_new);
	}
	  	
	// form submit, update values
	const inputObject = () => ( { equation: "", color: DEFAULT_COLOR } );
	
	const [data, setData] = useState( [inputObject()] );
	const [graphs, setGraphs] = useState( {functions: [], colors: []} );
	
	const handleSubmit = (event) => {
		event.preventDefault();
		const obj = { functions: data.map( item => item.equation ),
		              colors:    data.map( item => item.color )  };
		setGraphs( obj );
	}
		           
	// output          
	return (
	<div>
		{/* input form */}
		<form onSubmit={handleSubmit}>
			{ data.map( (item, index) => (
			<>
			<input id="equation" type="text" 
			    onChange={ event => ( item.equation = event.target.value) }>
			</input>
			
			<select id="color" 
				onChange={ event => ( item.color = event.target.value ) }>
				{/* colors */}
				<option value={DEFAULT_COLOR}>{DEFAULT_COLOR}</option>
				<option value="blue"> blue </option>
				<option value="red"> red </option>
				<option value="green"> green </option>
				<option value="purple"> purple </option>
			</select>
			</>
			))}
			<button type="submit">Submit</button>
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
		
		{/* axis buttons */}
		<div>
			<button type="button" onClick={ event => shiftBound(1, 'x') }> X+ </button>	
					
			<button type="button" onClick={ event => shiftBound(-1, 'x') }> X- </button>
		</div>
	
		{/* plot */}
		<Chart bounds={bounds} graphs={graphs} />
	</div> );
}
