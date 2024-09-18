import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants'
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';

// * ------------------------------------------------------------------------------
// import { Dimensions, PixelRatio } from 'react-native';
// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
// const widthDP = (widthPercent: string): number => {
//   // Convert string input to decimal number
//   const elemWidth = parseFloat(widthPercent);
//   return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
// };
// const heightDP = (heightPercent: string): number => {
//   // Convert string input to decimal number
//   const elemHeight = parseFloat(heightPercent);
//   return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
// };
// * ------------------------------------------------------------------------------

// Define the shape of the context
// ? This Fixes the type error when importing from JS; 
// ? Then use it like: Function() as interfaceName
interface GlobalContextType {
  isLoading: boolean;
  isLoggedIn: boolean;
  // Add other properties as needed
}

/**
 * App component - The main entry point for the Aora app.
 * 
 * This component renders the app's splash screen with logo, 
 * tagline, and a button to navigate to the sign-in screen.
 * 
 * @returns {JSX.Element} App component JSX
 */
export default function App(): JSX.Element {
  
  const { isLoading, isLoggedIn } = useGlobalContext() as GlobalContextType;

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    // ? For Devices with Notches, Bottom bar, etc.
    <SafeAreaView className='bg-primary h-full'>
      {/* Having height 150% give Jelly-like Scroll feel */}
      <ScrollView contentContainerStyle={{height: '150%'}}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image
            source={images.logo}
            className='w-[120px] h-[70px]'
            // style={{
            //   width: widthDP('30%'), 
            //   height: heightDP("5%")
            // }}
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className='max-w--[380px] w-full h-[270px]'
            resizeMode='contain'
          />
          
          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with{' '}
              <Text className='text-secondary-200'>
                Aora
              </Text>
            </Text>
            
            <Image
              source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-1 -right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => {router.push('/sign-in')}}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar
        backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});