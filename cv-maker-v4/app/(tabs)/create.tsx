import { useEffect, useState, useLayoutEffect, useRef, useCallback } from 'react';
import { View, Text, ActivityIndicator, Pressable, Modal, Animated } from 'react-native';

import * as Font from 'expo-font';
import { Route, router, useFocusEffect, useNavigation } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import { FlatGrid } from 'react-native-super-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CardComponent from '~/components/CardComponent';
import ButtonComponent from '~/components/ButtonComponent';
import COLORS from '~/constants/colors';

import { SafeAreaView } from 'react-native-safe-area-context';


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
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      fadeAnim.setValue(0);

      const animation = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      });

      animation.start();

      return () => {
        animation.stop();
      };
    }, [])
  )
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({  }) => (
        <Pressable
          onPress={() => setModalVisible(true)}
          className="pr-6"
        >
          <FontAwesome name="rotate-right" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

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

  const resetStorage = async ({ keys }: { keys?: string[] | null }) => {
    try {
      setLoading(true)
      if (Array.isArray(keys) && 0 < keys.length) {
        await AsyncStorage.multiRemove(keys);
        console.log('Selected keys removed:', keys);
      } else {
        await AsyncStorage.clear();
        console.log('All storage cleared.');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('Error clearing storage:', error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className='flex-1' edges={['right', 'left', 'bottom']}>
      {fontsLoaded ? (
        <View className="flex-1 relative ">
          {/* Colored background for top 1/4 of screen */}
          <View className="absolute top-0 left-0 right-0 h-[9%] bg-primary" />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View className="flex-1 items-center justify-center bg-black/50">
              <View className="bg-white p-6 rounded-2xl w-[70%]">
                <Text className="text-xl font-semibold">Reset Profile</Text>
                <Text className="text-gray-500 mt-2">
                  Are you sure you want to reset your profile?
                </Text>
                <View className="flex-row justify-end mt-4">
                  <Pressable 
                    onPress={() => setModalVisible(false)}
                    className="px-4 py-2 text-primary"
                    disabled={loading}
                  >
                    <Text className={`text-primary ${loading ? 'opacity-50' : ''}`}>Cancel</Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => resetStorage({'keys': [
                      'personal_form', 
                      'education_entries',
                      'experience_entries',
                      'skill_entries',
                      'objective_form',
                      'reference_entries'
                    ]})}
                    className="px-4 py-2 ml-2"
                    disabled={loading}
                  >
                    <Text className={`text-primary ${loading ? 'opacity-50' : ''}`}>Reset</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          
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

          <Animated.View 
            className={`ps-6 px-4 ${modalVisible ? 'pb-4' : ''}`}
            style={{ opacity: fadeAnim }}
          >
            <ButtonComponent
              title="Next"
              handlePress={onNext}
            />
          </Animated.View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      )}
    </SafeAreaView>
  );
}