import React from "react";

import coinIcon from '../../assets/balance.png'
import claimIcon1 from "../../assets/CLAIM.png"
import claimIcon2 from "../../assets/CLAIMdark.png"

import "./index.css"

const LeagTaskCard = ({title, taskId , img, progress, bonus, clamable, claim}) =>{

    const handleClaim = () =>{ 
        if(!clamable) return;
        claim(taskId);
    }

    return (
        <div className="leag-task-card">
            <div>
                <img src={img} alt="Image" />
                <div className="leag-task-card-center">
                    <h2>{title}</h2>
                    <div>
                        <img src={coinIcon} alt="" />
                        <p>{bonus}</p>
                    </div>
                </div>
                <img style={{cursor:"pointer"}} onClick={handleClaim} src={!clamable?claimIcon2:claimIcon1} alt="" />
            </div>
            <div className="leag-task-card-progress-bar">
                <div style={{width:`${progress}%`}}>

                </div>
            </div>
        </div>
    )
}

export default LeagTaskCard