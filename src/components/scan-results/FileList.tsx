"use client";
import { XMarkIcon } from "@heroicons/react/16/solid";
import UploadNote from './UploadNote';

interface FileListProps {
    files: File[];
    onRemove: (index: number) => void;
}

export default function FileList({
    files,
    onRemove,
}: FileListProps) {
    return (
        <div className="flex flex-col gap-2">
            {files.map((file, index) => (
                <div
                    key={`${file.name}-${index}`}
                    className="flex items-center bg-base-200 rounded-lg overflow-hidden border border-base-300"
                >
                    <div className="px-4 py-3 flex-1 min-w-0">
                        <p className="text-base font-medium text-base-content truncate">
                            {file.name}
                        </p>
                        <p className="text-sm text-base-content/70">
                            {Math.round(file.size / 1024)} KB
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="btn btn-ghost text-error rounded-none rounded-r-lg h-full"
                        title="Remove file"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>
            ))}
            <label
                htmlFor="scanFileUpload"
                className="btn btn-outline btn-primary w-full"
            >
                Add More Files
            </label>
            <UploadNote />
        </div>
    );
}

