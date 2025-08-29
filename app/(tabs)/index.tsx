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

import { AppColors } from "@/constants/Colors";
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
            <View style={styles.categoriesContainer}>
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor:
                        selectedCategory === cat ? "#007AFF" : "#EFEFF4",
                    },
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
            </View>

            <TextInput onChangeText={setDescription} value={description}   style={styles.input}
/>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={cancelStart}
              >
                <Text style={[styles.buttonText, { color: AppColors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.startButton]}
                onPress={confirmTagAndStart}
              >
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
   <View style={styles.debugContainer}>
  <Text style={styles.debugLabel}>Selected Category:</Text>
  <Text style={styles.debugValue}>{selectedCategory || "None"}</Text>

  <Text style={styles.debugLabel}>Description:</Text>
  <Text style={styles.debugValue}>{description || "None"}</Text>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Vertically center items
    alignItems: "center", // Horizontally center items
    backgroundColor: AppColors.background,
  },
  categoriesContainer: {
    flexDirection: "row", // Arrange items horizontally
    flexWrap: "wrap", // Allow items to wrap
    justifyContent: "center", // Center the items
    marginBottom: 16,
    padding:10
  },
  timerText: {
    fontSize: 72,
    fontWeight: "200", // A thinner, modern font weight
    color: AppColors.text,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: AppColors.text,
    fontSize: 18,
    fontWeight: "600",
  },
  startButton: {
    backgroundColor: AppColors.primary,

  },
  stopButton: {
    backgroundColor: AppColors.primary,

  },
  resetButton: {
    backgroundColor: AppColors.primary,

  },
  resetButtonText: {
    color: AppColors.text,

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
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
input: {
  height: 44,
  width: "100%",
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 12,
  fontSize: 16,
  color: "#000",
  backgroundColor: "#F9F9F9",
  marginBottom: 20,
},

  modalButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding:10,
    width:'100%',
    marginTop:20,
  },
  cancelButton: {
    backgroundColor: AppColors.primary,

    padding:10
    
  },
  debugContainer: {
  marginTop: 30,
  padding: 15,
  backgroundColor: "#F4F4F6",
  borderRadius: 10,
  width: "90%",
},
debugLabel: {
  fontWeight: "600",
  fontSize: 16,
  marginTop: 5,
  color: "#555",
},
debugValue: {
  fontSize: 16,
  marginBottom: 10,
  color: "#000",
},

});
