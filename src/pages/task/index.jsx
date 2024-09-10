import React, { useState } from "react";

import "./index.css"

import Footer from "../../layout/footer/inex";
import SpecialTaskList from "./SpecialTaskList";
import RefTaskList from "./RefTaskList";
import LeagTaskList from "./LeagTaskList";


import BalanceIcon from "../../assets/balance.png"


const Task = () =>{
    
    const [tapId, setTapId] = useState(0);
    const [balance, setBalance] = useState(0)

    return (
        <div className="task-page">
            <div className="task-page-top">
                <img src={BalanceIcon} alt="" />
                <span>{balance}</span>
            </div>
            <div className="task-page-button-group">
                <button onClick={()=>{setTapId(0)}} className={tapId===0?"selected-button":"no-selected-button"}>Special</button>
                <div style={{flex:"1"}}></div>
                <button onClick={()=>{setTapId(1)}} className={tapId===1?"selected-button":"no-selected-button"}>Leagues</button>
                <div style={{flex:"1"}}></div>
                <button onClick={()=>{setTapId(2)}} className={tapId===2?"selected-button":"no-selected-button"}>Ref Tasks</button>
            </div>
            {
                tapId === 0 ? <SpecialTaskList setBalance={setBalance}/> : tapId === 1 ? <LeagTaskList setBalance={setBalance}/> : <RefTaskList setBalance={setBalance}/>
            }
            <Footer />
        </div>
    )
}

export default Task