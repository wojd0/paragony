import {
   GoogleGenerativeAI,
   GenerationConfig,
   SchemaType,
} from '@google/generative-ai';
import {
   FileMetadataResponse,
   GoogleAIFileManager,
} from '@google/generative-ai/server';
import { SCAN_GENERATION_CONFIG, ScanResponseSchema } from './scan.generation-config';

const apiKey = process.env.GEMINI_API_KEY || '';

export class ScanChatbot {
   private genAI: GoogleGenerativeAI;
   private fileManager: GoogleAIFileManager;

   constructor() {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.fileManager = new GoogleAIFileManager(apiKey);
      this.setupChat();
   }

   async requestScan(filePath: string, mimeType: string): Promise<ScanResponseSchema> {
      const file = await this.uploadFile(filePath, mimeType);

      const chatSession = await this.setupChat();
      const result = await chatSession.sendMessage([
         {
            text: '',
         },
         {
            fileData: {
               fileUri: file.uri,
               mimeType: file.mimeType,
            },
         },
      ]);

      await this.deleteFile(file);

      const parsedResult = JSON.parse(result.response.text());

      return parsedResult;
   }

   private async uploadFile(path: string, mimeType: string) {
      const uploadResult = await this.fileManager.uploadFile(path, {
         mimeType,
         displayName: path,
      });
      const file = uploadResult.file;
      console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
      return file;
   }

   private async deleteFile(file: FileMetadataResponse) {
      await this.fileManager.deleteFile(file.name);
   }

   private async setupChat() {
      const model = this.genAI.getGenerativeModel({
         model: 'gemini-2.0-flash-exp',
         systemInstruction:
            'Z załączonego zdjęcia paragonu fiskalnego z polskiego sklepu, restauracji lub innej usługi wyczytaj dane w postaci zadanej struktury. Czytaj paragon linijka po linijce i dokładnie wyciągaj z niego wymagane dane. Jeśli któraś z niewymaganych danych jest trudna do uzyskania, po prostu pomiń ją w wyniku.',
      });

      return model.startChat({ generationConfig: SCAN_GENERATION_CONFIG });
   }
}
