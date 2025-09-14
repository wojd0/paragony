import { ScanChatbot } from "./gemini/scan.chatbot";
import scanResponseParser from "./scan.response-parser";
import path from "node:path";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import { Receipt } from "@/components/scan-results/result-list/ResultList";

export async function scanImage(file: File): Promise<Receipt> {
	const localFile = await uploadImage(file);

	const geminiService = new ScanChatbot();
	const result = await geminiService.requestScan(localFile.path, "image/png");

	await localFile.delete();

	return scanResponseParser(result);
}

async function uploadImage(
	file: File,
): Promise<{ path: string; delete: () => Promise<void> }> {
	const destinationDirPath = path.join(process.cwd(), "public", "uploads");
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
