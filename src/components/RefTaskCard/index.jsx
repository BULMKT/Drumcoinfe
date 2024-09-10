import React from "react";

import RefTaskIcon from "../../assets/tap.png"
import ClaimIcon from '../../assets/CLAIM.png'
import ClaimDarkIcon from '../../assets/CLAIMdark.png'
import CoinIcon from '../../assets/coin.png'

import "./index.css"

const RefTaskCard = ({title, bonus, status, id, claim}) =>{

    const handleClaimClick = () =>{
        if(status === 1) return;
        claim(id);
    }

    return (
        <div className="ref-task-card">
            <img src={RefTaskIcon} alt="" />
            <div>
                <h3>{title}</h3>
                <div>
                    <img src={CoinIcon} alt="" />
                    <span>{bonus}</span>
                </div>
            </div>
            <img src={status === 0?ClaimIcon:ClaimDarkIcon} onClick={handleClaimClick} style={{width:"75px", marginRight:"10px", cursor:"pointer"}} alt="" />
        </div>
    )
}

export default RefTaskCard