import React, { useEffect, useState } from "react";

import { getInitInfoFR, finishRefTask } from "../../api/task";
import { tap } from "../../api/user";

import RefTaskCard from "../../components/RefTaskCard";
import Loader from "../../components/Loader";

const RefTaskList = ({setBalance}) =>{
    const [invNumber, setInvNumber] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [currentRefTaskId, setCurrentRefTaskId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [coins, setCoins] = useState(0);
    
    useEffect(()=>{
        const run = async() =>{
            setIsLoading(true);
            let res = await getInitInfoFR();
            setTasks(res.taskList);
            if(localStorage.getItem("coins") !== null) setCoins(Number(localStorage.getItem("coins")));
            else setCoins(res.user.coins);
            setCurrentRefTaskId(res.user.currentRefTaskId)
            setInvNumber(res.user.invNumber);
            // console.log(res);
            setIsLoading(false);
        }

        run();
    }, [])

    useEffect(()=>{
        setBalance(coins);
    }, [coins])

    const handleClaim = async(id) =>{
        setIsLoading(true);

        setCoins(pre=>{
            return pre + tasks[id].bonus;
        })
        setCurrentRefTaskId(currentRefTaskId + 1);
        await finishRefTask(id + 1);
        let energy = -1;
        let lastEnergyAt;
        if(localStorage.getItem("energy") !== null){
            energy = Number(localStorage.getItem("energy"));
            lastEnergyAt = localStorage.getItem("lastEnergyDate");
        }

        let usd = -1;
        if(localStorage.getItem("usd") !== null) usd = Number(localStorage.getItem("usd"));

        localStorage.removeItem("coins");
        localStorage.removeItem("usd");
        localStorage.removeItem("energy");
        localStorage.removeItem("lastEnergyDate");

        await tap({currentEnergy: energy, amountOfUSD: usd, amountOfcoin:coins + tasks[id].bonus, lastEnergyAt});
        
        setIsLoading(false);
    }

    return (
        isLoading?<Loader isFirst={false}/>:
        <div className="ref-task-list">
            {
                tasks?.map((task, id)=>{
                    if(currentRefTaskId > id) return;
                    let status = 1;
                    if(currentRefTaskId === id && invNumber >= task.refNumber) status = 0;
                    return <RefTaskCard id={id} title = {task.title} bonus={task.bonus} status={status} claim={handleClaim}/>
                })
            }
        </div>
    )
}

export default RefTaskList