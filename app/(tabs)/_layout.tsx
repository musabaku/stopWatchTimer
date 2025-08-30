import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Timer",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>⏱️</Text>, // Timer emoji
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📜</Text>, // History emoji
        }}
      />
    </Tabs>
  );
}
