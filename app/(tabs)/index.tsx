import { Text } from "react-native";
import { useContext } from "react";
import { Button } from "react-native";
import { TimerContext } from "@/context/TimerContext";
export default function HomeScreen() {
  const {seconds,isRunning,startTimer,stopTimer,resetTimer,formatTime} = useContext(TimerContext)
  // console.log(se)
  const formatted = formatTime(seconds)

  return (
  <>
  {isRunning?(<Button title="Stop" onPress={stopTimer}/>):(<Button title="Start" onPress={startTimer}/>)}

  <Button title="Reset" onPress={resetTimer}/>
  <Text><Text>{formatted.hour}:{formatted.minute}:{formatted.second}</Text></Text>
  </>
  )
  
}

