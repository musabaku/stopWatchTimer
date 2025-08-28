import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext"
import { addSession } from "@/database";

const TimerProvider = ({children}) =>{

const category1 = [
  "Protected",
  "At Risk",
  "Support",
  "Fixed",
  "Out",
  "Rest",
  "Curiosity",
  "Pleasure",
  "Emotional",
  "Undefined"
];



    const [seconds,setSeconds] = useState(0);
    const [isRunning,setisRunning] = useState(true);
    const [categories,setCategory] = useState(category1);
    const [selectedCategory,setSelectedCategory] = useState("");
    const [description,setDescription] = useState("");
    const [descriptionActive,setdescriptionActive] = useState(false);

    function startTimer(){
        setdescriptionActive(true)
    }
    function confirmTagAndStart(){
        if(description.trim()!==''){
         setisRunning(true)
         setdescriptionActive(false)
        }
    }
    function stopTimer(){
        setisRunning(false)
        addSession(selectedCategory,description,seconds)
        setDescription('')
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
    },[isRunning,descriptionActive])
    const obj ={
        seconds,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
        categories,
        selectedCategory,
        setSelectedCategory,
        description,
        setDescription,
        confirmTagAndStart,
        descriptionActive,
    }
    return(
        <TimerContext.Provider value={obj}>
            {children}
        </TimerContext.Provider>
    )
}
export default TimerProvider;