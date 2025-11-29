export type ReceiptMetadata = Record<string, string>;

export default function AdditionalMetadata({
	metadata = {},
}: {
	metadata: ReceiptMetadata;
}) {
	return (
		<div className='flex flex-col gap-4 text-right mt-12'>
			{Object.entries(metadata).map(([name, value]) => (
				<div className='card' key={name}>
					{name}
					<br />
					<span className='font-bold text-xl'>{value}</span>
				</div>
			))}
		</div>
	);
}
