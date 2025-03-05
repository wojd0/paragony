import { Receipt } from '@/components/scan/ResultTable';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { ScanChatbot } from './scan.chatbot';
import scanResponseParser from './scan.response-parser';

const mockItems: Receipt = {
   items: [
      {
         amount: 1,
         name: 'Milk',
         price: 2.5,
         totalPrice: 2.5,
         selectedFlags: [],
      },
      {
         amount: 2,
         name: 'Bread',
         price: 1.5,
         totalPrice: 3,
         selectedFlags: [],
      },
      { amount: 1, name: 'Butter', price: 3, totalPrice: 3, selectedFlags: [] },
      {
         amount: 3,
         name: 'Eggs',
         price: 0.5,
         totalPrice: 1.5,
         selectedFlags: [],
      },
      { amount: 1, name: 'Cheese', price: 4, totalPrice: 4, selectedFlags: [] },
   ],
   metadata: [
      { name: 'Store', value: 'Bideronka, ul. Wesoła 12, 12-345 Warszawa' },
   ],
   total: 14,
   flags: [],
};

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
