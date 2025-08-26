import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import TimerProvider from '../context/TimerProvider';
import { initializeDatabase } from '@/database';
import { useEffect } from 'react';
export default function RootLayout() {
 useEffect(()=>{
initializeDatabase()

 },[])
  return (
    <TimerProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}} />
      </Stack>
    </TimerProvider>
  );
}
