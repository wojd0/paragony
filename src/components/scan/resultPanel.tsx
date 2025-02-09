import AdditionalMetadata, { ReceiptMetdata } from "./AdditionalMetdata";
import FlagPanel from "./FlagPanel";
import FlagSelector from "./FlagSelector";

export interface ReceiptItem {
   name: string;
   amount: number;
   price: number;
   totalPrice: number;
   selectedFlags: string[];
}

export interface Receipt {
   items: ReceiptItem[];
   metadata: ReceiptMetdata[];
   total: number;
   flags: string[];
}

export default function ResultPanel({
   items,
   metadata,
   total,
   flags,
   onReceiptChange,
}: Receipt & { onReceiptChange: (receipt: Receipt) => void }) {
   function handleFlagsSelection(index: number, changedFlags: string[]) {
      const newItems = [...items];
      newItems[index].selectedFlags = changedFlags;
      onReceiptChange({ items: newItems, metadata, total, flags });
   }

   function handleEnabledFlagsChange(enabledFlags: string[]) {
      const newItems = items.map((item) => ({
         ...item,
         selectedFlags: item.selectedFlags.filter((flag) => enabledFlags.includes(flag)),
      }));

      onReceiptChange({ items: newItems, metadata, total, flags: [...enabledFlags] });
   }

   return (
      <div className="">
         <div className="max-w-full overflow-x-auto">
            <table className={`table receipt-table ${flags.length === 0 ? '[&_td:nth-child(1)]:hidden [&_th:nth-child(1)]:hidden [&_col:nth-child(1)]:hidden' : ''}`}>
               <colgroup>
                  <col className="w-1/12" />
                  <col />
                  <col className="w-1/12" />
                  <col className="w-1/12" />
                  <col className="w-1/12" />
               </colgroup>
               <thead>
                  <tr>
                     <th className="text-center">Flag</th>
                     <th>Name</th>
                     <th className="text-right">Amount</th>
                     <th className="text-right">Price per unit</th>
                     <th className="text-right">Total price</th>
                  </tr>
               </thead>
               <tbody>
                  {items.map((item, index) => (
                     <tr key={index}>
                        <td className="text-center">
                           <FlagSelector
                              flags={flags}
                              selectedFlags={item.selectedFlags}
                              onFlagsChanged={(changedFlags) => handleFlagsSelection(index, changedFlags)}
                           />
                        </td>
                        <td>{item.name}</td>
                        <td className="text-right">{item.amount}</td>
                        <td className="text-right">{item.price}&nbsp;PLN</td>
                        <td className="text-right">{item.totalPrice || item.price * item.amount}&nbsp;PLN</td>
                     </tr>
                  ))}
                  <tr className="border-t-2">
                     <td />
                     <td colSpan={2} />
                     <td className="text-right">Total</td>
                     <td className="text-right font-bold underline underline-offset-2">{total} PLN</td>
                  </tr>
               </tbody>
            </table>

         </div>
         <AdditionalMetadata metadata={metadata} />
         <div className="h-6"></div>
         <FlagPanel flags={flags} items={items} onFlagsChange={handleEnabledFlagsChange} />
      </div>
   );
}
