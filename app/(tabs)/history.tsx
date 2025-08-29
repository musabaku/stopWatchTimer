import { deleteSession, getAllSessions } from "@/database";
import formatTime from "@/utils/formatTime";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity ,Button} from "react-native";

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
    <>
    <FlatList
        data={session}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <Text>Summary By Category</Text>
            <Text>*************</Text>
        {Object.entries(summary).map(([key, value], index) => (
          <Text key={index}>
            {key}: {formatTime(value)}
          </Text>
        ))} 
            <Text>*************</Text>
         <Text>Sessions Info</Text>
            <Text>*************</Text>
        </View>
        
        }

        renderItem={({ item }) => (
          <View>
            <View>

            <Text>Category: {item.selectedCategory}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Duration: {formatTime(item.duration)}</Text>
            </View>
          <TouchableOpacity
          onPress={()=>handleDelete(item.id)}
            style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  marginRight: 8,
                  maxHeight:50,
                  borderRadius: 20,
                  backgroundColor: "#007AFF",
                }}
          >

            <Text>Delete</Text>
          </TouchableOpacity>
            <Text>--</Text>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tag: {
    fontWeight: "bold",
  },
});
