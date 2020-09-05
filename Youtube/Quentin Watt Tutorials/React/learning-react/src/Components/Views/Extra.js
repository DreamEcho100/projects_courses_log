import React from 'react';
import CounterExample from './../CounterExample.js'
import HelloWorld from './../HelloWorld.js';

function Extra() {
	return (
		<div>
			<h1>Extra: </h1>
			<HelloWorld name="Mazen Mohamed"/>
	        <h1>Hello World!</h1>
	        <CounterExample/>
		</div>
	)
}

export default Extra;