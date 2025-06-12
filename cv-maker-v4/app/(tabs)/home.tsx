import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Alert, BackHandler, FlatList, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { useFocusEffect } from 'expo-router';
import COLORS from '~/constants/colors';
import { useRouter } from 'expo-router';

const router = useRouter();

export default function HomeScreen() {
  const [cache, setCache] = useState<any[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('cache_key').then((value) => {
      if (value) {
        setCache(JSON.parse(value));
      }
    });

    console.log(cache);
  }, []);

  useFocusEffect(
    useCallback(() => {
    const onBackPress = () => {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              // Do nothing
            },
            style: 'cancel',
          },
          { text: 'YES', onPress: () => preExit() },
        ],
        { cancelable: false }
      );
  
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );
  
    return () => backHandler.remove();
    }, [])
  );

  const preExit = async () => {
    console.log('Pre Exit');
    try {
    if (!(await AsyncStorage.getItem('cache_key'))) {
      await AsyncStorage.setItem('cache_key', JSON.stringify([]));
    }
    // append to cache_key[] all the other keys
    const keyValuePairs = await AsyncStorage.multiGet(
      ['personal_form', 'objective_form', 'experience_entries', 
        'education_entries', 'skill_entries', 'reference_entries']
    );
    const cache = JSON.parse(await AsyncStorage.getItem('cache_key') || '[]');
    const newCache = [...cache, [uuidv4(), Date.now(), ...keyValuePairs]];
    await AsyncStorage.setItem('cache_key', JSON.stringify(newCache));
    console.log(newCache);
    setCache(newCache);
    // BackHandler.exitApp();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCache = async (id: string) => {
    Alert.alert(
      'Delete Cache',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            // Do nothing
          },
          style: 'cancel',
        },
        { text: 'Delete', onPress: async () => 
          {
            const cache = JSON.parse(await AsyncStorage.getItem('cache_key') || '[]');
            const newCache = cache.filter((item: any) => item[0] !== id);
            await AsyncStorage.setItem('cache_key', JSON.stringify(newCache));
            setCache(newCache);
          } 
        },
      ],
      { cancelable: false }
    );
    
  };

  return (
    <View>
      <FlatList
        data={cache}
        renderItem={({ item }) => {
          const parsedItem = JSON.parse(item[2][1]);
          return (
            <View className="m-4 p-4 shadow-md rounded-xl bg-gray-50">
              <Text className="text-lg font-semibold">{parsedItem.fullName}</Text>
              <View className="flex-row pt-4 justify-end gap-2">
                <Pressable className="flex-1 items-center justify-center p-2 bg-gray-200 rounded-xl">
                  <Feather name="eye" size={24} color="black" />  
                </Pressable>
                <Pressable 
                  className="items-center justify-center p-2 border-2 border-red-500 rounded-xl"
                  onPress={() => deleteCache(item[0])}
                >
                  <Feather name="trash-2" size={24} color="red" />  
                </Pressable>
              </View>
            </View>
          )
        }}
      />
    </View>
  );
}
