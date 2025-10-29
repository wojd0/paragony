import { scanImages } from '@/gemini/scan/scan.api';

export async function POST(request: Request): Promise<Response> {
   const formData = await request.formData();

   const files = formData.getAll('files') as File[];

   if (files.length === 0) {
      return new Response('No files provided', { status: 400 });
   }

   const results = await scanImages(files);

   return new Response(JSON.stringify(results));
}
