'use client';

import { useState } from 'react';
import ScanForm from '@/components/scan-results/ScanForm';
import ScanResult from '@/components/scan-results/ScanResult';
import type { Receipt } from '@/shared/types';

export default function Scan() {
	const [receipts, setReceipts] = useState<Receipt[]>([]);
	const [receiptImages, setReceiptImages] = useState<File[]>([]);
	const [isScanning, setIsScanning] = useState(false);

	async function handleFilesUploaded(files: File[]) {
		setIsScanning(true);
		setReceiptImages(files);

		const formData = new FormData();
		for (const file of files) {
			formData.append('files', file);
		}

		try {
			const result = await fetch('/api/scan', {
				method: 'POST',
				body: formData,
			});

			const scannedReceipts = await result.json();
			console.log(scannedReceipts);

			setReceipts(scannedReceipts);
		} catch (error) {
			console.error('Error scanning files:', error);
		} finally {
			setIsScanning(false);
		}
	}

	function handleReceiptChange(index: number, updatedReceipt: Receipt) {
		setReceipts((prev) => {
			const newReceipts = [...prev];
			newReceipts[index] = updatedReceipt;
			return newReceipts;
		});
	}

	return (
		<div className='h-full bg-base-100'>
			{isScanning ? (
				<div className='flex items-center justify-center h-screen'>
					<div className='text-center'>
						<div className='loading loading-spinner loading-lg text-primary'></div>
						<p className='mt-4 text-lg'>
							Scanning {receiptImages.length} receipt
							{receiptImages.length !== 1 ? 's' : ''}...
						</p>
					</div>
				</div>
			) : receiptImages.length > 0 && receipts.length > 0 ? (
				<ScanResult
					receiptImages={receiptImages}
					receipts={receipts}
					onReceiptChange={handleReceiptChange}
				/>
			) : (
				<ScanForm onFilesUploaded={handleFilesUploaded} />
			)}
		</div>
	);
}
