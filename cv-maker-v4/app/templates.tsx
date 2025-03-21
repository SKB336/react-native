import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Home, Search, Book, User } from 'lucide-react-native';
import BaseButton from '../components/BaseButton';

const HomeScreen = () => {
  return (
    <View className='flex-1 bg-white px-4 pt-6'>
      <View className='absolute top-0 left-0 right-0 h-40 bg-[#1A5555] rounded-b-full' />
      {/* Search Bar */}
      <View className='flex-row items-center bg-white rounded-xl p-3 mb-4'>
        <Search size={20} color='#666' />
        <TextInput
          className='ml-2 flex-1 text-gray-700'
          placeholder='Search for subjects...'
          placeholderTextColor='#aaa'
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Text className='text-xl font-semibold text-gray-900'>Explore the cool features we have for you!</Text>
        
        {/* Subjects Section */}
        <Text className='text-lg font-bold text-gray-900 mt-4'>Subjects</Text>
        <View className='flex-row mt-2 space-x-4'>
          <TouchableOpacity className='bg-orange-400 rounded-xl p-4 flex-1'>
            <Text className='text-white font-semibold'>Mathematics</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-blue-500 rounded-xl p-4 flex-1'>
            <Text className='text-white font-semibold'>Geography</Text>
          </TouchableOpacity>
        </View>
        
        {/* Schedule Section */}
        <Text className='text-lg font-bold text-gray-900 mt-6'>Your Schedule</Text>
        <View className='bg-green-500 rounded-xl p-4 mt-2'>
          <Text className='text-white font-semibold'>Biology</Text>
          <Text className='text-white text-sm'>Chapter 3: Animal Kingdom</Text>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View className='flex-row justify-around bg-white py-3 rounded-t-xl mt-4'>
        <Home size={24} color='#34D399' />
        <Book size={24} color='#666' />
        <User size={24} color='#666' />
      </View>
    </View>
  );
};

export default HomeScreen;
