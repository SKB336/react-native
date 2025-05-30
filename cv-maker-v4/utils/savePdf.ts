import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system';

interface SavePdfToFolderProps {
    html: string;
    height: number;
    width: number;
    base64: boolean;
    fileName: string;
}

export const savePdfToFolder = async ({
  html, 
  height, 
  width, 
  base64,
  fileName
}: SavePdfToFolderProps) => {
  const { uri } = await printToFileAsync({
    html: html,
    height: height, 
    width: width,
    base64: base64,
  });
  
  const folderUri = FileSystem.documentDirectory + 'CVs/';
  
  const folderInfo = await FileSystem.getInfoAsync(folderUri);

  if (!folderInfo.exists) {
    await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
  }
    
  const extFileName = fileName + '.pdf';

  let i = 1;
  let destFileName = extFileName;
  while (await FileSystem.getInfoAsync(folderUri + destFileName).then(info => info.exists)) {
    destFileName = fileName + '_' + i + '.pdf';
    i++;
  }

  const destUri = folderUri + destFileName;

  // Copy the file to the desired location
  await FileSystem.copyAsync({
    from: uri,
    to: destUri,
  });

  console.log('PDF saved to:', destUri);
  
  await shareAsync(uri);
};
  