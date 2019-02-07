import React from 'react'

class UserRank extends React.Component {
    
    render() {
        return (
            <div>
                <div className='tc-db f3'>
                    {`${this.props.name}, your current number of faces detected is...`}
                </div>
                <div className='tc-db f1'>
                    {this.props.entries}
                </div>
            </div>
        )
    }

}

export default UserRank;