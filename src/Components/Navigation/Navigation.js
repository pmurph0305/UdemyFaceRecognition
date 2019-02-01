import React from 'react'
import './Navigation.css'

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.onRouteChange = this.onRouteChange.bind(this);
    }

    // handles route changes when clicking displayed buttons.
    onRouteChange(route) {
        this.props.onRouteChange(route);
    }


    render() {
        // displays signout if signed in.
        if (this.props.isSignedIn) {
            return (
                <nav>
                    {/* Using tachyons to style. */}
                    <p
                        onClick={() => this.onRouteChange('signout')}
                        className='f3 link dim underline pa3 pointer'>Sign Out</p>
                </nav>
            )
        } else {
        // otherwise displays signin and register button if not signed in.
            return (
                <nav>
                    <p
                        onClick={() => this.onRouteChange('signin')}
                        className='f3 link dim underline pa3 pointer'>Sign In</p>
                    <p
                        onClick={() => this.onRouteChange('register')}
                        className='f3 link dim underline pa3 pointer'>Register</p>
                </nav>
            )
        }
    }

}

export default Navigation;