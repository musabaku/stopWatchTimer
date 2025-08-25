import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import TimerProvider from '../context/TimerProvider';
export default function RootLayout() {
 

  return (
    <TimerProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}} />
      </Stack>
    </TimerProvider>
  );
}
