import { Text } from "react-native";
import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";
export default function HomeScreen() {
  const seconds = useContext(TimerContext)
  return (
  <>
  <Text>{seconds}</Text>
  <Text>Musab</Text>
  </>
  )
  ;
}

