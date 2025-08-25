import { createContext } from "react";
type TimerContextType ={
    seconds: number;
    isRunning: boolean;
    startTimer : ()=>void;
    stopTimer : ()=>void;
    resetTimer : ()=>void;


}
const defaultValue = {
    seconds:0,
    isRunning:false,
    startTimer:()=>{},
    stopTimer:()=>{},
    resetTimer:()=>{},
}
export const TimerContext = createContext<TimerContextType>(defaultValue)