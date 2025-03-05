import Image from 'next/image';
import { useState } from 'react';

export default function ImagePreview({
   src,
   alt,
}: {
   src: string;
   alt: string;
}) {
   const [lightboxEnabled, setLightboxEnabled] = useState(false);

   return (
      <>
         <Image
            src={src}
            alt={alt}
            className="object-contain max-h-screen md:h-fit"
            fill
            onClick={() => setLightboxEnabled(true)}
         />

         {lightboxEnabled && (
            <div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
               onClick={() => setLightboxEnabled(false)}
            >
               <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain max-h-screen md:h-fit"
               />
            </div>
         )}
      </>
   );
}
