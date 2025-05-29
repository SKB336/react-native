import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import * as Font from 'expo-font';
import { Route, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import { FlatGrid } from 'react-native-super-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CardComponent from '~/components/CardComponent';
import ButtonComponent from '~/components/ButtonComponent';
import COLORS from '~/constants/colors';

import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';


const cardData: {
  name: string;
  icon: keyof typeof FontAwesome.glyphMap;
  path: Route;
}[] = [
  { name: 'Personal',   icon: "user",             path: "/(forms)/personal" },
  { name: 'Education',  icon: "graduation-cap",   path: "/(forms)/education" },
  { name: 'Experience', icon: "briefcase",        path: "/(forms)/experience" },
  { name: 'Skills',     icon: "star",             path: "/(forms)/skill" },
  { name: 'Objective',  icon: "bullseye",         path: "/(forms)/objective" },
  { name: 'Reference',  icon: "paperclip",        path: "/(forms)/reference" },
];

const cardDataExtra: {
  name: string;
  icon: keyof typeof FontAwesome.glyphMap;
  path: Route;
}[] = [
  { name: 'Add More', icon: "plus", path: "/(tabs)/home" }
]

export default function CreateScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...FontAwesome.font,
      });
      setFontsLoaded(true);
    }
    
    loadFonts();
  }, []);

  const onNext = async () => {
    try {
      const personalFormData = await AsyncStorage.getItem('personal_form');
      if (!personalFormData) {
        alert('Please fill in the personal form first');
        return;
      }

      router.push('/templates2' as Route)
      const keys = await AsyncStorage.getAllKeys();
      const keyValuePairs = await AsyncStorage.multiGet(keys);
  
      keyValuePairs.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    } catch (error) {
      console.error('Error fetching key-value pairs:', error);
    }
  };  

  return (
    <SafeAreaView className='flex-1' edges={['right', 'left', 'bottom']}>
      {fontsLoaded ? (
        <View className="flex-1 relative ">
          {/* Colored background for top 1/4 of screen */}
          <View className="absolute top-0 left-0 right-0 h-[9%] bg-primary" />
          
          <View className="flex-1 p-1 z-10 ">
            <FlatGrid
              itemDimension={90}
              data={cardData.slice(0, 6)}
              spacing={10}
              renderItem={({ item }) => (
                <CardComponent
                  iconName={item.icon}
                  name={item.name}
                  onPress={() => router.push(item.path)}
                />
              )}
              style={{ flexGrow: 0 }}
            />

            <View className='mt-4 px-4'>
              <Text className='text-xl text-primary font-semibold'>
                More Sections
              </Text>
            </View>

            <FlatGrid
              itemDimension={90}
              data={cardDataExtra.slice(0, 6)}
              spacing={10}
              renderItem={({ item }) => (
                <CardComponent
                  iconName={item.icon}
                  name={item.name}
                  onPress={() => router.push(item.path)}
                />
              )}
              style={{ flexGrow: 0, marginTop: 16 }}
            />
          </View>

          <View className='ps-6 px-4'>
            <ButtonComponent
              title="Next"
              handlePress={onNext}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      )}
    </SafeAreaView>
  );
}