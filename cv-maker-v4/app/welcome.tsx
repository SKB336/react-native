import React from 'react';
import { View, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get("window");

// Make the diameter 1.5x the screen width
const circleDiameter = 1.5 * width;
const circleRadius = circleDiameter / 2;

// 1/3 of the circle should be hidden
const circleHiddenHeight = (1 / 3) * circleDiameter;

// Calculate the top position dynamically
const circleTop = -circleHiddenHeight;

const WelcomeScreen = () => {
    return (
        <View className="flex-1 bg-white px-4 pt-6">
            <Svg
                width="100%"
                height="50%"
                viewBox="0 0 100 100"
                style={{ position: 'absolute', top: circleTop, left: '0%' }}
            >
                <Circle cx="50" cy="50" r="50" fill="#1A5555" />
            </Svg>
        </View>
    );
};

export default WelcomeScreen;
