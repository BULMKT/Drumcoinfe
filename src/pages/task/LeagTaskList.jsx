import React, { useState } from "react";
import { useEffect } from "react";

import { getInitInfoFL, finishLeagTask } from "../../api/task";
import { tap } from "../../api/user";

import LeagTaskCard from "../../components/LeagTaskCard";
import Loader from "../../components/Loader";

const leagues = [1000, 5000, 10000, 30000, 50000, 100000, 250000, 500000, 1000000, 5000000]

const LeagTaskList = ({setBalance}) =>{

    const [tasks, setTasks] = useState([]);
    const [league, setLeague] = useState(0);
    const [coins, setCoins] = useState(0);
    const [tapCount, setTapCount] = useState(0);
    const [currentLeagId, setCurrentLeagId] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        let run = async() =>{
            let res = await getInitInfoFL();
            setTasks(res.taskList);
            // console.log(res.info);
            if(localStorage.getItem("coins") !== null && localStorage.getItem("coins") !== undefined){
                res.user.coins = Number(localStorage.getItem("coins"));
            }
            if(localStorage.getItem("league") !== null && localStorage.getItem("league") !== undefined){
                res.user.league = Number(localStorage.getItem("league"));
            }
            setLeague(res.user.league);
            setCoins(res.user.coins);
            setCurrentLeagId(res.user.currentLeagTaskId);
            console.log("====>>>", localStorage.getItem("userTapCount"))
            setTapCount(Number(localStorage.getItem("userTapCount")));
            setIsLoading(false);
        }

        run();
    },[])

    useEffect(()=>{
        setBalance(coins);
    }, [coins])

    const handleClaimClick = async(id) =>{
        setIsLoading(true);
        let nextLvl = id >= tasks.length - 1 ? 100 : tasks[id + 1].lvl;
        await finishLeagTask(nextLvl);

        setCoins(pre=>{
            return pre + tasks[id].bonus;
        })
        setCurrentLeagId(nextLvl);
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

    return(
        isLoading?<Loader isFirst={false}/>:<div className="leag-task-list">
            {
                tasks.map((task, id)=>{
                    let claimalble = false;
                    let progress = 0;
                    if(currentLeagId > task.lvl) progress = 100;
                    if(currentLeagId < task.lvl) progress = 0;
                    if(currentLeagId === task.lvl) progress = 100*tapCount/leagues[currentLeagId];
                    if(currentLeagId === task.lvl && tapCount >= leagues[currentLeagId]) claimalble = true;
                    if(progress>100) progress = 100;
                    return <LeagTaskCard id={id} taskId = {id} claim={handleClaimClick} title={task.title} img={task.img} bonus={task.bonus} progress={progress} clamable = {claimalble}/>
                })
            }
            <div style={{height:"100px"}}>
                &nbsp;
            </div>
        </div>
    )
}

export default LeagTaskList