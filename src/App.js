// Imports.
import Clarifai from 'clarifai';
import FaceDetection from './Components/FaceDetection/FaceDetection'
import LinkInputForm from './Components/LinkInputForm/LinkInputForm'
import Logo from './Components/Logo/Logo'
import Navigation from './Components/Navigation/Navigation'
import Particles from 'react-particles-js';
import React, { Component } from 'react';
import Register from './Components/Register/Register'
import SignIn from './Components/SignIn/SignIn';
import UserRank from './Components/UserRank/UserRank'

// CSS
import './App.css';


const app = new Clarifai.App({
	apiKey: '68b7aff4f7f249a4a717359ae81506fa'
});
   
const particleParams = {

	    "particles": {
	        "number": {
				value: 50,
				density: {
					enable: true,
					value_area: 800,
				}
				
	        },
	        "size": {
	            "value": 1
			},
			line_linked: {
				color: '#DD7230',
			}
	    },
}


class App extends Component {

	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl:'',
			box: {},
			route: 'signin',
			isSignedIn: false
		}
	}

	//does the math to calculate the bounding-box values for the face that is drawn.
	calculateFaceLocation(data) {
		const clarafaiBox = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('img-detected');
		const width = Number(image.width);
		const height = Number(image.height);
		console.log(width, height);
		return {
			left: clarafaiBox.left_col * width,
			right: width - (clarafaiBox.right_col * width),
			top: clarafaiBox.top_row * height,
			bottom: height - (clarafaiBox.bottom_row * height),
		}
	}

	// Sets the state of box to box.
	displayDetectedFaceBox(box) {
		this.setState({box: box});
	}

	//sets state of the input when the user enters something into the link box.
	onInputChanged = (event) => {
		this.setState({input: event.target.value});
	}

	// Runs facial detection, queries clarifai's face detect model. then the result to display detected facebox.
	onDetectSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL,
		 this.state.input)
		 .then(response => this.displayDetectedFaceBox(this.calculateFaceLocation(response)))
		 .catch(error => console.log(error));
	}

	// handles changing routes(home, signin, register, signout) and setting signin/out.
	onRouteChange = (route) => {
		if (route === 'home') {
			this.setState({isSignedIn: true});
		} else if (route === 'signout') {
			this.setState({isSignedIn: false})
		}
		console.log(route);
		this.setState({route:route})
	}

	render() {
		return (
			<div className="App">
				<Particles className='particles'
					params={particleParams}
				/>
				<Navigation 
					onRouteChange={this.onRouteChange}
					isSignedIn={this.state.isSignedIn}
					/>
				{ this.state.route=== 'home' 
				? <div>
					<Logo />
					<UserRank />
					<LinkInputForm
						onDetectSubmit={this.onDetectSubmit} 
						onInputChanged={this.onInputChanged}
					/>
					<FaceDetection
						imageUrl={this.state.imageUrl}
						box={this.state.box}
					/>
				</div>
				: (this.state.route === 'register'
				? <Register onRouteChange={this.onRouteChange}/>
				: <SignIn onRouteChange={this.onRouteChange}/>
				)}
			</div>
		);
	}
}

export default App;
