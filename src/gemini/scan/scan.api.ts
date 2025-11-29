import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { Receipt } from '@/shared/types';
import { ScanChatbot } from './gemini/scan.chatbot';
import scanResponseParser from './scan.response-parser';

export async function scanImage(file: File): Promise<Receipt> {
	const localFile = await uploadImage(file);

	const geminiService = new ScanChatbot();
	const result = await geminiService.requestScan(localFile.path, 'image/png');

	await localFile.delete();

	return scanResponseParser(result);
}

export async function scanImages(files: File[]): Promise<Receipt[]> {
	const results: Receipt[] = [];

	for (const file of files) {
		try {
			const receipt = await scanImage(file);
			results.push(receipt);
		} catch (error) {
			console.error(`Error scanning file ${file.name}:`, error);
			throw error;
		}
	}

	return results;
}

async function uploadImage(
	file: File,
): Promise<{ path: string; delete: () => Promise<void> }> {
	const destinationDirPath = path.join(process.cwd(), 'public', 'uploads');
	const destinationFilePath = path.join(destinationDirPath, file.name);

	const fileArrayBuffer = await file.arrayBuffer();

	if (!existsSync(destinationFilePath)) {
		await fs.mkdir(destinationDirPath, { recursive: true });
	}

	await fs.writeFile(destinationFilePath, Buffer.from(fileArrayBuffer));

	return {
		path: destinationFilePath,
		delete: () => {
			return fs.unlink(destinationFilePath);
		},
	};
}
