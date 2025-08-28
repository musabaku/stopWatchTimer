import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { Button } from "react-native";
import { TimerContext } from "@/context/TimerContext";
import formatTime from "@/utils/formatTime"
export default function HomeScreen() {
  const {seconds,isRunning,startTimer,stopTimer,resetTimer,selectedCategory,setSelectedCategory,categories,description,setDescription,confirmTagAndStart,descriptionActive} = useContext(TimerContext)
  // console.log(se)
  const formatted = formatTime(seconds)

  return (
  <View>

  {isRunning?(<Button title="Stop" onPress={stopTimer}/>):(<Button title="Start" onPress={startTimer}/>)}
    <Modal visible={descriptionActive}>
              <View style={{ flex: 3, padding: 16 }}>

      <ScrollView horizontal style={{height:1}}>
      {categories.map((cat,index)=>(
        
        <TouchableOpacity
        key={index}
        onPress={()=>setSelectedCategory(cat)}
        style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  marginRight: 8,
                  maxHeight:50,
                  borderRadius: 20,
                  backgroundColor: selectedCategory === cat ? "#007AFF" : "#E0E0E0",
                }}
        >
        <Text
                style={{
                  color: selectedCategory === cat ? 'white' : 'black',
                  fontWeight: 'bold',
                }}>
                {cat}
              </Text>

        </TouchableOpacity>
      ))}
      </ScrollView>

    <TextInput onChangeText ={setDescription} value={description}/>
      <Button title="Confirm & Start" onPress={confirmTagAndStart}/>

              </View>

    </Modal>
  <Button title="Reset" onPress={resetTimer}/>
  <Text>{formatted}</Text>
  <Text>selectedCategory</Text>
  <Text>{selectedCategory}</Text>
  <Text>description</Text>
  <Text>{description}</Text>
  </View>
  
  )
  
}

