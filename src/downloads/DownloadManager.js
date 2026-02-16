import * as FileSystem from "expo-file-system/legacy";
import { Alert } from "react-native";

const downloadsFolder = FileSystem.documentDirectory + "downloads/";

export const ensureDownloadFolder = async () => {
  const folderInfo = await FileSystem.getInfoAsync(downloadsFolder);

  if (!folderInfo.exists) {
    await FileSystem.makeDirectoryAsync(downloadsFolder, {
      intermediates: true,
    });
  }
};

export const downloadFile = async (url, fileName, onProgress) => {
  try {
    await ensureDownloadFolder();

    const fileUri = downloadsFolder + fileName;

    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      fileUri,
      {},
      (progressData) => {
        if (onProgress) {
          const progress =
            progressData.totalBytesWritten /
            progressData.totalBytesExpectedToWrite;
          onProgress(progress);
        }
      }
    );

    const { uri } = await downloadResumable.downloadAsync();

    Alert.alert("Download Complete", `${fileName} saved locally!`);
    return uri;
  } catch (error) {
    console.error(error);
    Alert.alert("Download Failed", error.message);
    return null;
  }
};

export const listDownloadedFiles = async () => {
  await ensureDownloadFolder();
  return await FileSystem.readDirectoryAsync(downloadsFolder);
};

export const deleteFile = async (fileName) => {
  try {
    const fileUri = downloadsFolder + fileName;
    await FileSystem.deleteAsync(fileUri);
    Alert.alert("Deleted", `${fileName} removed`);
  } catch (error) {
    console.error(error);
    Alert.alert("Delete Failed", error.message);
  }
};