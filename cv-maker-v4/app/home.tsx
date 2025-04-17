import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you are using MaterialIcons

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  return (
    <SafeAreaView className="flex-1 flex-col justify-between bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Title */}
      <Text className='text-2xl font-bold text-center mt-5'>Resume Builder</Text>

      {/* Bottom Buttons */}
        <View className='flex-row justify-around mt-5 pb-5'>
          <TouchableOpacity className='p-2.5'>
            <MaterialIcons name="menu" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className='bg-gray-200 rounded-full p-3.75 h-12 w-12 items-center justify-center'>
            <MaterialIcons name="add" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className='p-2.5'>
            <MaterialIcons name="file-download" size={30} color="black" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}