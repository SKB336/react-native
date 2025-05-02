import { View, Text, StyleSheet, Image, Pressable, PressableProps } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { icons } from '../../constants'
import COLORS from '../../constants/colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabIcon = ({icon, color, name, focused}: any) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={focused ? COLORS.secondary : color}
        className='w-6 h-6'
      />
      {/* Ternary operator: If (focused) return 'font-psemibold' else 'font-pregular' */}
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: focused ? COLORS.secondary : color}}>
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
        tintColor={focused ? '#ffffff' : '#ffffff'}
        className='w-8 h-8'
      />
    </View>
  )
}

const CustomTabBarButton = ({ children, onPress }: PressableProps & { children: React.ReactNode }) => {
  return <Pressable
    className='top-[-35] justify-center items-center'
    onPress={onPress}
  >
    <View
      className='w-[65] h-[65] rounded-[35] bg-primary'
    >
      {children}
    </View>
  </Pressable>
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          marginHorizontal: 20,
          // elevation: 0,
          backgroundColor: '#ffffff',
          borderTopColor: 'transparent',
          borderRadius: 15,
          height: 75,
          ...styles.shadow,
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
          ),
          tabBarIconStyle: {
            width: '100%',
            height: '100%'
          },
        }} 
      />
      
      <Tabs.Screen
        name="create"
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: "#FFFFFF",
          tabBarStyle: {
            display: 'none'
          },
          tabBarIcon: ({ color, focused }) => (
            <MainTabIcon
              icon={icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          ),
          tabBarIconStyle: {
            width: '100%',
            height: '100%'
          },
          tabBarButton: (props) => { 
            return <CustomTabBarButton {...props} />
          },
          tabBarLabel: () => null,
          headerLeft: ({  }) => (
            <Pressable 
              onPress={() => {
                router.push({pathname: '/(tabs)/home', params: {}})
              }} 
              className="pl-6 w-[50]">
              <Image
                source={icons.back} // Your custom icon here
                className="w-5 h-5 tint-white"
                tintColor="#FFFFFF"
              />
            </Pressable>
          ),
          headerShown: true
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
          ),
          tabBarIconStyle: {
            width: '100%',
            height: '100%',
          },
        }} 
      />
    </Tabs>
    </>
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
