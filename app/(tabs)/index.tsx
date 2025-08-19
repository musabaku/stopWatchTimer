import { Text } from "react-native";
import { useTimer } from "@/hooks/useTimer";
export default function HomeScreen() {
  const {seconds} = useTimer();
  return (
   <Text>
    Mak here
    {seconds}
   </Text>
  )
  ;
}

