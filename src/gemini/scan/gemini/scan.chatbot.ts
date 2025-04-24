import { FileMetadataResponse, GoogleAIFileManager } from '@google/generative-ai/server';
import { SCAN_GENERATION_CONFIG, ScanResponseSchema } from './scan.generation-config';
import { BaseChatBot } from '@/gemini/base/base.chatbot';
import { SCAN } from './scan.prompts.json';

export class ScanChatbot extends BaseChatBot {
   private fileManager: GoogleAIFileManager;

   constructor() {
      super();
      this.fileManager = new GoogleAIFileManager(this.chatbotApiKey);
   }

   async requestScan(
      filePath: string,
      mimeType: string
   ): Promise<ScanResponseSchema> {
      const file = await this.uploadFile(filePath, mimeType);

      const chatSession = await this.setupChat(SCAN.REQUEST_IMAGE_SCAN, SCAN_GENERATION_CONFIG);
      const result = await chatSession.sendMessage([
         {
            text: ''
         },
         {
            fileData: {
               fileUri: file.uri,
               mimeType: file.mimeType
            }
         }
      ]);

      await this.deleteFile(file);

      return JSON.parse(result.response.text());
   }

   private async uploadFile(path: string, mimeType: string) {
      const uploadResult = await this.fileManager.uploadFile(path, {
         mimeType,
         displayName: path
      });
      const file = uploadResult.file;
      console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
      return file;
   }

   private async deleteFile(file: FileMetadataResponse) {
      await this.fileManager.deleteFile(file.name);
   }
}
