import { GenerationConfig, ResponseSchema, SchemaType } from '@google/generative-ai';

export interface ScanResponseSchema {
   items: {
      name: string;
      price: number;
      amount: number;
      totalPrice: number;
   }[];
   total: number;
   metadata?: {
      nameAddress?: string;
      dateUtc?: string;
   };
}

const RESPONSE_SCHEMA: ResponseSchema = {
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
                  type: SchemaType.NUMBER,
               },
               amount: {
                  type: SchemaType.NUMBER,
               },
               totalPrice: {
                  type: SchemaType.NUMBER,
               },
            },
            required: ['name', 'price', 'amount', 'totalPrice'],
         },
      },
      total: {
         type: SchemaType.NUMBER
      },
      metadata: {
         type: SchemaType.OBJECT,
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
};

/**
 * Configuration for the Gemini model to extract data from a receipt.
 */
export const SCAN_GENERATION_CONFIG: GenerationConfig = {
   temperature: 1,
   topP: 0.95,
   topK: 40,
   maxOutputTokens: 8192,
   responseMimeType: 'application/json',
   responseSchema: RESPONSE_SCHEMA
};
