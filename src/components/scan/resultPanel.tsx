import { metadata } from "@/app/layout";
import AdditionalMetadata, { ReceiptMetdata } from "./additionalMetdata";

export interface ReceiptItem {
    name: string;
    amount: number;
    price: number;
}

export interface Receipt {
    items: ReceiptItem[];
    metadata: ReceiptMetdata[];
    total: number;
}

export default function ResultPanel({ receipt: { items, metadata, total} }: { receipt: Receipt }) {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full receipt-table">
                <colgroup>
                    <col span={1} className="w-1/2" />
                    <col span={1} className="w-1/12" />
                    <col span={1} className="w-1/12" />
                </colgroup>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="text-right">Amount</th>
                        <th className="text-right">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td className="text-right">{item.amount}</td>
                            <td className="text-right">{item.price} PLN</td>
                        </tr>
                    ))}
                    <tr className="border-t-2">
                        <td></td>
                        <td>Total</td>
                        <td>{total} PLN</td>
                    </tr>
                </tbody>
            </table>
            <AdditionalMetadata metadata={metadata} />
        </div>
    );
}