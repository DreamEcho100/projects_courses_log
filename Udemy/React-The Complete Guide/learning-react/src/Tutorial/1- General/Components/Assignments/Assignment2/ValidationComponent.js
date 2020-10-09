import React from 'react';

const ValidationComponent = (props) => {
 let shortOrLong;
 if (props.length < 5) {
  shortOrLong = "Text too short < 5";
 }
 if (props.length > 15) {
  shortOrLong = "Text long enough >= 15";
 }
	return (
		<div>{shortOrLong}</div>
	)
}

export default ValidationComponent;