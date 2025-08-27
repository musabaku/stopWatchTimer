import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext"
import { addSession } from "@/database";

const TimerProvider = ({children}) =>{
    const [seconds,setSeconds] = useState(0);
    const [isRunning,setisRunning] = useState(true);
    const [tag,setTag] = useState("");
    const [tagActive,settagActive] = useState(false);


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