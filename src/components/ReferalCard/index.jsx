import React from "react";

import CoinIcon from "../../assets/coin.png"
import FriendIcon from "../../assets/friend.PNG"

import "./index.css"

const ReferalCard = ({title, coins, plus, progress}) =>{
    return (
        <div className="referal-card">
            <div className="referal-card-topbar">
                <h3>{title}</h3>
                <div style={{flex:"1"}}></div>
                <span>+{plus}</span>
                {/* <img src={RightArrowIcon} alt="" /> */}
            </div>
            <div className="referal-card-coins">
                    <img src={FriendIcon} alt="" />
                    <img src={CoinIcon} alt="" />
                    <span>{coins}</span>
                    <div style={{flex:"1"}}></div>
            </div>
            <div className="referal-card-progress">
                <div style={{width:`${progress}%`}}></div>
            </div>
        </div>
    )
}

export default ReferalCard