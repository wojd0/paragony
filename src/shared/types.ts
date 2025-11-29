import type { ReceiptMetadata } from '@/components/scan-results/AdditionalMetadata';

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
export interface Flag {
	id: string;
	color: string;
	order: number;
}
