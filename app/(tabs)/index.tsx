import { Modal, Text, TextInput, View } from "react-native";
import { useContext } from "react";
import { Button } from "react-native";
import { TimerContext } from "@/context/TimerContext";
import formatTime from "@/utils/formatTime"
export default function HomeScreen() {
  const {seconds,isRunning,startTimer,stopTimer,resetTimer,tag,setTag,confirmTagAndStart,tagActive} = useContext(TimerContext)
  // console.log(se)
  const formatted = formatTime(seconds)

  return (
  <View>

  {isRunning?(<Button title="Stop" onPress={stopTimer}/>):(<Button title="Start" onPress={startTimer}/>)}
    <Modal visible={tagActive}>
    <TextInput onChangeText ={setTag} value={tag}/>
      <Button title="Confirm & Start" onPress={confirmTagAndStart}/>
    </Modal>
  <Button title="Reset" onPress={resetTimer}/>
  <Text>{formatted}</Text>
  <Text>{tag}</Text>
  </View>
  
  )
  
}

