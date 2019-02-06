import React from 'react'
import './LinkInputForm.css'

class LinkInputForm extends React.Component {
    constructor() {
        super();
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onPictureSubmit = this.onPictureSubmit.bind(this);
    }

    // passes the url entered into the field up to the parent to save in the state.
    onInputChanged(event) {
        this.props.onInputChanged(event);
    }

    // called when detect button is clicked, starts face-recognition process.
    onPictureSubmit(event) {
        this.props.onPictureSubmit(event);
    }

    render() {
        return (
            <div>
                <p className='f3 tc-dp'>
                    {'This app will detect faces in submitted photos.'}
                </p>
                <div className='center'>
                    <div className='form center pa4 br3 shadow-5'>
                        <input type='text' 
                            className='bw0 f4 w-75' 
                            placeholder=' Input Link to Image'
                            onChange={this.onInputChanged}
                        />
                        <button 
                            className='w-25 grow pb1 f4 bw0 link dib tc-ly bg-dp'
                            onClick={this.onPictureSubmit}
                        >Detect</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default LinkInputForm;