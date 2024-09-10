import React from "react";

import "./index.css"

const Loader = ({isFirst}) =>{
    return (
        <div className="loader-div" style={isFirst?{backgroundColor:"black"}:{}}>
            <span class="loader"></span>
        </div>
    )
}

export default Loader