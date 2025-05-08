import React from 'react'
import { Stack } from 'expo-router'
import COLORS from '~/constants/colors'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(forms)' options={{ header: () => null, headerShown: false }} />
      <Stack.Screen 
        name='templates' 
        options={{ 
          headerShown: true, 
          title: 'Templates', 
          headerStyle: {
            backgroundColor: COLORS.primary,                
          },
          headerTintColor: "#FFFFFF"
        }} 
      />
      <Stack.Screen 
        name='templates2' 
        options={{ 
          headerShown: true, 
          title: 'Templates', 
          headerStyle: {
            backgroundColor: COLORS.primary,                
          },
          headerTintColor: "#FFFFFF"
        }} 
      />
    </Stack>
  )
}

export default RootLayout