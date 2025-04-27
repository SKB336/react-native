import React, {useEffect, useState} from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system';
import { templates } from '../constants/templates';
// import { templates } from '~/constants';


const Template = () => {

  let generatePDF = async () => {
    console.log("temp ", templates)
    // const file = await printToFileAsync({
    //   html: html,
    //   base64: false
    // });

    // await shareAsync(file.uri);
  }

  return (
    <View className="flex-row flex-wrap justify-between p-2">
      {Object.entries(templates).map(([name, html]) => (
        <Pressable
          key={name}
          className="w-[48%] bg-white p-4 rounded-2xl mb-4 shadow-sm"
        >
          <Text className="text-lg font-bold">{name}</Text>
        </Pressable>
      ))}
    </View>
  );
};


export default Template;
