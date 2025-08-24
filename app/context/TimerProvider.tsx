import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext"
const TimerProvider = ({children}) =>{
    const [seconds,setSeconds] = useState(0);
    const [isRunning,setisRunning] = useState(false);

    function time(sec){
        let hour = sec/3600;
        let min = hour/60;
        let s = min%60;

    }
    function startTimer(){
        setisRunning(true)
    }
    function stopTimer(){
        setisRunning(false)
    }
    function resetTimer(){
        setisRunning(false)
        setSeconds(0)
    }
    function timer(){
        setSeconds(seconds=>seconds+1)
    }
    useEffect(()=>{
        if(isRunning){
      const intervalId =  setInterval(timer,1000);
      return ()=>clearInterval(intervalId)
        }
    },[isRunning])
    return(
        <TimerContext.Provider value={seconds}>
            {children}
        </TimerContext.Provider>
    )
}
export default TimerProvider;