import {Tabs} from "expo-router";

export default function TabsLayout(){

  return(
    <Tabs>


    <Tabs.Screen name="index"
    options={{title:'Timer'}}
  />
    

    <Tabs.Screen

    name="history"
    options={{title:'History'}}
    />
    

    </Tabs>
  )
}