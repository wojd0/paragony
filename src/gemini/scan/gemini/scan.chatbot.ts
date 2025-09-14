import {
	SCAN_GENERATION_CONFIG,
	ScanResponseSchema,
} from "./scan.generation-config";
import { GoogleGenAI, File, DeleteFileResponse } from "@google/genai";
import { getGeminiEnv } from "@/gemini/environmentConfiguration";

export class ScanChatbot {
	private chatbotApiKey: string = getGeminiEnv("GEMINI_CHATBOT_API_KEY");
	private chatbotModelId: string = getGeminiEnv("GEMINI_CHATBOT_MODEL");

	private genAI = new GoogleGenAI({
		apiKey: this.chatbotApiKey,
	});
	private fileManager = this.genAI.files;

	async requestScan(
		filePath: string,
		mimeType: string,
	): Promise<ScanResponseSchema> {
		const file = await this.uploadFile(filePath, mimeType);

		const result = await this.genAI.models.generateContent({
			model: this.chatbotModelId,
			config: SCAN_GENERATION_CONFIG,
			contents: [
				{
					fileData: {
						fileUri: file.uri,
						mimeType,
					},
				},
			],
		});

		await this.deleteFile(file);

		return JSON.parse(result.text || "{}");
	}

	private async uploadFile(path: string, mimeType: string): Promise<File> {
		const uploadResult = await this.fileManager.upload({
			file: path,
			config: {
				mimeType,
				displayName: path,
			},
		});
		console.log(
			`Uploaded file ${uploadResult.displayName} as: ${uploadResult.name}`,
		);
		return uploadResult;
	}

	private deleteFile(file: File): Promise<DeleteFileResponse> {
		return this.fileManager.delete({
			name: file.name || file.displayName || "",
		});
	}
}
