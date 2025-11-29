'use client';

import { ArrowUpTrayIcon } from '@heroicons/react/16/solid';
import UploadNote from './UploadNote';

export default function FileUpload() {
	return (
		<label
			htmlFor='scanFileUpload'
			className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-base-300 rounded-lg cursor-pointer bg-base-200 hover:bg-base-300 transition-colors duration-200 p-6 text-center'
		>
			<div className='flex flex-col items-center justify-center pt-5 pb-6'>
				<ArrowUpTrayIcon className='w-12 h-12 mb-3 text-base-content/60' />
				<p className='mb-2 text-lg font-semibold text-base-content'>
					<span className='text-primary'>Upload files</span> or drag and
					drop
				</p>
				<p className='text-sm text-base-content/60'>
					PNG, JPG, PDF (max. 10MB per file)
				</p>
				<div className='mt-2 max-w-md'>
					<UploadNote />
				</div>
			</div>
		</label>
	);
}
