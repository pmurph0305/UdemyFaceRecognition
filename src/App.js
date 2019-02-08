// Imports.
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
   
// for fancy particles in the background.
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

const initialState = {
	input: '',
	imageUrl:'',
	box: [{}],
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: '',
	}
}

class App extends Component {

	constructor() {
		super();
		this.state = initialState;
	}
	// testing server response.
	// componentDidMount() {
	// 	fetch('http://localhost:8080')
	// 		.then(response => response.json())
	// 		.then(console.log);
	// }

	// arrow function for load user.
	loadUser = (data) => {
		//console.log(data);
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined,
		}});
	}

	//does the math to calculate the bounding-box values for the face that is drawn.
	calculateFaceLocation(data) {
		// get image width/height before calculating the boxes.
		const image = document.getElementById('img-detected');
		const width = Number(image.width);
		const height = Number(image.height);
		// map returned box data to a new array.
		const boxes = data.outputs[0].data.regions.map(data => {
			const clarafaiBox = data.region_info.bounding_box;
			//console.log(data.region_info.bounding_box);
			return {
				left: clarafaiBox.left_col * width,
				right: width - (clarafaiBox.right_col * width),
				top: clarafaiBox.top_row * height,
				bottom: height - (clarafaiBox.bottom_row * height),
			}
		})
		//console.log(width, height);
		//console.log('boxes:', boxes);
		// return the new boxes array.
		return boxes;
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
	onPictureSubmit = () => {
		// clear box state so they aren't displayed while fetch/thens still going on.
		this.setState({box: [{}]});
		this.setState({imageUrl: this.state.input});
		fetch('https://warm-oasis-40168.herokuapp.com/imageurl', {
				method: 'POST',
				headers: {'Content-Type' : 'application/json'},
				body: JSON.stringify({
					input: this.state.input
				})
			})
			.then(response => response.json())
		  .then(response => {
			 if (response) {
				 fetch('https://warm-oasis-40168.herokuapp.com/image', {
					method: 'PUT',
					headers: {'Content-Type' : 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id,
						// add number of faces to the users count rank.
						faces: response.outputs[0].data.regions.length
					})
				})
				.then(response => response.json())
				.then(count => {
					// use object.assiogn to update entries, this allows a single item of the object to be updated.
					this.setState(Object.assign(this.state.user, { entries: count }))
				})
				.catch(console.log);
			}
			// calculate face locations, then display detected boxes
			 this.displayDetectedFaceBox(this.calculateFaceLocation(response))
		 })
		 .catch(error => console.log(error));
	}

	// handles changing routes(home, signin, register, signout) and setting signin/out.
	onRouteChange = (route) => {
		if (route === 'home') {
			this.setState({isSignedIn: true});
		} else if (route === 'signout') {
			// Change to initial state when someone logs out to get
			// rid of user info.
			this.setState(initialState);
		}
		//console.log(route);
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
					<UserRank 
						name={this.state.user.name}
						entries={this.state.user.entries}
					/>
					<LinkInputForm
						onPictureSubmit={this.onPictureSubmit} 
						onInputChanged={this.onInputChanged}
					/>
					<FaceDetection
						imageUrl={this.state.imageUrl}
						box={this.state.box}
						test={123}
					/>
				</div>
				: (this.state.route === 'register'
				? <Register 
					onRouteChange={this.onRouteChange}
					loadUser={this.loadUser}
				/>
				: <SignIn 
					onRouteChange={this.onRouteChange}
					loadUser={this.loadUser}
					/>
				)}
			</div>
		);
	}
}

export default App;
