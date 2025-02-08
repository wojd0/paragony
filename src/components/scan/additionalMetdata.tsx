export default function AdditionalMetadata({ metadata = [] }: { metadata?: {name: string, value: string}[] }) {
    return (
        <div className="flex flex-col gap-4 text-right mt-12">
            {metadata.map(({ name, value}) => <div className="card">
                {name}<br />
                <span className="font-bold text-xl">{value}</span>
            </div>)}
        </div>
    );
}