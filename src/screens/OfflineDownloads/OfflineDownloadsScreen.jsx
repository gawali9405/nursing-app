import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { downloadFile, listDownloadedFiles, deleteFile } from "../../downloads/DownloadManager";

const OfflineDownloadsScreen = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const downloaded = await listDownloadedFiles();
      setFiles(downloaded);
    } catch (error) {
      Alert.alert("Error", "Failed to load downloaded files. Please try again.");
      console.error("Error loading files:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDownload = async () => {
    try {
      setProgress(0);
      const fileName = `sample_${new Date().getTime()}.pdf`;
      await downloadFile(
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileName,
        (prog) => setProgress(prog)
      );
      await loadFiles();
    } catch (error) {
      Alert.alert("Download Error", "Failed to download the file. Please check your internet connection and try again.");
      console.error("Download error:", error);
    }
  };

  const handleDelete = (fileName) => {
    Alert.alert("Delete File", `Delete ${fileName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteFile(fileName);
          loadFiles();
        },
      },
    ]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadFiles();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5250C4" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#5250C4" barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.downloadSection}>
          <Text style={styles.sectionTitle}>Download Sample Content</Text>
          <Text style={styles.sectionSubtitle}>Download files to access them offline</Text>
          
          <TouchableOpacity 
            style={styles.downloadButton}
            onPress={handleDownload}
            disabled={progress > 0 && progress < 1}
          >
            <Ionicons name="cloud-download-outline" size={24} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>
              {progress > 0 && progress < 1 
                ? `Downloading... ${(progress * 100).toFixed(0)}%` 
                : 'Download Sample PDF'}
            </Text>
          </TouchableOpacity>
          
          {progress > 0 && progress < 1 && (
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          )}
        </View>

        <View style={styles.filesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Downloaded Files</Text>
            <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
              <Ionicons name="refresh" size={20} color="#5250C4" />
            </TouchableOpacity>
          </View>
          
          {files.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>No files downloaded yet</Text>
              <Text style={styles.emptySubtext}>Downloaded files will appear here</Text>
            </View>
          ) : (
            <FlatList
              data={files}
              keyExtractor={(item) => item}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#5250C4']}
                  tintColor="#5250C4"
                />
              }
              renderItem={({ item }) => (
                <View style={styles.fileItem}>
                  <Ionicons name="document-text-outline" size={24} color="#4B5563" style={styles.fileIcon} />
                  <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
                    {item}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => handleDelete(item)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.fileList}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OfflineDownloadsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  downloadSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filesSection: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  downloadButton: {
    flexDirection: 'row',
    backgroundColor: '#5250C4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5250C4',
  },
  fileList: {
    flexGrow: 1,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  fileIcon: {
    marginRight: 12,
  },
  fileName: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    marginRight: 12,
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  refreshButton: {
    padding: 4,
  },
});