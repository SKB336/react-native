import { useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Feather } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PDFs() {
  const [files, setFiles] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadFiles = async () => {
        const folderUri = FileSystem.documentDirectory + 'CVs/';

        const folderInfo = await FileSystem.getInfoAsync(folderUri);
        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        }

        const fileList = await FileSystem.readDirectoryAsync(folderUri);
        console.log(fileList);
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

  return (
    <SafeAreaView className="p-4" edges={['bottom']}>
    <View className="pb-[60px]">
      <FlatList
        data={files}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            className='bg-white border border-black rounded-lg p-4 mb-4 flex-row justify-between items-center active:opacity-70'
            onPress={() => openFile(item)}
          >
            <Text className="flex-1 text-lg font-semibold">{item}</Text>
            <Feather name="download" size={24} color="black" />
          </Pressable>
        )}
        ListEmptyComponent={<Text>No PDFs found</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
    </SafeAreaView>
  );
}
