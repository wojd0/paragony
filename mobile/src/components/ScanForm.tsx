import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Image,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import type { ImageAsset } from "../api";

interface ScanFormProps {
  onFilesSelected: (images: ImageAsset[]) => void;
}

export default function ScanForm({ onFilesSelected }: ScanFormProps) {
  const [selectedImages, setSelectedImages] = useState<ImageAsset[]>([]);

  async function pickImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages: ImageAsset[] = result.assets.map((asset) => ({
        uri: asset.uri,
        fileName: asset.fileName || `photo_${Date.now()}.jpg`,
        mimeType: asset.mimeType || "image/jpeg",
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      const newImage: ImageAsset = {
        uri: asset.uri,
        fileName: asset.fileName || `photo_${Date.now()}.jpg`,
        mimeType: asset.mimeType || "image/jpeg",
      };
      setSelectedImages((prev) => [...prev, newImage]);
    }
  }

  function removeImage(index: number) {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    if (selectedImages.length > 0) {
      onFilesSelected(selectedImages);
    }
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="items-center justify-center p-6 gap-6"
    >
      {selectedImages.length === 0 ? (
        <View className="w-full items-center">
          <TouchableOpacity
            onPress={pickImages}
            className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl items-center justify-center bg-gray-50 dark:bg-gray-800"
          >
            <Ionicons name="cloud-upload" size={48} color="#9ca3af" />
            <Text className="mt-3 text-lg font-semibold text-blue-500">
              Upload files
            </Text>
            <Text className="text-sm text-gray-400 mt-1">
              PNG, JPG (max. 10MB per file)
            </Text>
          </TouchableOpacity>

          {Platform.OS !== "web" && (
            <TouchableOpacity
              onPress={takePhoto}
              className="mt-4 flex-row items-center gap-2 bg-blue-500 px-6 py-3 rounded-xl"
            >
              <Ionicons name="camera" size={20} color="white" />
              <Text className="text-white font-medium">Take Photo</Text>
            </TouchableOpacity>
          )}

          <Text className="text-xs text-gray-400 mt-4 text-center">
            Note: When uploading multiple files, make sure they are of the same
            receipt.
          </Text>
        </View>
      ) : (
        <View className="w-full gap-3">
          {selectedImages.map((image, index) => (
            <View
              key={`${image.fileName}-${index}`}
              className="flex-row items-center bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <Image
                source={{ uri: image.uri }}
                className="w-16 h-16"
                resizeMode="cover"
              />
              <View className="flex-1 px-3">
                <Text
                  className="text-sm font-medium text-gray-900 dark:text-gray-100"
                  numberOfLines={1}
                >
                  {image.fileName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeImage(index)}
                className="p-3"
              >
                <Ionicons name="close" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            onPress={pickImages}
            className="w-full py-3 border-2 border-blue-500 rounded-xl items-center"
          >
            <Text className="text-blue-500 font-medium">Add More Files</Text>
          </TouchableOpacity>

          <Text className="text-xs text-gray-400 text-center">
            Note: When uploading multiple files, make sure they are of the same
            receipt.
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={selectedImages.length === 0}
        className={`w-full max-w-xs py-4 rounded-xl items-center ${
          selectedImages.length > 0
            ? "bg-blue-500"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        <Text
          className={`text-lg font-medium ${
            selectedImages.length > 0
              ? "text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Scan Receipt
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
