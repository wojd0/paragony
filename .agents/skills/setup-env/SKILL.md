---
name: setup-env
description: Creates a .env file for the project with the required Gemini API configuration. Trigger when the user wants to set up environment variables, create a .env file, or configure the project environment.
metadata:
  version: "1.0"
---

# Setup Environment Variables

This skill creates the `.env` file required by the project. The project uses two environment variables for the Gemini chatbot integration, loaded via `getGeminiEnv()` in `src/gemini/environmentConfiguration.ts`.

## Required Variables

| Variable                 | Description                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `GEMINI_CHATBOT_API_KEY` | API key for the Gemini chatbot service. Obtain one from Google AI Studio (https://aistudio.google.com/apikey). |
| `GEMINI_CHATBOT_MODEL`   | The Gemini model to use (e.g. `gemini-2.0-flash`, `gemini-2.5-pro`).                                           |

## Workflow

1. Check if a `.env` file already exists. If it does, show its contents and ask whether to overwrite or keep it.

2. Use the question tool to ask the user for:
   - Their `GEMINI_CHATBOT_API_KEY` value
   - Their preferred `GEMINI_CHATBOT_MODEL` (suggest `gemini-2.0-flash` as default)

3. Write the `.env` file:

```
# Gemini Chatbot Configuration
GEMINI_CHATBOT_API_KEY=<user-provided-value>
GEMINI_CHATBOT_MODEL=<user-provided-value>
```

4. Ensure `.env` is listed in `.gitignore`. If not, ask the user if they want to add it.

## Rules

- NEVER commit the `.env` file to git.
- ALWAYS use the question tool to collect the API key -- never guess or hardcode it.
- Remind the user that `GEMINI_CHATBOT_API_KEY` is a secret and should not be shared or committed.
