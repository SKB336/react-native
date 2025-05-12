import {useEffect, useRef, useState} from 'react';
import { View, Text, Pressable, Image, Animated } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { templates } from '../constants/templates';
import ButtonComponent from '~/components/ButtonComponent';
import { flagEmptyKeys } from '../utils/formatData';
import COLORS from '~/constants/colors';


const Template2 = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Only run the animation if a template is selected
    if (selectedTemplate) {
      // --- FIX: Reset values instantly before animating ---
      opacity.setValue(0);
      scale.setValue(0.8);

      // Start the "in" animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1, // Animate TO visible
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1, // Animate TO full size
          // Adjust spring properties if needed:
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
    if (!selectedTemplate) return;

    const template = templates.find(template => template.name === selectedTemplate);
    const keys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(keys);
    
    const data: Record<string, string> = {};
    stores.forEach(([key, value]) => {
        if (key && value) {
        data[key] = JSON.parse(value);
        }
    });

    let cleanData : any = flagEmptyKeys(data);
    const html = template?.renderHtml(cleanData);

    const file = await printToFileAsync({
      html: html,
      height:842, 
      width:595,
      base64: false,
    });
    await shareAsync(file.uri);
  };

  return (
    <>
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
                  bottom: 8,
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

    <View className='absolute bottom-1 w-full py-6 px-4'>
      <ButtonComponent
        title="Generate"
        handlePress={generatePDF}
        disabled={!selectedTemplate}
        style={{
          backgroundColor: COLORS.PRIMARY
        }}
      />
    </View>
    </>
  );
};


export default Template2;