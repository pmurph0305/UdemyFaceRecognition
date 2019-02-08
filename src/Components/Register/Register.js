import React from 'react'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerName: '',
            registerPasssword: '',
        }
    }

    //Handles the route change for the register button. Passes the event on to parent.
    onRouteChange() {
        this.props.onRouteChange('home');
    }

    // When email input field is changed.
    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value});
    }
    
    // When password input field is changed.
    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});
    }

    // When name input field is changed.
    onNameChange = (event) => {
        this.setState({registerName: event.target.value});
    }

    // When register button is clicked.
    onSubmitRegister = () => {
        // fetch to server with POST request with json
        fetch('https://warm-oasis-40168.herokuapp.com/register', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName,
            })
        })
        // get response
        .then(response => response.json())
        .then(user => {
            // if we get a user, server will return something, so use user.id to check.
            if (user.id) {
                // load the user and change route.
                this.props.loadUser(user);
                this.onRouteChange('home');
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    onChange={this.onNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name" 
                                    id="name" />
                            </div>
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
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register" 
                                />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}
                    
export default Register;