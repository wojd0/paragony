import { GenerationConfig, Type } from "@google/genai";

export interface ScanResponseSchema {
	items: {
		name: string;
		pricePerUnit: number;
		reductionPerUnit: number;
		amount: number;
		totalPrice: number;
	}[];
	total: number;
	metadata?: {
		nameAddress?: string;
		dateUtc?: string;
		currency?: string;
	};
}

/**
 * Typed schema of the structured AI response
 */
export const SCAN_GENERATION_CONFIG: GenerationConfig = {
	responseMimeType: "application/json",
	responseSchema: {
		type: Type.OBJECT,
		properties: {
			items: {
				type: Type.ARRAY,
				items: {
					type: Type.OBJECT,
					properties: {
						name: {
							type: Type.STRING,
						},
						pricePerUnit: {
							type: Type.NUMBER,
						},
						reductionPerUnit: {
							type: Type.NUMBER,
						},
						amount: {
							type: Type.NUMBER,
						},
						totalPrice: {
							type: Type.NUMBER,
						},
					},
					required: [
						"name",
						"pricePerUnit",
						"reductionPerUnit",
						"amount",
						"totalPrice",
					],
				},
			},
			total: {
				type: Type.NUMBER,
			},
			currency: {
				type: Type.NUMBER,
			},
			metadata: {
				type: Type.OBJECT,
				properties: {
					nameAddress: {
						type: Type.STRING,
					},
					dateUtc: {
						type: Type.STRING,
					},
					currency: {
						type: Type.NUMBER,
					},
				},
			},
		},
		required: ["items", "total"],
	},
};
