// components/EditSessionModal.tsx
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { AppColors } from '@/constants/Colors';
import { Session } from '@/context/TimerContext'; // Reuse the Session type
import { MaterialIcons } from '@expo/vector-icons';

interface EditSessionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (newCategory: string, newDescription: string) => void;
  session: Session | null;
  categories: any[]; // Assuming categories are passed as props
}

export default function EditSessionModal({
  visible,
  onClose,
  onSave,
  session,
  categories,
}: EditSessionModalProps) {
    console.log({categories})
    console.log({session})
  const [editedCategory, setEditedCategory] = useState(session?.selectedCategory || '');
  const [editedDescription, setEditedDescription] = useState(session?.description || '');

  const handleSave = () => {
    onSave(editedCategory, editedDescription);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
     <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Session</Text>
          
          <View style={styles.categoriesContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.name} // Use the unique category name for the key
                onPress={() => setEditedCategory(cat.name)}
                style={[
                  styles.categoryButton,
                  { backgroundColor: editedCategory === cat.name ? AppColors.primary : AppColors.background }
                ]}
              >
                <MaterialIcons name={cat.icon as any} size={16} color={editedCategory === cat.name ? AppColors.background : AppColors.text} />
                <Text style={[ styles.categoryButtonText, { color: editedCategory === cat.name ? AppColors.background : AppColors.text } ]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            value={editedDescription}
            onChangeText={setEditedDescription}
            placeholder="Description"
            placeholderTextColor={AppColors.textSecondary}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onClose}>
              <Text style={[styles.buttonText, { color: AppColors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleSave}>
              <Text style={[styles.buttonText, { color: AppColors.background }]}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
