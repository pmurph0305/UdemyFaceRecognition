import React from 'react';
import Tilt from 'react-tilt'
import LogoImage from './logo.png'
import './Logo.css'

class Logo extends React.Component {

    render() {
        return (
            <div className='ma4 mt0'>
                {/* Tilt component from react-tilt */}
                <Tilt className="Tilt br2 shadow-2" options={{ max : 40 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner pa3">
                        <img className='pt2' alt='Logo' src={LogoImage}/>
                    </div>
                </Tilt>
            </div>
        )
    }
}

export default Logo;