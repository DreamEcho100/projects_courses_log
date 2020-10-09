import React, { Component } from 'react'

class SimpleValidationForm extends React.Component {

	render() {

		const check = (e) => {
			e.preventDefault();
			let nameTxt = document.querySelector("#nameCheck");
			let passwordTxt = document.querySelector("#passwordCheck");
			console.log(nameTxt.value, passwordTxt.value)
			if (nameTxt.value === "lol" && passwordTxt.value === "bruh") {
				this.props.loginTrue();
			} else {
				this.props.loginFalse();
			}
		}
		
		const showFormOrLogOutBtn = () => {
			this.props.loginFalse();
		}

		let output = !this.props.toggle ?
					<form>
						<input type="text" id="nameCheck" />
						<input type="password" id="passwordCheck" />
						<button type="submit" onClick={(e) => check(e)} >submit</button>
					</form>
					: <button onClick={showFormOrLogOutBtn}>logOut</button>
		return (
		<div>
			{output}
		</div>
		)
	}
}

export default SimpleValidationForm;