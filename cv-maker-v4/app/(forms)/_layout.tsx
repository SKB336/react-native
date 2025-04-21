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
      {/* <Stack.Screen name='(tabs)' options={{ headerShown: false }} /> */}
    </Stack>
  )
}

export default FormsLayout