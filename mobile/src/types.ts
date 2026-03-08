export interface ReceiptItem {
  name: string;
  amount: number;
  pricePerUnit: number;
  reductionPerUnit: number;
  totalPrice: number;
  selectedFlags: string[];
}

export interface ReceiptMetadata {
  nameAddress?: string;
  dateUtc?: string;
  currency?: string;
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
