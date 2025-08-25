import { Text } from "react-native";
import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";
export default function HomeScreen() {
  const se = useContext(TimerContext)
  // const {seconds,isRunning,startTimer,stopTimer,resetTimer} = useContext(TimerContext)
  console.log(se)
  return (
  <>
  <Text>Musab</Text>
  </>
  )
  
}

