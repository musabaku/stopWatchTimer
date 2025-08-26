import { getAllSessions } from '@/database';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';

export default function History() {
  const [session,setSession] = useState([])
  useEffect(()=>{
    async function loadData (){
      const data = await getAllSessions()
      setSession(data)
    }
    loadData()
  },[])
  return (
    <>
    <FlatList 
    data={session}
    renderItem={({item})=>(
      <View>
        <Text>Tag: {item.tag}</Text>
        <Text>Duration: {item.duration}</Text>
      </View>
    ) }

    />
    </>
  );
}
