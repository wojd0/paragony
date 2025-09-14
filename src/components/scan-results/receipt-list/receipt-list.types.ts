import { ReceiptMetadata } from "../AdditionalMetadata";

export interface ReceiptItem {
	name: string;
	amount: number;
	pricePerUnit: number;
	reductionPerUnit: number;
	totalPrice: number;
	selectedFlags: string[];
}

export interface Receipt {
	items: ReceiptItem[];
	metadata: ReceiptMetadata;
	total: number;
}
