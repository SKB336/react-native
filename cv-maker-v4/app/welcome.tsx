import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import BaseButton from '../components/BaseButton';


const { width } = Dimensions.get("window");

// Make the diameter 1.5x the screen width
const circleDiameter = 1.5 * width;
const circleRadius = circleDiameter / 2;

console.log(circleDiameter, -circleDiameter / 6);

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
            <View className="absolute inset-0 flex-1 justify-center items-center">
                <View className="w-72 bg-white rounded-2xl shadow-lg p-4 justify-center items-center">
                    <Text className="text-lg font-semibold text-gray-700">Welcome to the App</Text>
                    <Text className="text-gray-500">This is a centered card.</Text>
                </View>
                <BaseButton title="Create your Resume" 
                            handlePress={() => {}} 
                            containerStyles='bg-primary w-[70%]' 
                            textStyles='text-white' />
            </View>
        </View>
    );
};

export default WelcomeScreen;