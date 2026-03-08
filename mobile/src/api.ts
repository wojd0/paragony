import { Platform } from "react-native";
import { API_BASE_URL } from "./constants";
import type { Receipt } from "./types";

export interface ImageAsset {
  uri: string;
  fileName: string;
  mimeType: string;
}

export async function scanImages(images: ImageAsset[]): Promise<Receipt[]> {
  const formData = new FormData();

  for (const image of images) {
    if (Platform.OS === "web") {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      formData.append("files", blob, image.fileName);
    } else {
      formData.append("files", {
        uri: image.uri,
        name: image.fileName,
        type: image.mimeType,
      } as any);
    }
  }

  const response = await fetch(`${API_BASE_URL}/api/scan`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Scan failed: ${response.statusText}`);
  }

  return response.json();
}
