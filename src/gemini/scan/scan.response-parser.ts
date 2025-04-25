import { Receipt } from '@/components/scan/result-table/ResultTable';
import { ScanResponseSchema } from './gemini/scan.generation-config';

function roundPrice(price: number) {
   return Math.round(price * 100) / 100;
}

export default function scanResponseParser(
   response: ScanResponseSchema
): Receipt {
   return {
      items: response.items.map((item) => ({
         amount: item.amount,
         name: item.name,
         pricePerUnit: roundPrice(item.pricePerUnit),
         reductionPerUnit: roundPrice(item.reductionPerUnit),
         totalPrice: roundPrice(item.totalPrice),
         selectedFlags: []
      })),
      metadata: Object.entries(response?.metadata || {}).map(
         ([key, value]) => ({
            name: key,
            value: value
         })
      ),
      total: roundPrice(response.total),
      flags: []
   };
}
