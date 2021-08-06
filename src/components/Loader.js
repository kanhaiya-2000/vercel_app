import React from "react";
import LoopIcon from '@material-ui/icons/Loop';

const Loader = ({msg})=>{

    return (
        <div className="loop">
        <LoopIcon className="loopicon"/>
            <div className="loadertext">{msg||"Loading..."}</div>
        </div>
    )
}

export default Loader;