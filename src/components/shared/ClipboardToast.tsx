import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

export default function ClipboardToast({ visible }: { visible?: boolean }) {
	return (
		<div
			className={`toast ${visible ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
		>
			<div className="alert alert-info">
				<ClipboardDocumentCheckIcon className="w-6 h-6" />
				<span>Copied to clipboard</span>
			</div>
		</div>
	);
}
