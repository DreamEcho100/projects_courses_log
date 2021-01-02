import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    }
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  }

  onSubmitSignIn = () => {
    const { signInEmail, signInPassword} = this.state
    if (
      (!signInEmail || signInEmail.length === 0 )||
      (!signInPassword || signInPassword.length < 8 || signInPassword.length > 64)
    ) return console.error("Error Wrong inputs");
    fetch("https://floating-dusk-25989.herokuapp.com/signin", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      }
    });
  }

  render() {
    const { onRouteChange } = this.props;

    return (
      <article style={{ margin: "auto" }} className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center-items-in flex-column-direction">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={this.onEmailChange}
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
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={ this.onSubmitSignIn }
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f4 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;