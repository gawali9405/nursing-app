import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { listDownloadedFiles, deleteFile } from "../../downloads/DownloadManager";

const DownloadedFiles = () => {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const downloaded = await listDownloadedFiles();
    setFiles(downloaded);
  };

  useEffect(() => { loadFiles(); }, []);

  const handleDelete = async (fileName) => {
    await deleteFile(fileName);
    loadFiles();
  };

  return (
    <FlatList
      data={files}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.fileItem}>
          <Text>{item}</Text>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default DownloadedFiles;

const styles = StyleSheet.create({
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  deleteText: { color: "red", fontWeight: "bold" },
});