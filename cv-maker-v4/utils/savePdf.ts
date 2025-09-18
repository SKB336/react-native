import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing'
import { Directory, Paths, File } from 'expo-file-system';

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
  
  const sourceFile = new File(uri);

  const cvsDir = new Directory(Paths.document, "CVs");
  // Check if the folder exists
  if (!cvsDir.exists) {
    // Create it (like makeDirectoryAsync with intermediates)
    await cvsDir.create({ intermediates: true });
  }

  // Pick a unique filename
  let i = 1;
  let destFileName = `${fileName}.pdf`;
  while (true) {
    const destFile = new File(Paths.document, `CVs/${destFileName}`);
    const info = await destFile.info();

    if (!info.exists) break;

    destFileName = `${fileName}(${i}).pdf`;
    i++;
  }

  // Copy the PDF into the CVs folder
  const destFile = new File(Paths.document, `CVs/${destFileName}`);
  try {
    sourceFile.copy(destFile);
  } catch (error) {
    console.error("Error copying file:", error);
  }

  await shareAsync(destFile.uri);
};
  