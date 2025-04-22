import { Text, GestureResponderEvent } from 'react-native';
import { Pressable, PressableProps } from 'react-native';
import React from 'react';

interface ButtonComponentProps extends PressableProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, handlePress, containerStyles, textStyles, isLoading, ...pressableProps }) => {
  return (
    <Pressable 
      onPress={handlePress}
      className={`bg-primary rounded-xl min-h-[54px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} active:opacity-70`}
      // ? Used active: for nativewind instead of {pressed}
      // style={({pressed}) => [{ opacity: pressed ? 0.7 : isLoading ? 0.5 : 1 }]}
      disabled={isLoading}
      {...pressableProps}
    >
      <Text className={`text-white font-medium text-base font-psemibold ${textStyles}`}>
        {title}
      </Text>
    </Pressable>
  )
}

export default ButtonComponent;