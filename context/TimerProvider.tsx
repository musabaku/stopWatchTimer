import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext"
import { addSession } from "@/database";

const TimerProvider = ({children}) =>{
    const [seconds,setSeconds] = useState(0);
    const [isRunning,setisRunning] = useState(true);
    const [tag,setTag] = useState("");
    const [tagActive,settagActive] = useState(false);

    function formatTime(sec){
        let hour = Math.floor(sec/3600);
        let minute = Math.floor((sec%3600)/60);
        let second = sec%60;
        const obj = {hour,minute,second}
        return obj
    }
    function startTimer(){
        settagActive(true)
    }
    function confirmTagAndStart(){
        if(tag.trim()!==''){
         setisRunning(true)
         settagActive(false)
        }
    }
    function stopTimer(){
        setisRunning(false)
        addSession(tag,seconds)
        setTag('')
        setSeconds(0)
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
        // if(tagActive){
        //     const userTag = userinput;
        //     setTag(userTag)
        // }
    },[isRunning,tagActive])
    const obj ={
        seconds,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
        formatTime,
        tag,
        setTag,
        confirmTagAndStart,
        tagActive,
    }
    return(
        <TimerContext.Provider value={obj}>
            {children}
        </TimerContext.Provider>
    )
}
export default TimerProvider;