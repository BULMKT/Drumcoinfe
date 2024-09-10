import React, { useEffect, useState, useTransition } from "react";

import { getInitInfoFS, finishSpecialTask } from "../../api/task";
import { tap } from "../../api/user";

import SpecialTaskCard from "../../components/SpecialTaskCard"
import Loader from "../../components/Loader";

const SpecialTaskList = ({setBalance}) =>{

    const [doneList, setDoneList] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [coins, setCoins] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const run = async() =>{
            let res = await getInitInfoFS();
            // console.log(res);
            setTasks(res.taskList);
            setDoneList(res.doneList);
            if(localStorage.getItem("coins") !== null) setCoins(Number(localStorage.getItem("coins")));
            else setCoins(res.coins);
            setIsLoading(false)
        }

        run();
    }, [])

    useEffect(()=>{
        setBalance(coins);
    }, [coins])

    const visitLink = async(id) =>{

        setIsLoading(true);

        await finishSpecialTask(tasks[id]._id);

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
        window.location.href = tasks[id].link;
        setTimeout(() => {
            setDoneList([...doneList, tasks[id]._id]);
            setCoins(pre=>{
                return pre + tasks[id].bonus;
            })
        }, 2000);
        setIsLoading(false);
    }

    return (
        isLoading ? <Loader isFirst={false}/> :
        <div className="special-task-list">
            {
                tasks.map((task, id)=>{
                    let status = 0;
                    if(doneList.includes(task._id)) status = 1;
                    return <SpecialTaskCard title={task.title} id={id} bonus={task.bonus} status={status} visit={visitLink} />
                })
            }
        </div>
    )
}

export default SpecialTaskList