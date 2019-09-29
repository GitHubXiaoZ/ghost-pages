/*import*/
import React from "react"

//export loading icon
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
