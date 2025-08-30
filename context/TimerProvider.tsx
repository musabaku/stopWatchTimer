import React, { useEffect, useState } from "react";
import {TimerContext} from "./TimerContext"
import { addSession, updateSession } from "@/database";
import { Session,Category } from "./TimerContext";

const TimerProvider = ({children}) =>{

// const category1 = [
//   "🛡️ Protected",
//   "⚠️ At Risk",
//   "🛠️ Support",
//   "📌 Fixed",
//   "🚪 Out",
//   "😴 Rest",
//   "🔍 Curiosity",
//   "🎉 Pleasure",
//   "🌊 Sanity",
//   "🌀 Insanity"
// ];
 const CATEGORIES = [
  { name: 'Deep Work', icon: 'security' },
  { name: 'Volatile', icon: 'warning' },
  { name: 'Maintenance', icon: 'build' },
  { name: 'Scheduled', icon: 'schedule' },
  { name: 'Out', icon: 'directions-run' },
  { name: 'Rest', icon: 'hotel' },
  { name: 'Inquiry', icon: 'search' },
  { name: 'Pleasure', icon: 'sentiment-very-satisfied' },
  { name: 'Sanity', icon: 'self-improvement' },
  { name: 'Insanity', icon: 'help-outline' },
];




    const [seconds,setSeconds] = useState(0);
    const [isRunning,setisRunning] = useState(false);
    const [categories,setCategory] = useState(CATEGORIES);
    const [selectedCategory,setSelectedCategory] = useState<Category|null>(null);
    const [description,setDescription] = useState("");
    const [descriptionActive,setdescriptionActive] = useState(false);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);
function openEditModal(session:Session){
    setSessionToEdit(session)
    setIsEditModalVisible(true)
} 
function closeEditModal(){
    setSessionToEdit(null)
    setIsEditModalVisible(false)
} 
function handleSessionEdit(newCategory:string,newDescription:string){
    if(sessionToEdit){
        updateSession(sessionToEdit.id,newCategory,newDescription)
        closeEditModal()
    }
    setSessionToEdit(null)
    setIsEditModalVisible(false)
} 

    function startTimer(){
        setdescriptionActive(true)
    }
    function cancelStart(){
        setdescriptionActive(false)
    }
    function confirmTagAndStart(){
        if(selectedCategory &&selectedCategory.name.trim()!==''){
         setisRunning(true)
         setdescriptionActive(false)
        }
        else{
            alert('Please select a category')
        }
    }
    function stopTimer(){
           if (selectedCategory) {
      addSession(selectedCategory.name, description, seconds);
    }
        setisRunning(false)
        setDescription('')
        setSelectedCategory(null)
        setSeconds(0)
    }
    function resetTimer(){
        setisRunning(false)
        setDescription('')
        setSelectedCategory(null)
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
        cancelStart,
        setIsEditModalVisible,
        isEditModalVisible,
        openEditModal,
        sessionToEdit,
        closeEditModal,
        handleSessionEdit
    }
    return(
        <TimerContext.Provider value={obj}>
            {children}
        </TimerContext.Provider>
    )
}
export default TimerProvider;