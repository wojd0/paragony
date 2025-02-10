import {
   GoogleGenerativeAI,
   GenerationConfig,
   SchemaType,
} from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

const apiKey = process.env.GEMINI_API_KEY || '';

export class GeminiService {
   private genAI: GoogleGenerativeAI;
   private fileManager: GoogleAIFileManager;

   constructor() {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.fileManager = new GoogleAIFileManager(apiKey);
      this.setupChat();
   }

   async requestScanFromGemini() {
      const chatSession = await this.setupChat();
      const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
      console.log(result.response.text());
   }

   async uploadToGemini(path: string, mimeType: string) {
      const uploadResult = await this.fileManager.uploadFile(path, {
         mimeType,
         displayName: path,
      });
      const file = uploadResult.file;
      console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
      return file;
   }

   async setupChat() {
      const model = this.genAI.getGenerativeModel({
         model: 'gemini-2.0-flash-exp',
         systemInstruction:
            'Z załączonego zdjęcia paragonu fiskalnego z polskiego sklepu, restauracji lub innej usługi wyczytaj dane w postaci zadanej struktury. Czytaj paragon linijka po linijce i dokładnie wyciągaj z niego wymagane dane. Jeśli któraś z niewymaganych danych jest trudna do uzyskania, po prostu pomiń ją w wyniku.',
      });

      const generationConfig: GenerationConfig = {
         temperature: 1,
         topP: 0.95,
         topK: 40,
         maxOutputTokens: 8192,
         responseMimeType: 'application/json',
         responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
               items: {
                  type: SchemaType.ARRAY,
                  items: {
                     type: SchemaType.OBJECT,
                     properties: {
                        name: {
                           type: SchemaType.STRING,
                        },
                        price: {
                           type: SchemaType.STRING,
                        },
                        amount: {
                           type: SchemaType.STRING,
                        },
                        totalPrice: {
                           type: SchemaType.STRING,
                        },
                     },
                     required: ['name', 'price', 'amount', 'totalPrice'],
                  },
               },
               total: {
                  type: SchemaType.STRING,
               },
               metadata: {
                  type: SchemaType.ARRAY,
                  properties: {
                     nameAddress: {
                        type: SchemaType.STRING,
                     },
                     dateUtc: {
                        type: SchemaType.STRING,
                     },
                  },
               },
            },
            required: ['items', 'total'],
         },
      };

      return model.startChat({ generationConfig });
   }
}
