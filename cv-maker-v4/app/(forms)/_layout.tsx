import React from 'react'
import { Stack } from 'expo-router'
import COLORS from '~/constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const FormsLayout = () => {
  return (
    // <SafeAreaView className='flex-1'>
    <Stack>
      <Stack.Screen 
        name='personal' 
        options={{ 
          headerShown: true, 
          title: 'Personal Information', 
          headerStyle: { backgroundColor: COLORS.PRIMARY },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='education' 
        options={{ 
          headerShown: true, 
          title: 'Education', 
          headerStyle: { backgroundColor: COLORS.PRIMARY },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='experience' 
        options={{ 
          headerShown: true, 
          title: 'Experience', 
          headerStyle: { backgroundColor: COLORS.PRIMARY },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='skill' 
        options={{ 
          headerShown: true, 
          title: 'Skills', 
          headerStyle: { backgroundColor: COLORS.PRIMARY },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='objective' 
        options={{ 
          headerShown: true, 
          title: 'Objective', 
          headerStyle: { backgroundColor: COLORS.PRIMARY },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='reference' 
        options={{ 
          headerShown: true, 
          title: 'Reference', 
          headerStyle: { backgroundColor: COLORS.PRIMARY },
          headerTintColor: "#FFFFFF"
        }} 
      />
    </Stack>
    // {/* </SafeAreaView> */}
  )
}

export default FormsLayout