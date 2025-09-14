export function getGeminiEnv(envKey: string): string {
	const env = process.env?.[envKey];
	if (!env) {
		throw new Error(`Missing Gemini env variable (${envKey}`);
	}

	return env;
}
