import { View, Text, Dimensions, Image } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
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
                    <Text className="text-lg font-semibold text-center text-gray-700">Professional Resume</Text>
                    <Text className="text-gray-500">in just a few steps</Text>
                </View>
                <View>
                    <Text className="text-center font-semibold text-2xl text-black-500">Welcome to ProFile</Text>
                    <Text className="text-center text-gray-500">Terms and conditions</Text>
                </View>
                <ButtonComponent 
                    title="Create your Resume" 
                    handlePress={() => {router.replace("/(tabs)/home")}} 
                    containerStyles='w-[70%]' 
                    textStyles='text-secondary' />
            </View>
        </View>
    );
};

export default WelcomeScreen;