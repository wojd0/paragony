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
}: Receipt & { onReceiptChange: (items: ReceiptItem[]) => void }) {
   function handleFlagsChanged(index: number, flags: string[]) {
      console.log(index, flags);

      const newItems = [...items];
      newItems[index].selectedFlags = flags;
      onReceiptChange(newItems);
   }

   return (
      <div className="overflow-x-auto">
         <table className="table w-full receipt-table">
            <colgroup>
               <col />
               <col className="w-1/12" />
               <col className="w-1/12" />
               <col className="w-1/12" />
               <col className="w-1/12" />
            </colgroup>
            <thead>
               <tr>
                  <th>Name</th>
                  <th className="text-right">Amount</th>
                  <th className="text-right">Price per unit</th>
                  <th className="text-right">Total price</th>
                  <th className="text-center">Flag</th>
               </tr>
            </thead>
            <tbody>
               {items.map((item, index) => (
                  <tr key={index}>
                     <td>{item.name}</td>
                     <td className="text-right">{item.amount}</td>
                     <td className="text-right">{item.price}&nbsp;PLN</td>
                     <td className="text-right">{item.totalPrice || item.price * item.amount}&nbsp;PLN</td>
                     <td className="text-center">
                        <FlagSelector
                           flags={flags}
                           selectedFlags={item.selectedFlags}
                           onFlagsChanged={(changedFlags) =>
                              handleFlagsChanged(index, changedFlags)
                           }
                        />
                     </td>
                  </tr>
               ))}
               <tr className="border-t-2">
                  <td colSpan={2}></td>
                  <td className="text-right">Total</td>
                  <td className="text-right font-bold underline underline-offset-2">
                     {total} PLN
                  </td>
               </tr>
            </tbody>
         </table>
         <AdditionalMetadata metadata={metadata} />
         <div className="h-6"></div>
         <FlagPanel flags={flags} items={items} />
      </div>
   );
}
