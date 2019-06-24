import React from "react"

export default () => {
    return (
        <div>
            <img 
                src={window.location.origin + '/images/Spinner.gif'}
                alt="loading..."
                />
        </div>
    )
}
