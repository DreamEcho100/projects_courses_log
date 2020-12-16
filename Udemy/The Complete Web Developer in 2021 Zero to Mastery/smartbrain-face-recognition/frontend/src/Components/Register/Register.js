import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  }

  onSubmitSignIn = () => {
    if (this.state.name.length <= 0 ||
this.state.email.length <= 0 ||
this.state.password.length <= 0) return;
    fetch("http://localhost:5000/register", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then((user) => {
      if (user) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      }
    });
    /*.then(data => {
      if (data === "success") this.props.onRouteChange("home");
    });*/
    /*.then(response => response.json())
    .then(data => {
      if (data === "success") this.props.onRouteChange("home");
    });*/
  }
  
  render() {
    const { onNameChange, onEmailChange, onPasswordChange,  onSubmitSignIn } = this;
    
    return (
      <article style={ {margin: "auto"} } className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center-items-in flex-column-direction">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  required
                  minLength="8"
                  maxLength="64"
                  onChange={ onNameChange }
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={ onEmailChange }
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  minLength="8"
                  maxLength="64"
                  required
                  onChange={ onPasswordChange }
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={ onSubmitSignIn }
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;