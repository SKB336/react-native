import { View, Text, StyleSheet, Image, Pressable, PressableProps } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}: any) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      {/* Ternary operator: If (focused) return 'font-psemibold' else 'font-pregular' */}
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const MainTabIcon = ({icon, color, name, focused}: any) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-8 h-8'
      />
    </View>
  )
}

const CustomTabBarButton = ({ children, onPress }: PressableProps & { children: React.ReactNode }) => {
  return <Pressable
    className='top-[-30] justify-center items-center'
    onPress={onPress}
  >
    <View
      className='w-[70] h-[70] rounded-[35] bg-secondary'
    >
      {children}
    </View>
  </Pressable>
}

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          // elevation: 0,
          backgroundColor: '#ffffff',
          borderTopColor: 'transparent',
          borderRadius: 15,
          height: 90,
          ...styles.shadow
        }
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home', 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.menu}
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }} 
      />
      
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MainTabIcon
              icon={icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          ), 
          tabBarButton: (props) => { 
            return <CustomTabBarButton {...props} />
          }
        }}
      />

      <Tabs.Screen 
        name="pdfs" 
        options={{ 
          title: 'PDFs', 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.file}
              color={color}
              name="PDFs"
              focused={focused}
            />
          )
        }} 
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
})

export default TabsLayout
