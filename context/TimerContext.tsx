import { createContext } from "react";
type TimerContextType ={
    seconds: number;
    isRunning: boolean;
    startTimer : ()=>void;
    stopTimer : ()=>void;
    resetTimer : ()=>void;
    // formatTime : (sec:number)=>TimeObject;
    categories: string[];
    selectedCategory: string;
    setSelectedCategory:(cat:string)=>void;
    description : string;
    setDescription:(desc:string)=>void;
    confirmTagAndStart:()=>void;
    descriptionActive: boolean;
}
type TimeObject = {
    hour:number;
    minute:number;
    second:number
}
const defaultValue = {
    seconds:0,
    isRunning:false,
    startTimer:()=>{},
    stopTimer:()=>{},
    resetTimer:()=>{},
    // formatTime:()=>({hour:0,minute:0,second:0}),
    selectedCategory:"",
    setSelectedCategory:()=>{},
    categories:[],
    description:"",
    setDescription:()=>{},
    confirmTagAndStart:()=>{},
    descriptionActive:false
}
export const TimerContext = createContext<TimerContextType>(defaultValue)