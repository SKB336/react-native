import { useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable, Alert, ToastAndroid, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Directory, Paths, File } from "expo-file-system";

export default function PDFs() {
  const [files, setFiles] = useState<string[]>([]);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadFiles = async () => {
        const baseDir = Paths.document;
        const cvsDir = new Directory(baseDir, "CVs");

        const dirInfo = await cvsDir.info();
        if (!dirInfo.exists) {
          // Create it (with intermediates if needed)
          await cvsDir.create({ intermediates: true });
        }

        const entries = await cvsDir.list();
        const fileEntries = entries.filter(e => e instanceof File);

        // If you want just names
        const fileNames = fileEntries.map(f => f.name);
        setFiles(fileNames);
      };

      loadFiles();
    }, [])
  );

  const openFile = async (fileName: string) => {
    // Create a File instance inside "CVs"
    const file = new File(Paths.document, `CVs/${fileName}`);
  
    // Get file info
    const info = await file.info();
    if (info.exists) {
      await shareAsync(file.uri); // use file.uri directly
    } else {
      console.warn("File does not exist:", fileName);
    }
  };

  const deleteMode = async (fileName: string) => {
    setItemToDelete(fileName);
    Alert.alert(
      'Delete File',
      `Are you sure you want to delete ${fileName}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            setItemToDelete(null);
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteFile(fileName);
            setItemToDelete(null);
            if (Platform.OS === 'android') {
              ToastAndroid.show(fileName + ' has been deleted', ToastAndroid.SHORT);
            }
          },
        },
      ],
      { onDismiss: () => setItemToDelete(null) }
    );
  };

  const deleteFile = async (fileName: string) => {
    // Point to the file inside CVs
    const file = new File(Paths.document, `CVs/${fileName}`);

    // Check if it exists
    const fileInfo = await file.info();
    if (fileInfo.exists) {
      // Delete it
      await file.delete();

      // Reload remaining files in the CVs folder
      const cvsDir = new Directory(Paths.document, "CVs");
      const dirInfo = await cvsDir.info();

      if (dirInfo.exists) {
        const entries = await cvsDir.list();
        const fileEntries = entries.filter(e => e instanceof File);
        const fileNames = fileEntries.map(f => f.name);
        setFiles(fileNames);
      }
    } else {
      console.warn("File not found:", fileName);
    }
  };


  return (
    // <SafeAreaView className="p-4" edges={['bottom']}>
    // <View className="pb-[60px]">
    //   <FlatList
    //     data={files}
    //     keyExtractor={(item) => item}
    //     renderItem={({ item }) => (
    //       <Pressable
    //         // className={`border rounded-lg p-4 mb-4 flex-row justify-between items-center active:opacity-70 ${
    //         //   itemToDelete === item ? 'bg-red-200 border-red-500' : 'bg-white border-black'
    //         // }`}
    //         className={`rounded-lg p-4 mb-4 shadow-md flex-row justify-between items-center active:opacity-70 ${
    //           itemToDelete === item ? 'border bg-red-200 border-red-500' : 'bg-white'
    //         }`}
    //         onPress={() => itemToDelete === item ? null : openFile(item)}
    //         onLongPress={() => deleteMode(item)}
    //       >
    //         <Text className="flex-1 text-lg font-semibold">{item}</Text>
    //         <Feather name={itemToDelete === item ? "trash-2" : "download"} size={24} color={itemToDelete === item ? "red" : "black"} />
    //       </Pressable>
    //     )}
    //     ListEmptyComponent={
    //       <View className="h-[70vh] justify-center items-center">
    //         <MaterialCommunityIcons name="note-off-outline" size={64} color="gray" />
    //         <Text className="text-gray-500 mt-4">No PDFs found</Text>
    //       </View>
    //     }
    //     showsVerticalScrollIndicator={false}
    //   />
    // </View>
    // </SafeAreaView>


    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <View className="flex-1 px-6 pt-4">
        {/* Header */}
        <View className="mb-6">
          {/* <Text className="text-3xl font-bold text-gray-900 mb-2">My Files</Text> */}
          <Text className="text-gray-600">Tap to open • Long press to delete</Text>
        </View>

        <FlatList
          data={files}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              className={`rounded-2xl p-5 mb-4 flex-row justify-between items-center active:opacity-90 ${
                itemToDelete === item 
                  ? 'bg-red-50 border-2 border-red-200' 
                  : 'bg-white border border-gray-100'
              }`}
              onPress={() => itemToDelete === item ? null : openFile(item)}
              onLongPress={() => deleteMode(item)}
            >
              {/* File Icon */}
              <View className={`w-12 h-12 rounded-xl mr-4 justify-center items-center ${
                itemToDelete === item ? 'bg-red-100' : 'bg-blue-50'
              }`}>
                <MaterialCommunityIcons 
                  name="file-pdf-box" 
                  size={24} 
                  color={itemToDelete === item ? '#ef4444' : '#3b82f6'} 
                />
              </View>

              {/* File Info */}
              <View className="flex-1">
                <Text 
                  className={`text-lg font-semibold mb-1 ${
                    itemToDelete === item ? 'text-red-700' : 'text-gray-900'
                  }`}
                  numberOfLines={1}
                >
                  {item}
                </Text>
                <Text className="text-sm text-gray-500">PDF Document</Text>
              </View>

              {/* Action Icon */}
              <View className={`w-10 h-10 rounded-full justify-center items-center ${
                itemToDelete === item ? 'bg-red-100' : 'bg-white'
              }`}>
                <Feather 
                  name={itemToDelete === item ? "trash-2" : "download"} 
                  size={20} 
                  color={itemToDelete === item ? "#ef4444" : "#6b7280"} 
                />
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <View className="w-24 h-24 bg-gray-100 rounded-full justify-center items-center mb-6">
                <MaterialCommunityIcons name="file-document-outline" size={40} color="#9ca3af" />
              </View>
              <Text className="text-xl font-semibold text-gray-700 mb-2">No Files Yet</Text>
              <Text className="text-gray-500 text-center px-8 leading-6">
                Your PDF files will appear here once you add them to your collection
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        />
      </View>
    </SafeAreaView>
  );
}
