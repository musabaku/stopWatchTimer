import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View,StyleSheet } from "react-native";
import { useContext } from "react";
import { Button } from "react-native";
import { TimerContext } from "@/context/TimerContext";
import formatTime from "@/utils/formatTime"
export default function HomeScreen() {
  const {seconds,isRunning,startTimer,stopTimer,resetTimer,selectedCategory,setSelectedCategory,categories,description,setDescription,confirmTagAndStart,descriptionActive} = useContext(TimerContext)
  // console.log(se)
  const formatted = formatTime(seconds)

  return (
  <View style={styles.container}>
<View style={styles.buttonContainer}>

  {isRunning?(
    <TouchableOpacity
    onPress={stopTimer}
    style={styles.button}>
      <Text style={styles.buttonText}>Stop</Text>
    </TouchableOpacity>
  )
    :(
     <TouchableOpacity
    onPress={startTimer}
    style={styles.button}
    >
      <Text style={styles.buttonText}>Start</Text>
    </TouchableOpacity>
    )}
</View>

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
     
 <TouchableOpacity
    onPress={confirmTagAndStart}
    style={styles.button}
    >
      <Text style={styles.buttonText}>Confirm & Start</Text>
    </TouchableOpacity>
              </View>

    </Modal>
     <TouchableOpacity
    onPress={resetTimer}
    style={styles.button}
    >
      <Text style={styles.buttonText}>Reset</Text>
    </TouchableOpacity>
  <Text style={styles.timerText}>{formatted}</Text>
  <Text>selectedCategory</Text>
  <Text>{selectedCategory}</Text>
  <Text>description</Text>
  <Text>{description}</Text>
  </View>
  
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Vertically center items
    alignItems: 'center',    // Horizontally center items
    backgroundColor: '#fff',
  },
  timerText: {
  fontSize: 72,
  fontWeight: '200', // A thinner, modern font weight
  marginBottom: 40,
},
buttonContainer: {
  flexDirection: 'row',
  gap: 20,
},
button: {
  backgroundColor: '#007AFF',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 25,
},
buttonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: '600',
},

});