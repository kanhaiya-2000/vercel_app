import React from "react";
import LoopIcon from '@material-ui/icons/Loop';

const Loader = ({msg})=>{

    return (
        <div>
        <LoopIcon className="loopicon"/>
            {msg||"Loading..."}
        </div>
    )
}

export default Loader;