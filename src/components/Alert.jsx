import React from 'react'

const Alert = (props) => {

    return (
        <div style={{ height: '60px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{props.alert.message}</strong>
            </div>}
        </div>
    )

}

export default Alert;
