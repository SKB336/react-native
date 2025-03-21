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

const styles = StyleSheet.create({
  cvBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cvIconContainer: {
    backgroundColor: '#B39DDB', // Darker purple for CV icon
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
  },
  cvIcon: {
    color: 'white',
    fontWeight: 'bold',
  },
  cvTextContainer: {
    flex: 1,
  },
  cvTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cvSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  openButton: {
    backgroundColor: '#3F51B5', // Blue button color
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  mainImage: {
    width: width * 0.8, // Adjust as needed
    height: height * 0.4, // Adjust as needed
    alignSelf: 'center',
    marginTop: 20,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingBottom: 20,
  },
  bottomButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#E0E0E0', // Light gray background for add button
    borderRadius: 50,
    padding: 15,
  },
});