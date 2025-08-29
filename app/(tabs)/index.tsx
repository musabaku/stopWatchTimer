import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useContext } from "react";
import { Button } from "react-native";
import { TimerContext } from "@/context/TimerContext";
import formatTime from "@/utils/formatTime";
export default function HomeScreen() {
  const {
    seconds,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    selectedCategory,
    setSelectedCategory,
    categories,
    description,
    setDescription,
    confirmTagAndStart,
    descriptionActive,
    cancelStart,
  } = useContext(TimerContext);
  // console.log(se)
  const formatted = formatTime(seconds);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {isRunning ? (
          <TouchableOpacity onPress={stopTimer} style={styles.button}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startTimer} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={descriptionActive}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelStart}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <ScrollView horizontal style={{ height: 1 }}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(cat)}
                style={[
                    styles.categoryButton,
                    { backgroundColor: selectedCategory === cat ? '#007AFF' : '#EFEFF4' }
                  ]}
              >
                <Text
                  style={{
                    color: selectedCategory === cat ? "white" : "black",
                    fontWeight: "bold",
                  }}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TextInput onChangeText={setDescription} value={description} />

         <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelStart}>
                <Text style={[styles.buttonText, {color: '#007AFF'}]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.startButton]} onPress={confirmTagAndStart}>
                <Text style={styles.buttonText}>Confirm & Start</Text>
              </TouchableOpacity>
            </View>
        </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={resetTimer} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <Text style={styles.timerText}>{formatted}</Text>
      <Text>selectedCategory</Text>
      <Text>{selectedCategory}</Text>
      <Text>description</Text>
      <Text>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Vertically center items
    alignItems: "center", // Horizontally center items
    backgroundColor: "#fff",
  },
  timerText: {
    fontSize: 72,
    fontWeight: "200", // A thinner, modern font weight
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  startButton: {
    backgroundColor: '#34C759',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  resetButton: {
    backgroundColor: '#EFEFF4',
  },
  resetButtonText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  input: {
    height: 44,
    borderColor: '#EFEFF4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#EFEFF4',
  }

});
