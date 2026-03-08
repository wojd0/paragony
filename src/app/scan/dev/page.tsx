'use client';

import { useEffect, useState } from 'react';
import ScanResult from '@/components/scan-results/ScanResult';
import type { Receipt } from '@/shared/types';
import { mockData } from './mock-scan';

export default function ScanDevPage() {
	const [receipts, setReceipts] = useState<Receipt[]>(mockData);
	const [receiptImages, setReceiptImages] = useState<File[]>([]);

	useEffect(() => {
		async function fetchImage() {
			const response = await fetch('/file.svg');
			const blob = await response.blob();
			const file = new File([blob], 'file.svg', { type: 'image/svg+xml' });
			setReceiptImages([file]);
		}

		fetchImage();
	}, []);

	function handleReceiptChange(index: number, updatedReceipt: Receipt) {
		setReceipts((prev) => {
			const newReceipts = [...prev];
			newReceipts[index] = updatedReceipt;
			return newReceipts;
		});
	}

	return (
		<div className='p-4 md:p-12'>
			<ScanResult
				receipts={receipts}
				receiptImages={receiptImages}
				onReceiptChange={handleReceiptChange}
			/>
		</div>
	);
}
