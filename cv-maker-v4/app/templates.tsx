import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system';
import { templates } from '../constants';


const Template = () => {
    // const [html, setHtml] = useState('');

    // useEffect(() => {
    //   loadHtmlTemplate();
    // }, []);
  
    // const loadHtmlTemplate = async () => {
    //   try {
    //     // Path to your HTML file in the assets directory
    //     const fileUri = FileSystem.documentDirectory + 'components/templates/BasicTemplate.html';
    //     console.log(fileUri);

    //     // Check if file exists first
    //     const fileInfo = await FileSystem.getInfoAsync(fileUri);
        
    //     if (fileInfo.exists) {
    //       const htmlContent = await FileSystem.readAsStringAsync(fileUri);
    //       setHtml(htmlContent);
    //     } else {
    //       console.error('HTML template file not found');
    //       // Set a fallback HTML if needed
    //       setHtml('<html><body><h1>Template not found</h1></body></html>');
    //     }
    //   } catch (error) {
    //     console.error('Error loading HTML template:', error);
    //     setHtml('<html><body><h1>Error loading template</h1></body></html>');
    //   }
    // };

  const html = require('../components/templates/BasicTemplate.html')
  console.log(html)

  let generatePDF = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  }

  return (
    <View>
      <Button title='Generate PDF' onPress={generatePDF} />
    </View>
  );
};


export default Template;
