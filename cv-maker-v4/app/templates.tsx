import React, {useEffect, useRef, useState} from 'react';
import { View, Text, Button, Pressable, Image, Animated } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system';
import { templates } from '../constants/templates';
// import { templates } from '~/constants';


const Template = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Only run the animation if a template is selected
    if (selectedTemplate) {
      // --- FIX: Reset values instantly before animating ---
      opacity.setValue(0);      // Reset opacity to start value
      scale.setValue(0.8);      // Reset scale to start value
      // ----------------------------------------------------

      // Start the "in" animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1, // Animate TO visible
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1, // Animate TO full size
          // You can adjust spring properties if needed:
          // friction: 7,
          // tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // Optional: If you wanted an "out" animation when deselecting all,
    // you would add an `else` block here to animate opacity to 0 and scale to 0.8.
    // However, the current logic doesn't seem to support deselecting back to null.

  }, [selectedTemplate, opacity, scale]); // Include opacity and scale in deps array (good practice, though useRef values don't trigger effect directly)


  let generatePDF = async () => {
    console.log("temp ", templates)
    // const file = await printToFileAsync({
    //   html: html,
    //   base64: false
    // });

    // await shareAsync(file.uri);
  }

  return (
    <View className="flex-row flex-wrap justify-between p-4">
      {templates.map((template) => {
        const isSelected = selectedTemplate === template.name

        return (
        <Pressable
          key={template.name}
          onPress={() => setSelectedTemplate(template.name)}
          className={`w-[48%] bg-white p-2 rounded-2xl mb-4 shadow-sm border-2 ${
            isSelected ? 'border-primary' : 'border-gray-300'
          } overflow-hidden`}
        >
          <View className="relative">
          <Image
            className={`w-full h-60 rounded-xl ${isSelected ? 'opacity-70' : 'opacity-100'}`}
            resizeMode="cover"
            source={template.thumbnail}
          />
          {isSelected && (
                <Animated.View
                  style={{
                    position: 'absolute',
                    bottom: 8, // bottom-2 (tailwind is 0.5rem ~ 8px)
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    opacity,
                    transform: [{ scale }],
                  }}
                >
                  <Text className="text-white font-bold bg-primary px-3 py-1 rounded-full overflow-hidden">
                    {template.name}
                  </Text>
                </Animated.View>
              )}
              </View>
        </Pressable>
      )})}
    </View>
  );
};


export default Template;
