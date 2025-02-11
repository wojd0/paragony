import { Receipt } from "@/components/scan/ResultTable";
import { ScanResponseSchema } from "./scan.generation-config";

export default function scanResponseParser(response: ScanResponseSchema): Receipt {
   return {
      items: response.items.map(item => ({
         amount: item.amount,
         name: item.name,
         price: item.price,
         totalPrice: item.totalPrice,
         selectedFlags: []
      })),
      metadata: Object.entries(response?.metadata || {}).map(([key, value]) => ({
         name: key,
         value: value,
      })),
      total: response.total,
      flags: [],
   }
}