import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, GestureResponderEvent, ActivityIndicator } from 'react-native';
import COLORS from '~/constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

interface CardProps {
  name: string;
  iconName: keyof typeof FontAwesome.glyphMap;
  onPress: (event: GestureResponderEvent) => void;
}

const CardComponent: React.FC<CardProps> = ({ name, iconName, onPress }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...FontAwesome.font,
      });
      setFontsLoaded(true);
    }
    
    loadFonts();
  }, []);

  return (
    <Pressable
      onPress={onPress}
      className="w-[30%] aspect-square bg-white items-center justify-center rounded-lg shadow-md"
    >
      <View className="flex-1 w-full items-center justify-center">
        <FontAwesome name={iconName} size={30} color={COLORS.primary} />
        <Text className="text-center text-base font-semibold text-gray-800 mt-2">
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

export default CardComponent;