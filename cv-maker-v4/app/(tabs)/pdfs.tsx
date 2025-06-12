import { useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable, Alert, ToastAndroid, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PDFs() {
  const [files, setFiles] = useState<string[]>([]);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadFiles = async () => {
        const folderUri = FileSystem.documentDirectory + 'CVs/';

        const folderInfo = await FileSystem.getInfoAsync(folderUri);
        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        }

        const fileList = await FileSystem.readDirectoryAsync(folderUri);
        setFiles(fileList);
      };

      loadFiles();
    }, [])
  );

  const openFile = async (fileName: string) => {
    const fileUri = FileSystem.documentDirectory + 'CVs/' + fileName;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      await shareAsync(fileUri);
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
    const fileUri = FileSystem.documentDirectory + 'CVs/' + fileName;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (fileInfo.exists) {
      await FileSystem.deleteAsync(fileUri);
      const folderUri = FileSystem.documentDirectory + 'CVs/';
      const folderInfo = await FileSystem.getInfoAsync(folderUri);
      
      if (folderInfo.exists) {
        const fileList = await FileSystem.readDirectoryAsync(folderUri);
        setFiles(fileList);
      }
    }
  };

  return (
    <SafeAreaView className="p-4" edges={['bottom']}>
    <View className="pb-[60px]">
      <FlatList
        data={files}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            // className={`border rounded-lg p-4 mb-4 flex-row justify-between items-center active:opacity-70 ${
            //   itemToDelete === item ? 'bg-red-200 border-red-500' : 'bg-white border-black'
            // }`}
            className={`rounded-lg p-4 mb-4 shadow-md flex-row justify-between items-center active:opacity-70 ${
              itemToDelete === item ? 'border bg-red-200 border-red-500' : 'bg-white'
            }`}
            onPress={() => itemToDelete === item ? null : openFile(item)}
            onLongPress={() => deleteMode(item)}
          >
            <Text className="flex-1 text-lg font-semibold">{item}</Text>
            <Feather name={itemToDelete === item ? "trash-2" : "download"} size={24} color={itemToDelete === item ? "red" : "black"} />
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="h-[70vh] justify-center items-center">
            <MaterialCommunityIcons name="note-off-outline" size={64} color="gray" />
            <Text className="text-gray-500 mt-4">No PDFs found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
    </SafeAreaView>
  );
}
