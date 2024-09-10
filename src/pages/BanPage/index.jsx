import React from "react";

import tapIcon from '../../assets/tap.png'

import "./index.css"

const BanPage = () =>{
    return (
        <div className="ban-page">
            <img src={tapIcon} alt="" />
            <h3>This app is not available on desktop</h3>
        </div>
    )
}

export default BanPage