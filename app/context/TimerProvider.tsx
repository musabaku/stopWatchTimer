import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext.js"
const TimerProvider = ({children}) =>{
    const [seconds,setSeconds] = useState(0)
    function timer(){
        setSeconds(seconds=>seconds+1)
    }
    useEffect(()=>{
      const intervalId =  setInterval(timer,1000);
      return ()=>clearInterval(intervalId)
    },[])
    return(
        <TimerContext.Provider value={seconds}>
            {children}
        </TimerContext.Provider>
    )
}
export default TimerProvider;