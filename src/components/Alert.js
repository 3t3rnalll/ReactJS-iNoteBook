import React from 'react'

const Alert = (props) => {
    return (
        <div>
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert