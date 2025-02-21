import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const WelcomeScreen = () => {
    return (
        <View className="flex-1 bg-white px-4 pt-6">
            <Svg
                width="100%"
                height="100%"
                viewBox="0 0 100 50"
                // style={{ position: 'absolute', top: -10, left: '-20%' }}
            >
                <Circle cx="50" cy="50" r="50" fill="#1A5555" />
            </Svg>
        </View>
    );
};

export default WelcomeScreen