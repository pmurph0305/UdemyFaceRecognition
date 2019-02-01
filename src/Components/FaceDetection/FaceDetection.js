import React from 'react'
import './FaceDetection.css'

class FaceDetection extends React.Component {

    render() {
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id="img-detected" alt="" src={this.props.imageUrl} width='500px' height='auto'/>
                    <div className='bounding-box'
                     style= {{
                         top: this.props.box.top,
                         right: this.props.box.right,
                         bottom: this.props.box.bottom,
                         left: this.props.box.left,
                     }}>

                    </div>
                </div>
            </div>
        )
    }

}

export default FaceDetection;