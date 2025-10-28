"use client";

import { ArrowsRightLeftIcon, XMarkIcon } from "@heroicons/react/16/solid";

interface FileListProps {
    file: File;
    onClear: () => void;
}

export default function FileList({
    file,
    onClear,
}: FileListProps) {
    return (
        <div className="flex items-center bg-base-200 rounded-lg overflow-hidden border border-base-300">
            <div className="px-4 py-3 flex-1 min-w-0">
                <p className="text-base font-medium text-base-content truncate">
                    {file.name}
                </p>
                <p className="text-sm text-base-content/70">
                    {Math.round(file.size / 1024)} KB
                </p>
            </div>
            <div className="flex">
                <label
                    htmlFor="scanFileUpload"
                    className="btn btn-ghost rounded-none border-0 border-l border-base-300 h-full"
                    title="Change file"
                >
                    <ArrowsRightLeftIcon className="w-5 h-5" />
                </label>
                <button
                    type="button"
                    onClick={onClear}
                    className="btn btn-ghost text-error rounded-none rounded-r-lg h-full"
                    title="Remove file"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

