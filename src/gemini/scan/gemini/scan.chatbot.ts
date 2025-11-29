import { type DeleteFileResponse, type File, GoogleGenAI } from '@google/genai';
import { getGeminiEnv } from '@/gemini/environmentConfiguration';
import {
	SCAN_GENERATION_CONFIG,
	type ScanResponseSchema,
} from './scan.generation-config';

export class ScanChatbot {
	private chatbotApiKey: string = getGeminiEnv('GEMINI_CHATBOT_API_KEY');
	private chatbotModelId: string = getGeminiEnv('GEMINI_CHATBOT_MODEL');

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

		return JSON.parse(result.text || '{}');
	}

	private async uploadFile(path: string, mimeType: string): Promise<File> {
		let uploadResult: File;
		try {
			uploadResult = await this.fileManager.upload({
				file: path,
				config: {
					mimeType,
					displayName: path,
				},
			});
		} catch (e) {
			console.log(e);
			throw 'shit happens';
		}
		console.log(
			`Uploaded file ${uploadResult.displayName} as: ${uploadResult.name}`,
		);
		return uploadResult;
	}

	private deleteFile(file: File): Promise<DeleteFileResponse> {
		return this.fileManager.delete({
			name: file.name || file.displayName || '',
		});
	}
}
