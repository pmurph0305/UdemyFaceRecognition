import React from 'react'
import './FaceDetection.css'
import Box from '../Box/Box.js'

class FaceDetection extends React.Component {



    render() {
        // Modified it to a seperate component to try to help another user in discord.
        const boxes =this.props.box.map((aBox, index) => {
            return <Box 
                key={index}
                top={aBox.top}
                right={aBox.right}
                bottom={aBox.bottom}
                left={aBox.left}
            />
        })

        // console.log(boxes);

        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id="img-detected" alt="" src={this.props.imageUrl} width='500px' height='auto'/>
                    {/* Display multiple boxes from above array */}
                    <div>{boxes}</div>
                        {/* Display multiple boxes from the array returned: */}
                        {/* {this.props.box &&
                            this.props.box.map((aBox, index) => {
                                return (
                                    <div className = 'bounding-box'
                                    key = {index}
                                    style= {{
                                        top: aBox.top,
                                        right: aBox.right,
                                        bottom: aBox.bottom,
                                        left: aBox.left,
                                    }}/>);
                            })
                        } */}

                        
                    {/* For a single box: (Changed to add [0] due to above*/}
                    {/* <div className='bounding-box'
                        style= {{
                            top: this.props.box[0].top,
                            right: this.props.box[0].right,
                            bottom: this.props.box[0].bottom,
                            left: this.props.box[0].left,
                        }}>
                    </div> */}
                </div>
            </div>
        )
    }

}

export default FaceDetection;