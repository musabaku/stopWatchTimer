import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext"
const TimerProvider = ({children}) =>{
    const [seconds,setSeconds] = useState(0);
    const [isRunning,setisRunning] = useState(true);

    function formatTime(sec){
        let hour = Math.floor(sec/3600);
        let minute = Math.floor((sec%3600)/60);
        let second = sec%60;
        const obj = {hour,minute,second}
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
        resetTimer,
        formatTime,
    }
    return(
        <TimerContext.Provider value={obj}>
            {children}
        </TimerContext.Provider>
    )
}
export default TimerProvider;