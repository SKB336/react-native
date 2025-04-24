import React from 'react'
import { Stack } from 'expo-router'
import COLORS from '~/constants/colors'

const FormsLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name='personal' 
        options={{ 
          headerShown: true, 
          title: 'Personal Information', 
          headerStyle: {
            backgroundColor: COLORS.primary,                
          },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='education' 
        options={{ 
          headerShown: true, 
          title: 'Education', 
          headerStyle: {
            backgroundColor: COLORS.primary,                
          },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='experience' 
        options={{ 
          headerShown: true, 
          title: 'Experience', 
          headerStyle: {
            backgroundColor: COLORS.primary,                
          },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='skill' 
        options={{ 
          headerShown: true, 
          title: 'Skills', 
          headerStyle: {
            backgroundColor: COLORS.primary,                
          },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='objective' 
        options={{ 
          headerShown: true, 
          title: 'Objective', 
          headerStyle: {
            backgroundColor: COLORS.primary,                
          },
          headerTintColor: "#FFFFFF"
        }} 
      />

      <Stack.Screen 
        name='reference' 
        options={{ 
          headerShown: true, 
          title: 'Reference', 
          headerStyle: {
            backgroundColor: COLORS.primary,                
          },
          headerTintColor: "#FFFFFF"
        }} 
      />
    </Stack>
  )
}

export default FormsLayout