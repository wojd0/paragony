import { Receipt } from '@/components/scan/ResultTable';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { ScanChatbot } from './scan.chatbot';
import scanResponseParser from './scan.response-parser';

export async function scanImage(file: File): Promise<Receipt> {
   const localFile = await saveImageLocally(file);

   const geminiService = new ScanChatbot();
   const result = await geminiService.requestScan(localFile.path, 'image/png');

   await localFile.delete();

   return scanResponseParser(result);
}

async function saveImageLocally(
   file: File,
): Promise<{ path: string; delete: () => Promise<void> }> {
   const destinationDir = path.join(process.cwd(), 'public', 'uploads');
   const destinationPath = path.join(destinationDir, file.name);

   const fileArrayBuffer = await file.arrayBuffer();

   if (!existsSync(destinationPath)) {
      await mkdir(destinationDir, { recursive: true });
   }

   await writeFile(destinationPath, Buffer.from(fileArrayBuffer));

   return {
      path: destinationPath,
      delete: () => {
         return unlink(destinationPath);
      },
   };
}
