import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, Alert, BackHandler } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export default function HomeScreen() {

  useEffect(() => {
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
  }, []);

  const preExit = async () => {
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
    cache.push([uuidv4(), ...keyValuePairs]);
    await AsyncStorage.setItem('cache_key', JSON.stringify(cache));
    console.log(cache);
    BackHandler.exitApp();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
