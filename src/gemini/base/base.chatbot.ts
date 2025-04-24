import { GenerationConfig, GoogleGenerativeAI } from '@google/generative-ai';
import { getGeminiEnv } from '@/gemini/base/environmentConfiguration';

export class BaseChatBot {
   protected genAI: GoogleGenerativeAI;
   protected chatbotApiKey: string = getGeminiEnv('GEMINI_CHAT_BOT_API_KEY');
   protected chatbotModelId: string = getGeminiEnv('GEMINI_CHATBOT_MODEL');

   constructor() {
      this.genAI = new GoogleGenerativeAI(this.chatbotApiKey);
   }

   async setupChat(systemInstruction: string, generationConfig: GenerationConfig) {
      const model = this.genAI.getGenerativeModel({
         model: this.chatbotModelId,
         systemInstruction
      });
      return model.startChat({ generationConfig });
   }
}