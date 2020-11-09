import React, { useState, useEffect, useRef } from 'react';
import Radium, {StyleRoot} from 'radium';
import styled from 'styled-components';

					

const style2 = {
	width: "75%",
	hight: "20rem",
	margin: "auto",
	textAlign: "center"
}

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

const TogglingDivWithBtnFunctionBased = (props) => {
	const toggleBtnRef = useRef(null)
	const [showElem, setShowElem] = useState(true);
	useEffect( () => {
		console.log('[TogglingDivWithBtnFunctionBased.js] useEffect');
	}, [showElem]);

	useEffect( () => {
		console.log('[TogglingDivWithBtnFunctionBased.js] useEffect, First time bro!');
		toggleBtnRef.current.click();
		setTimeout( () => document.querySelector("#t-2") ? toggleBtnRef.current.click() : null , 5000)
		return () => {
			console.log('[TogglingDivWithBtnFunctionBased.js] cleanup work in useEffect')
		}
	}, []);

	const toggleElem = () => {
		setShowElem(!showElem);
		if (showElem) {
			elem1 = <ToggleElement>Boooooooooo!!!</ToggleElement>;
		} else {
			elem1 = null;
		}
	}

	return (
		<div style={style2}  id="t-2">
			<button ref={toggleBtnRef} onClick={toggleElem}>Click To Show :)</button>
			{elem1}
		</div>
	);
}

export default Radium(TogglingDivWithBtnFunctionBased);