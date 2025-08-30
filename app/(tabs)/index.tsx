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
import {formatTime} from "@/utils/formatTime";
import { MaterialIcons } from '@expo/vector-icons'; 
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
          <TouchableOpacity
            onPress={stopTimer}
            style={[styles.button, styles.stopButton]}
          >
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={startTimer}
            style={[styles.button, styles.startButton]}
          >
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
                  key={cat.name}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor:
                        AppColors.gold,
                    },
                  ]}
                >
                  
             
                  <MaterialIcons 
                    name={cat.icon as any} 
                    size={16} 
                    color={selectedCategory === cat ? AppColors.success : "black"} 
                  />
                  <Text
                    style={{
                      color: selectedCategory === cat ? AppColors.success : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {cat.name}
                  </Text>
              
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              onChangeText={setDescription}
              value={description}
              style={styles.input}
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={cancelStart}
                style={[styles.button, styles.resetButton]}
              >
                <Text style={[styles.buttonText, { color: AppColors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.startButton]}
                onPress={confirmTagAndStart}
              >
                <Text
                  style={[styles.buttonText, { color: AppColors.background }]}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={resetTimer}
        style={[styles.button, styles.resetButton]}
      >
        <Text style={[styles.buttonText, { color: AppColors.text }]}>
          Reset
        </Text>
      </TouchableOpacity>
      <Text style={styles.timerText}>{formatted}</Text>
      <View style={styles.debugContainer}>
        <Text style={styles.debugLabel}>Selected Category:</Text>
        <Text style={styles.debugValue}>{selectedCategory?.name || "None"}</Text>

        <Text style={styles.debugLabel}>Description:</Text>
        <Text style={styles.debugValue}>{description || "None"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  debugContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: AppColors.gold ,
    borderRadius: 10,
    width: "90%",
  },
  debugLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 5,
    color: AppColors.surface,
  },
  debugValue: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
  },
  // Main Layout
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: AppColors.background,
    paddingVertical: 80,
    paddingHorizontal: 20,
  },

  // Current Session Display
  currentSessionContainer: {
    alignItems: "center",
    minHeight: 60, // Reserve space even when empty
  },
  currentCategory: {
    color: AppColors.gold,
    fontSize: 24,
    fontWeight: "600",
  },
  currentDescription: {
    color: AppColors.textSecondary,
    fontSize: 16,
    marginTop: 4,
  },

  // Timer Display
  timerContainer: {
    borderWidth: 2,
    borderColor: AppColors.surface,
    width: 280,
    height: 280,
    borderRadius: 140, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 64,
    fontWeight: "200",
    color: AppColors.text,
  },

  // Buttons
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: AppColors.success,
  },
  resetButton: {
    backgroundColor: AppColors.danger,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: AppColors.surface,
    padding: 22,
    borderRadius: 14,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: AppColors.text,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 20,
  },
  categoryButtonText: {
    fontWeight: "500",
  },
  input: {
    height: 44,
    backgroundColor: AppColors.background,
    borderColor: AppColors.textSecondary,
    color: AppColors.text,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
