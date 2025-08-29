import { deleteSession, getAllSessions } from "@/database";
import formatTime from "@/utils/formatTime";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity ,Button} from "react-native";
import { AppColors } from "@/constants/Colors";
export default function History() {
  const [session, setSession] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const data = await getAllSessions();
        setSession(data);
      }
      loadData();
    }, [])
  );
  // console.log({session})

  const summary = useMemo(() => {
    const tagDuration: { [key: string]: number } = {};
    session.forEach((s) => {
      const { selectedCategory, duration } = s;
      if (tagDuration[selectedCategory]) {
        tagDuration[selectedCategory] += duration;
      } else {
        tagDuration[selectedCategory] = duration;
      }
    });
    return tagDuration;
  }, [session]);

  const handleDelete=(id:number)=>{
    deleteSession(id);
    setSession((s)=>
    s.filter((s1)=>s1.id!==id))
  }
return (
    <View style={styles.container}>
      <FlatList
        data={session}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Summary by Category</Text>
            {Object.entries(summary).map(([category, duration]) => (
              <View key={category} style={styles.summaryItem}>
                <Text style={styles.summaryCategory}>{category}:</Text>
                <Text style={styles.summaryDuration}>{formatTime(duration)}</Text>
              </View>
            ))}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
       
              <Text style={styles.itemCategory}>{item.selectedCategory}</Text>
              {item.description ? (
                <Text style={styles.itemDescription}>{item.description}</Text>
              ) : null}
              <Text style={styles.itemDuration}>{formatTime(item.duration)}</Text>
            </View>

            <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.stopButton]}>
              <Text style={[styles.buttonText, { color: AppColors.text }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );

}

const styles = StyleSheet.create({
    stopButton: {
    backgroundColor: AppColors.danger,
  },
    button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: AppColors.text,
    fontSize: 18,
    fontWeight: "600",
  },
  // Main Container
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  // Summary Header
  summaryContainer: {
    padding: 16,
    backgroundColor: AppColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: AppColors.text,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryCategory: {
    fontWeight: '500',
    color: AppColors.text,
  },
  summaryDuration: {
    color: AppColors.textSecondary,
  },
  // List Item Card
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.text,
  },
  itemDescription: {
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  itemDuration: {
    marginTop: 4,
    color: AppColors.gold,
  },
  // Separator between list items
  separator: {
    height: 8,
    backgroundColor: AppColors.background,
  },
});