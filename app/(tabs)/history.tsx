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
  const tagDuration = {}
  session.forEach(s=>{
  const {tag,duration} = s
    if (tagDuration[tag]){
      tagDuration[tag]+=duration;
    }
    else{
      tagDuration[tag] = duration
    }
  })
   },[session])

  return (
    <>
    <FlatList 
    data={session}
    keyExtractor={(item)=>item.id.toString()}
    renderItem={({item})=>(
      <View>
        <Text>Tag: {item.tag}</Text>
        <Text>Duration: {formatTime(item.duration)}</Text>
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

