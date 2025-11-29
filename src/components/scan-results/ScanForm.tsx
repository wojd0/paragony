import type React from 'react';
import { useId, useRef, useState } from 'react';
import FileList from './FileList';
import FileUpload from './FileUpload';

export default function ScanForm({
	onFilesUploaded,
}: {
	onFilesUploaded: (files: File[]) => void;
}) {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const fileSelectorRef = useRef<HTMLInputElement>(null);
	const scanInputId = useId();

	function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files.length > 0) {
			const newFiles = Array.from(event.target.files);

			const renamedFiles = newFiles.map((file) => {
				if (selectedFiles.some((existing) => existing.name === file.name)) {
					return renameFile(file);
				}
				return file;
			});

			setSelectedFiles((prev) => [...prev, ...renamedFiles]);
		}
	}

	function renameFile(file: File): File {
		const existingNames = selectedFiles.map((f) => f.name);
		let counter = 1;
		let newName = getFileNameWithCounter(file.name, counter);

		while (existingNames.includes(newName)) {
			counter++;
			newName = getFileNameWithCounter(file.name, counter);
		}

		return new File([file], newName, { type: file.type });
	}

	function getFileNameWithCounter(fileName: string, counter: number): string {
		const lastDotIndex = fileName.lastIndexOf('.');
		if (lastDotIndex === -1) {
			return `${fileName} (${counter})`;
		}
		const name = fileName.substring(0, lastDotIndex);
		const extension = fileName.substring(lastDotIndex);
		return `${name} (${counter})${extension}`;
	}

	function handleFileRemove(index: number) {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
		if (fileSelectorRef.current) {
			fileSelectorRef.current.value = '';
		}
	}

	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (selectedFiles.length > 0) {
			onFilesUploaded(selectedFiles);
		}
	}

	return (
		<form
			className='flex flex-col items-center justify-center gap-6 py-10 px-4 w-full max-w-2xl mx-auto'
			onSubmit={handleFormSubmit}
		>
			<div className='w-full'>
				{selectedFiles.length > 0 ? (
					<div className='space-y-4'>
						<FileList files={selectedFiles} onRemove={handleFileRemove} />
					</div>
				) : (
					<FileUpload scanInputId={scanInputId} />
				)}
				<input
					type='file'
					name='scanFileUpload'
					id={scanInputId}
					accept='image/*,.pdf'
					multiple
					onInput={handleFileSelect}
					className='hidden'
					ref={fileSelectorRef}
					aria-label='Select files to scan'
				/>
			</div>

			<button
				type='submit'
				disabled={selectedFiles.length === 0}
				className={`btn btn-primary btn-lg w-full max-w-xs text-lg font-medium transition-all duration-200 ${
					selectedFiles.length > 0
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-4 pointer-events-none'
				}`}
			>
				Scan Receipt
			</button>
		</form>
	);
}
