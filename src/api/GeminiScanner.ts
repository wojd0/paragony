import { Receipt } from '@/components/scan/ResultTable';
import { GeminiService } from './GeminiService';

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
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(mockItems);
      }, 2000);
   });
}

async function run() {
   const geminiService = new GeminiService();
   const files = [await geminiService.uploadToGemini('026688_r0_620.jpg', 'image/jpeg')];
   await geminiService.requestScanFromGemini();
}

run();
