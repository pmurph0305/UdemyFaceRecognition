import React from 'react'

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.onRouteChange = this.onRouteChange.bind(this);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }

    // handles route change for the various buttons on the signin form.
    onRouteChange(route) {
        this.props.onRouteChange(route);
    }

    // email field change event
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }
    
    // password field change event
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    // when submit is clicked.
    onSubmitSignIn = () => {
        // post form info to server through json.
        fetch('https://warm-oasis-40168.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        // de-json the response
        //.then(response => response.json())
        .then(response => {
            return response.json();
        })
        .then(user => {
            //console.log('user', user);
            // make sure we get a user.
            if(user.id) {
                // load the user info, and re-route to home.
                this.props.loadUser(user);
                this.onRouteChange('home');
            }
        });
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    onChange={this.onPasswordChange} 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                                />
                        </div>
                        <div className="lh-copy mt3">
                        <p 
                                onClick={() => this.onRouteChange('register')}
                                className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
                    
}
                    
export default SignIn;