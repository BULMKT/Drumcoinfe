import React from "react";

import "./index.css"

const BoostModal = ({handleOkClick, handleCloseClick, content, isOkShown}) =>{
    return (
        <div className="boost-modal">
            <h3>
                {content}
            </h3>
            <div>
                <button onClick={handleCloseClick}>Close</button>
                {isOkShown ? <button onClick={handleOkClick}>Ok</button> : ""}
            </div>
        </div>
    )
}

export default BoostModal