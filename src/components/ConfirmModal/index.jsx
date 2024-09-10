import React from "react";

import "./index.css"

const ConfirmModal = ({handleCloseClick}) =>{
    return (
        <div className="confirm-modal-div">
            <div className="confirm-modal">
                <h3>
                    NOT ENOUGH COINS
                </h3>
                <span>
                    Make sure you have enough coins to activate the boosts.
                </span>
                <button onClick={handleCloseClick}>CLOSE</button>
            </div>
        </div>
    )
}

export default ConfirmModal