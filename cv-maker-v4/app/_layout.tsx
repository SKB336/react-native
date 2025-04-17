import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './(tabs)/_layout'

const RootLayout = () => {
  return (
    // <Stack>
    //   <Stack.Screen name='welcome' options={{ headerShown: false }} />
    //   {/* <Stack.Screen name='home' options={{ headerShown: false }} /> */}
    //   <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    // </Stack>
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )
}

export default RootLayout