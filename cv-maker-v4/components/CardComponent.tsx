import React from 'react';
import { View, Text, Image, ImageSourcePropType, Pressable, GestureResponderEvent } from 'react-native';
import COLORS from '~/constants/colors';
import { FontAwesome } from '@expo/vector-icons';

interface CardProps {
  name: string;
  iconName: keyof typeof FontAwesome.glyphMap; // Ensures only valid FontAwesome icon names
  onPress: (event: GestureResponderEvent) => void; // React Native standard type
}

const CardComponent: React.FC<CardProps> = ({ name, iconName, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-[30%] aspect-square bg-white items-center justify-center rounded-lg shadow-md"
    >
        <View className="flex-1 w-full items-center justify-center">
          <FontAwesome name={iconName} size={30} color={COLORS.primary}/>
        <Text className="text-center text-base font-semibold text-gray-800 mt-2">
          {name}
        </Text>
        </View>
    </Pressable>
  );
};

export default CardComponent;
