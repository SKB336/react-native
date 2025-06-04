import { View, Text, Image, Pressable, PressableProps } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { icons } from '../../constants'
import COLORS from '../../constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const TabIcon = ({icon, color, name, focused}: any) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={focused ? COLORS.WHITE : COLORS.WHITE}
        className='w-6 h-6'
      />
      {/* Ternary operator: If (focused) return 'font-psemibold' else 'font-pregular' */}
      <Text 
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} 
        style={{
          color: focused ? COLORS.WHITE : COLORS.WHITE,
          display: focused ? 'flex' : 'none'
        }}
      >
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
    className='top-[-50] justify-center items-center'
    onPress={onPress}
  >
    <View className="w-[80] h-[80] justify-end items-center relative">
      <View className="absolute bottom-[-6] w-[75] h-[40] rounded-b-[40] bg-gray-50 z-[-1]" />
      
      {/* Main Button */}
      <View className="w-[65] h-[65] rounded-[35] bg-primary items-center justify-center">
        {children}
      </View>
    </View>
  </Pressable>
}

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  // Add extra padding for the tab bar height and spacing
  const bottomPadding = Platform.OS === 'android' ? insets.bottom : 25; 

  return (
    <>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: bottomPadding,
          paddingBottom: 0,
          backgroundColor: COLORS.PRIMARY,
          borderTopColor: 'transparent',
          height: 60,
          shadowColor: 'transparent',
        },
        animation: 'shift',
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'ProFile', 
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
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTintColor: "#FFFFFF",
        }} 
      />
      
      <Tabs.Screen
        name="create"
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
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
                source={icons.back}
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
          title: 'Generated PDFs', 
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
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTintColor: "#FFFFFF",
        }} 
      />
    </Tabs>
    </>
  )
}

export default TabsLayout
