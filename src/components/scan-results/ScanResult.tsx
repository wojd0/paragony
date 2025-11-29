import { useMemo, useState } from 'react';
import type { Receipt } from '@/shared/types';
import ItemList from './receipt-list/ReceiptList';
import { removeFlagFromItems } from './total-flag/flagSummaryExtractor';
import { useFlagsFromItems } from './total-flag/flagsFromItemMemo';
import TotalFlagPanel from './total-flag/TotalFlagPanel';

export default function ScanResult({
	receiptImages,
	receipts,
	onReceiptChange,
}: {
	receiptImages: File[];
	receipts: Receipt[];
	onReceiptChange: (index: number, receipt: Receipt) => void;
}) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const currentReceipt = receipts[selectedIndex];
	const currentImage = imageUrls[selectedIndex];

	useMemo(() => {
		const urls: string[] = [];
		receiptImages.forEach((image, index) => {
			const reader = new FileReader();
			reader.onload = () => {
				urls[index] = reader.result as string;
				if (urls.filter(Boolean).length === receiptImages.length) {
					setImageUrls([...urls]);
				}
			};
			reader.readAsDataURL(image);
		});
	}, [receiptImages]);

	function handleFlagRemove(flagId: string) {
		onReceiptChange(selectedIndex, {
			...currentReceipt,
			items: removeFlagFromItems(flagId, currentReceipt),
		});
	}

	const calculatedFlags = useFlagsFromItems(currentReceipt?.items);

	return (
		<div className='w-full flex flex-col gap-6 p-4'>
			{receipts.length > 1 && (
				<div className='flex flex-wrap gap-2 justify-center'>
					{receipts.map((_, index) => (
						<button
							type='button'
							key={_.total.toString().concat(index.toString())}
							onClick={() => setSelectedIndex(index)}
							className={`btn ${selectedIndex === index ? 'btn-primary' : 'btn-outline'}`}
						>
							Receipt {index + 1}
						</button>
					))}
				</div>
			)}

			<div className='w-full flex flex-col md:flex-row gap-6'>
				{currentImage && (
					<img
						src={currentImage}
						alt={receiptImages[selectedIndex]?.name}
						className='object-contain max-h-screen w-full md:w-1/2 mx-auto md:h-fit'
					/>
				)}
				<div className='flex-grow'>
					<h2 className='text-4xl font-bold text-center'>
						{receipts.length > 1
							? `Receipt ${selectedIndex + 1} of ${receipts.length}`
							: 'Scan result'}
					</h2>
					<div className='w-full mx-auto mt-10'>
						{currentReceipt && (
							<ItemList
								items={currentReceipt.items}
								metadata={currentReceipt.metadata}
								total={currentReceipt.total}
								onReceiptChange={(receipt) =>
									onReceiptChange(selectedIndex, receipt)
								}
							/>
						)}

						<TotalFlagPanel
							flags={calculatedFlags}
							onFlagRemove={handleFlagRemove}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
