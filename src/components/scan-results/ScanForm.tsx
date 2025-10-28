import React, { useRef, useState } from "react";
import FileList from "./FileList";
import FileUpload from "./FileUpload";

export default function ScanForm({
	onFileUploaded,
}: {
	onFileUploaded: (resultFile: File) => void;
}) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileSelectorRef = useRef<HTMLInputElement>(null);

	function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
		}
	}

	function handleFileClear() {
		setSelectedFile(null);
		if (fileSelectorRef.current) {
			fileSelectorRef.current.value = "";
		}
	}

	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (selectedFile) {
			onFileUploaded(selectedFile);
		}
	}

	return (
		<form
			className="flex flex-col items-center justify-center gap-6 py-10 px-4 w-full max-w-2xl mx-auto"
			onSubmit={handleFormSubmit}
		>
			<div className="w-full">
				{selectedFile ? (
					<FileList file={selectedFile} onClear={handleFileClear} />
				) : (
					<FileUpload />
				)}
				<input
					type="file"
					name="scanFileUpload"
					id="scanFileUpload"
					accept="image/*,.pdf"
					onInput={handleFileSelect}
					className="hidden"
					ref={fileSelectorRef}
					aria-label="Select file to scan"
				/>
			</div>

			<button
				type="submit"
				disabled={!selectedFile}
				className={`btn btn-primary btn-lg w-full max-w-xs text-lg font-medium transition-all duration-200 ${selectedFile
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4 pointer-events-none"
					}`}
			>
				Scan Receipt
			</button>
		</form>
	);
}
