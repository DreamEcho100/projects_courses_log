import React from 'react';

const Inp = (props) => {

	return (
		<div>
			<input type="text" onChange={props.change} value={props.current} />
			<p>{props.current}</p>

		</div>
	)
}

export default Inp;