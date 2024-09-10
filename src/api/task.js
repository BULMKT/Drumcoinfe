
import config from '../config'

export const getInitInfoFL = async (data) =>{

    let info = {taskList:[], user:{coins: 0, league: 0, currentLeagTaskId:0}}
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `task/leag`;

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then((rsp)=>{
        return rsp.json()
    })

    info.taskList = response.allTasks;

    url = config.main_url + `user/`;
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then((rsp)=>{
        return rsp.json()
    })

    info.user.league = response.info.league;
    info.user.coins = response.info.coins;
    info.user.currentLeagTaskId = response.info.currentLeagTaskId;

    return info;
}

export const getInitInfoFR = async (data) =>{
    let info = {taskList:[], user:{coins: 0, invNumber: 0, currentRefTaskId:0}}
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `task/ref`;

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then((rsp)=>{
        return rsp.json()
    })

    info.taskList = response.allTasks;

    url = config.main_url + `user/`;
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then((rsp)=>{
        return rsp.json()
    })

    info.user.invNumber = response.info.numberOfRef;
    info.user.coins = response.info.coins;
    info.user.currentRefTaskId = response.info.currentRefTaskId;

    return info;
}

export const getInitInfoFS = async (data) =>{
    let info = {taskList:[], doneList:[], coins:0}
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `task/special`;

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then((rsp)=>{
        return rsp.json()
    })

    info.taskList = response.allTasks;

    url = config.main_url + `user/`;
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then((rsp)=>{
        return rsp.json()
    })

    info.doneList = response.info.doneTasks;
    info.coins = response.info.coins;

    return info;
}

export const finishLeagTask = async (lvl) =>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `task/leag_task`;


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({lvl})
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const finishSpecialTask = async(id) =>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `task/${id}`;


    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const finishRefTask = async(nextId) =>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `task/ref_task`;


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({nextId})
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}