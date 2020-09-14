import React, { Component } from 'react';
import Radium, {StyleRoot} from 'radium';
import styled from 'styled-components';

const ToggleElement = styled.div`
						margin: 1rem;
						width: fit-content;
						background-image: linear-gradient(to left, #${Math.random().toString(16).substr(-6)}, #${Math.random().toString(16).substr(-6)});
						color: #${Math.random().toString(16).substr(-6)};
						font-size: 3rem;
						font-weight: 700;
						align-text: center;
					`;

let elem1;				

const style1 = {
	width: "75%",
	hight: "20rem",
	margin: "auto",
	textAlign: "center"
}

class TogglingDivWithBtnClassBased extends React.Component  {
	constructor(props) {
		super(props);
		this.toggleBtnRef = React.createRef();
	}

	state = {
		showElem: true
	}

	static getDerivedStateFromProps(props, state) {
		console.log('[TogglingDivWithBtnClassBased.js] getDerivedStateFromProps');
		console.log(state);
		return state;
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('[TogglingDivWithBtnClassBased.js] shouldComponentUpdate');
		console.log({state: this.state, nextState: nextState});
		return this.state !== nextState ? true : false;
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('[TogglingDivWithBtnClassBased.js] getSnapshotBeforeUpdate');
		return {prevProps: prevProps, prevState:prevState}
	}

	componentDidUpdate(prevProps, prevState, snapeshot) {
		console.log('[TogglingDivWithBtnClassBased.js] componentDidUpdate');
		console.log(snapeshot);
	}

	componentDidMount() {
		this.toggleBtnRef.current.click();
		setTimeout( () => document.querySelector("#t-1") ? this.toggleBtnRef.current.click() : null , 5000)
		console.log(" componentDidMount")
	}

	toggleElem = () => {
		this.setState({showElem: !this.state.showElem});
		if (this.state.showElem) {
			elem1 = <ToggleElement>Boooooooooo!!!</ToggleElement>;
		} else {
			elem1 = null;
		}
	}

    render() {
    	console.log('[TogglingDivWithBtnClassBased.js] rendering...');
		return (
			<div style={style1} id="t-1">
				<button ref={this.toggleBtnRef} onClick={this.toggleElem}>Click To Show :)</button>
				{elem1}
			</div>
		);
	}
}

export default Radium(TogglingDivWithBtnClassBased);