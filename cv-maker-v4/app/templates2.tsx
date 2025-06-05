import {useEffect, useRef, useState} from 'react';
import { View, Text, Pressable, Image, Animated } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing'

import { templates } from '~/constants/templates';
import ButtonComponent from '~/components/ButtonComponent';
import { flagEmptyKeys } from '~/utils/formatData';
import COLORS from '~/constants/colors';

import { savePdfToFolder } from '~/utils/savePdf';


const Template2 = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Only run the animation if a template is selected
    if (selectedTemplate) {
      // --- Reset values instantly before animating ---
      opacity.setValue(0);
      scale.setValue(0.8);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [selectedTemplate, opacity, scale]); 

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
    const html = template?.renderHtml(cleanData) || '';

    // Printing
    const personalForm = await AsyncStorage.getItem('personal_form')
    const fullName = JSON.parse(personalForm || '{}').fullName;

    await savePdfToFolder({
      html: html, 
      height: 842, 
      width: 595, 
      base64: false,
      fileName: `${fullName}`
    });
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

    <View 
      className='absolute bottom-1 w-full ps-6 px-4' 
      style={{ marginBottom: insets.bottom }}
    >
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