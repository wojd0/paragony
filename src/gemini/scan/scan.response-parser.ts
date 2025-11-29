import type { Receipt } from '@/shared/types';
import type { ScanResponseSchema } from './gemini/scan.generation-config';

function roundPrice(price: number) {
	return Math.round(price * 100) / 100;
}

export default function scanResponseParser(
	response: ScanResponseSchema,
): Receipt {
	return {
		items: response.items.map((item) => ({
			amount: item.amount,
			name: item.name,
			pricePerUnit: roundPrice(item.pricePerUnit),
			reductionPerUnit: roundPrice(item.reductionPerUnit),
			totalPrice: roundPrice(item.totalPrice),
			selectedFlags: [],
		})),
		metadata: response?.metadata || {},
		total: roundPrice(response.total),
	};
}
