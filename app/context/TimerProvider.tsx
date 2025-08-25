import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext"
const TimerProvider = ({children}) =>{
    const [seconds,setSeconds] = useState(0);
    const [isRunning,setisRunning] = useState(true);

    function time(sec){
        let hour = Math.floor(sec/3600);
        let min = Math.floor((sec%3600)/60);
        let s = sec%60;
        const obj = {hour,min,s}
        return obj
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
    const obj ={
        seconds,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer
    }
    return(
        <TimerContext.Provider value={obj}>
            {children}
        </TimerContext.Provider>
    )
}
export default TimerProvider;