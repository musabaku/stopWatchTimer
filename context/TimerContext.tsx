import { createContext } from "react";
type TimerContextType ={
    seconds: number;
    isRunning: boolean;
    startTimer : ()=>void;
    stopTimer : ()=>void;
    resetTimer : ()=>void;
    formatTime : (sec:number)=>TimeObject;

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
    formatTime:()=>({hour:0,minute:0,second:0}),
}
export const TimerContext = createContext<TimerContextType>(defaultValue)