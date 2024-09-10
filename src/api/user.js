
import config from '../config'

export const login = async (name) =>{
    
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `user/${name}`;


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const tap = async (data) =>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `user/last_tap`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const logOut = async(data) =>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `user/logout`;


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const getReferalInfo = async() =>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;

    let url = config.main_url + "referal";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const setBotWorking = async(isBotWorking)=>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `user/botWorking`;


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({isBotWorking})
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}