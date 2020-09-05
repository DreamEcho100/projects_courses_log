import React, {Component} from 'react';

class HelloWorld extends React.Component {
	render(){
		return (
			<h1>Hello World Again, From Another Place :), Hi {this.props.name}!!!</h1>
		)
	}
}

/*
function HelloWorld(props) {
	return (
		<h1>Hello World Again, From Another Place :), Hi {props.name}!!!</h1>
	);
}
*/

export default HelloWorld;
