import React from 'react'
import '../FaceDetection/FaceDetection.css'

// Smart / basic destructured both in here as I was
// trying to figure out what another user's issue was because
// they were not using 'smart' components.

// class Box extends React.Component {

//     render() {
//         return (
//             <div className = 'bounding-box'
//             style= {{
//                 top: this.props.top,
//                 right: this.props.right,
//                 bottom: this.props.bottom,
//                 left: this.props.left,
//             }}></div>);
//     }

// }

const Box = ({top, right, bottom, left}) => {
    return (
        <div className = 'bounding-box'
        style= {{
            top: top,
            right: right,
            bottom: bottom,
            left: left,
        }}></div>
    );
}

export default Box;