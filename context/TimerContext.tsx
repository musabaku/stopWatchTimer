import { createContext, Dispatch, SetStateAction  } from "react";
type TimerContextType ={
    seconds: number;
    isRunning: boolean;
    startTimer : ()=>void;
    stopTimer : ()=>void;
    resetTimer : ()=>void;
    // formatTime : (sec:number)=>TimeObject;
    categories: string[];
    selectedCategory: string;
    setSelectedCategory:Dispatch<SetStateAction<string>>;
    description : string;
    setDescription:Dispatch<SetStateAction<string>>;
    confirmTagAndStart:()=>void;
    cancelStart:()=>void;
    descriptionActive: boolean;
    isEditModalVisible: boolean;
    sessionToEdit: Session|null;
    openEditModal:(session:Session)=>void;
    closeEditModal:()=>void;
    setIsEditModalVisible:Dispatch<SetStateAction<boolean>>;
    handleSessionEdit:(selectedCategory:string,description:string)=>void;

}
export type Session = {
  id: number;
  selectedCategory: string;
  description?: string;
  duration: number; // in seconds
  end_time: string;
};
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
    cancelStart:()=>{},
    descriptionActive:false,
    isEditModalVisible:false,
    setIsEditModalVisible:()=>{},
    sessionToEdit: null,
    openEditModal:()=>{},
    closeEditModal:()=>{},
    handleSessionEdit:()=>{}
}
export const TimerContext = createContext<TimerContextType>(defaultValue)