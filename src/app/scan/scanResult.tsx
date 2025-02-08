import ResultPanel from "@/components/scan/resultPanel";
import { useMemo, useState } from "react";

export default function ScanResult({ file }: { file: File }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useMemo(() => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    }, [file]);
    
    return (
        <div className="w-full flex p-6">
            {imageUrl && <img src={imageUrl} alt={file?.name} className="w-1/4 rounded-br" />}
            <div className="flex-grow">
                <h2 className="text-4xl font-bold text-center">Scan result</h2>
                <div className="w-2/3 mx-auto mt-10">
                    <ResultPanel />
                </div>
            </div>
        </div>
    );
}