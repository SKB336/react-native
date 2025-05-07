import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import CardComponent from '~/components/CardComponent';
import icons from '~/constants/icons';
import { Href, Route, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import ButtonComponent from '~/components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import COLORS from '~/constants/colors';

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
  // { name: 'Reference',  icon: "paperclip",        path: "/(forms)/reference" },
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
    <>
      {fontsLoaded ? (
        <View className="flex-1 relative ">
          {/* Colored background for top 1/4 of screen */}
          <View className="absolute top-0 left-0 right-0 h-[9%] bg-primary" />
          
          <View className="flex-1 p-4 z-10 ">
            {/* <View className='items-center '>
              <View className="flex-row flex-wrap w-full justify-start gap-4">
                {cardData.map((item, index) => (
                  <CardComponent
                    key={index}
                    iconName={item.icon}
                    name={item.name}
                    onPress={() => router.push(item.path)}
                  />
                ))}
              </View>
            </View> */}

            <FlatList
              data={cardData}
              renderItem={({item}) => (
                <CardComponent
                  iconName={item.icon}
                  name={item.name}
                  onPress={() => router.push(item.path)}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}  // Set the number of columns to 3
              style={{ borderColor: 'red', borderWidth: 1, flexGrow: 0 }}
              contentContainerStyle={{ gap: 16, borderColor: 'red', borderWidth: 1 }}  // Apply a gap between the items
              columnWrapperStyle={{
                justifyContent: 'flex-start',  // Distribute the items evenly
              }}
            />

            <View className='mt-6 px-1 border'>
              <Text className='text-xl text-primary font-semibold'>
                More Sections
              </Text>
            </View>

            <View className='mt-6 items-center '>
              <View className="flex-row flex-wrap w-full justify-start gap-4">
                {cardDataExtra.map((item, index) => (
                  <CardComponent
                    key={index}
                    iconName={item.icon}
                    name={item.name}
                    onPress={() => router.push(item.path)}
                  />
                ))}
              </View>
            </View>
          </View>

          <View className='py-6 px-4'>
            <ButtonComponent
              title="Next"
              handlePress={onNext}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </>
  );
}