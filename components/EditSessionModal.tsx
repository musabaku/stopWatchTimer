import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { AppColors } from '@/constants/Colors';
import { Session } from '@/context/TimerContext';
import { MaterialIcons } from '@expo/vector-icons';

// Define a clearer type for the category objects
type Category = {
  name: string;
  icon: string;
};

interface EditSessionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (newCategory: string, newDescription: string) => void;
  session: Session;
  categories: Category[];
}

export default function EditSessionModal({
  visible,
  onClose,
  onSave,
  session,
  categories,
}: EditSessionModalProps) {
  const [editedCategory, setEditedCategory] = useState(session.selectedCategory);
  const [editedDescription, setEditedDescription] = useState(session.description || '');

  useEffect(() => {
    if (session) {
      setEditedCategory(session.selectedCategory);
      setEditedDescription(session.description || '');
    }
  }, [session]);

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

// Add the final StyleSheet at the bottom of the file
const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: AppColors.primary,
  },
  resetButton: {
    backgroundColor: AppColors.surface,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: AppColors.surface,
    padding: 22,
    borderRadius: 14,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: AppColors.text,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 20,
  },
  categoryButtonText: {
    fontWeight: '500',
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
    width: '100%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});