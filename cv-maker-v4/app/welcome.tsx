import React from 'react';
import { View, Text, Dimensions, Image, Pressable } from 'react-native';
import { Svg, Circle, Rect, Polygon } from 'react-native-svg';
import ButtonComponent from '../components/ButtonComponent';

import { images } from '../constants';
import { router } from 'expo-router';

const { width } = Dimensions.get("window");

// Make the diameter 1.5x the screen width
const circleDiameter = 1.5 * width;
const circleRadius = circleDiameter / 2;


const WelcomeScreen = () => {
    return (
        <View className="flex-1 bg-white">
            {/* Background circle */}
            <Svg
                width="100%"
                height={circleDiameter * 0.66} // Show about 2/3 of the circle
                className="absolute top-0"
            >
                <Circle 
                    cx={width / 2}        // Center horizontally
                    cy={0}  // Push up to hide top portion
                    r={circleRadius}
                    fill="#1A5555" 
                />
            </Svg>
            
            {/* Absolutely positioned card for true center */}
            <View className="absolute inset-0 flex-1 justify-center items-center gap-16">
                <View className="w-60 bg-white rounded-2xl shadow-lg p-4 justify-center items-center">
                    <Image 
                        source={images.cvSample} 
                        className="w-full h-60 mb-3"
                        resizeMode="cover"
                    />
                    <Text className="text-lg font-semibold text-center text-gray-700">Create the perfect resume</Text>
                    <Text className="text-gray-500">in just few steps</Text>
                </View>
                <View>
                    <Text className="text-center font-semibold text-2xl text-black-500">Welcome to ---</Text>
                    <Text className="text-center text-gray-500">terms and conditions</Text>
                </View>
                <ButtonComponent title="Create your Resume" 
                            handlePress={() => {router.replace("/(tabs)/home")}} 
                            containerStyles='w-[70%]' 
                            textStyles='text-secondary' />
                <Pressable className="w-[120px] h-[120px] rounded-lg overflow-hidden items-center justify-center" onPress={()=>{}}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        className="absolute"
      >
        <Rect fill="#00bb77" width="120" height="120" />
        <Polygon
          fill="#000"
          fillOpacity="0.1"
          points="120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0"
        />
      </Svg>
      <Text className="text-white font-bold">Click Me</Text>
    </Pressable>
            </View>
        </View>
    );
};

export default WelcomeScreen;