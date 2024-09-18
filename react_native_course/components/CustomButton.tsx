import { Text, GestureResponderEvent } from 'react-native';
import { Pressable, PressableProps } from 'react-native';
import React from 'react';

interface CustomButtonProps extends PressableProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading, ...pressableProps }) => {
  return (
    // Use <Pressable> instead of <TouchableOpacity>
    <Pressable 
        onPress={handlePress}
        className={`bg-secondary rounded-xl min-h-[54px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} active:opacity-70`}
        // ? Used active: for nativewind instead of {pressed}
        // style={({pressed}) => [{ opacity: pressed ? 0.7 : isLoading ? 0.5 : 1 }]}
        disabled={isLoading}
        {...pressableProps}
    >
        <Text className={`text-primary font-psemibold text-base ${textStyles}`}>
            {title}
        </Text>
    </Pressable>
  )
}

export default CustomButton