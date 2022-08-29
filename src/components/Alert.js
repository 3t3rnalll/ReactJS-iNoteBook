import React from 'react'

const Alerts = (props) => {

    return (
        props.alert && <div style={{
            position: 'fixed', width: '100%', marginTop: '56px', zIndex: 1
        }}>
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show `} role="alert">
                {props.alert.message}
            </div>
        </div >
    )
}

export default Alerts