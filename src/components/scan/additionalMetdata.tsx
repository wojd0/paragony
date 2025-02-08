export interface ReceiptMetdata {
    name: string;
    value: string;
}

export default function AdditionalMetadata({ metadata = [] }: { metadata: ReceiptMetdata[] }) {
  return (
    <div className="flex flex-col gap-4 text-right mt-12">
      {metadata.map(({ name, value }, index) => (
        <div className="card" key={index}>
          {name}
          <br />
          <span className="font-bold text-xl">{value}</span>
        </div>
      ))}
    </div>
  );
}
