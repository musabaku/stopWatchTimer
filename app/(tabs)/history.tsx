import { getAllSessions } from '@/database';
import formatTime from '@/utils/formatTime';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, View,Text ,StyleSheet} from 'react-native';

export default function History() {
  const [session,setSession] = useState([])
  
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

  const summary=useMemo(()=>{
  const tagDuration: { [key: string]: number } = {};
  session.forEach(s=>{
  const {selectedCategory,duration} = s
    if (tagDuration[selectedCategory]){
      tagDuration[selectedCategory]+=duration;
    }
    else{
      tagDuration[selectedCategory] = duration
    }
  })
  return tagDuration
   },[session])

  return (
    <>
    <FlatList 
    data={session}
    keyExtractor={(item)=>item.id.toString()}
    renderItem={({item})=>(
      <View>
        <Text>Category: {item.selectedCategory}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Duration: {formatTime(item.duration)}</Text>
        <Text>***********</Text>
      </View>
    ) }

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
    borderBottomColor: '#ccc',
  },
  tag: {
    fontWeight: 'bold',
  },
});

