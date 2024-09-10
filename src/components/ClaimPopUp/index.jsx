import React from "react";

import "./index.css"

const ClaimPopUp = ({handleScreenClick}) =>{
    return (
        <div className="pop-up-div" onClick={handleScreenClick}>
            <div className="claim-pop-up">
                <h2 style={{color:"#e1b40e"}}>CLAIM IS NOT ACTIVE</h2>
                <div>
                    <h2>You will be able to CLAIM once the</h2>
                    <h2>daily timer in the top left ends</h2>
                </div>
            </div>
        </div>
    )
}

export default ClaimPopUp