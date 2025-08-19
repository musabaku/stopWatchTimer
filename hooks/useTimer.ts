import { useEffect, useState } from "react";

export function useTimer(){
    const [seconds,setSeconds] =  useState(0);
useEffect(()=>{
function timer(){
    setSeconds(seconds=>seconds+1);
}
setInterval(timer,1000)
},[])

return {
seconds
}

}