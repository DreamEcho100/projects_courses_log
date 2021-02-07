import React from "react";
import "./SignInAndSignUp.styles.scss";
import SignIn from "../../Components/SignIn/SignIn";
import SignUp from "../../Components/SignUp/SignUp";

const SignInAndSignUp = () => {
	return (
		<section className="sign-in-and-sign-up-section">
			<SignIn />
			<SignUp />
		</section>
	);
};

export default SignInAndSignUp;
