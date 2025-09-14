import { scanImage } from "@/gemini/scan/scan.api";

export async function POST(request: Request): Promise<Response> {
	const formData = await request.formData();

	if (!formData.has("file")) {
		return new Response("No file provided", { status: 400 });
	}

	const file = formData.get("file") as File;

	if (!file) {
		return new Response("No file provided", { status: 400 });
	}

	return new Response(JSON.stringify(await scanImage(file)));
}
