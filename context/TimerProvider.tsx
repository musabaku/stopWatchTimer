import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext"
import { addSession } from "@/database";

const TimerProvider = ({children}) =>{

const category1 = [
  "🛡️ Protected",
  "⚠️ At Risk",
  "🛠️ Support",
  "📌 Fixed",
  "🚪 Out",
  "😴 Rest",
  "🔍 Curiosity",
  "🎉 Pleasure",
  "🌊 Sanity",
  "🌀 Insanity"
];




    const [seconds,setSeconds] = useState(0);
    const [isRunning,setisRunning] = useState(false);
    const [categories,setCategory] = useState(category1);
    const [selectedCategory,setSelectedCategory] = useState("");
    const [description,setDescription] = useState("");
    const [descriptionActive,setdescriptionActive] = useState(false);

    function startTimer(){
        setdescriptionActive(true)
    }
    function cancelStart(){
        setdescriptionActive(false)
    }
    function confirmTagAndStart(){
        if(selectedCategory.trim()!==''){
         setisRunning(true)
         setdescriptionActive(false)
        }
        else{
            alert('Please select a category')
        }
    }
    function stopTimer(){
        setisRunning(false)
        addSession(selectedCategory,description,seconds)
        setDescription('')
        setSelectedCategory('')
        setSeconds(0)
    }
    function resetTimer(){
        setisRunning(false)
        setDescription('')
        setSelectedCategory('')
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
    },[isRunning])
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
        cancelStart
    }
    return(
        <TimerContext.Provider value={obj}>
            {children}
        </TimerContext.Provider>
    )
}
export default TimerProvider;