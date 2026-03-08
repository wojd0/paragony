import os
import json

from google import genai
from google.genai import types


SCAN_GENERATION_CONFIG = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_schema={
        "type": "OBJECT",
        "properties": {
            "items": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "name": {"type": "STRING"},
                        "pricePerUnit": {"type": "NUMBER"},
                        "reductionPerUnit": {"type": "NUMBER"},
                        "amount": {"type": "NUMBER"},
                        "totalPrice": {"type": "NUMBER"},
                    },
                    "required": ["name", "pricePerUnit", "reductionPerUnit", "amount", "totalPrice"],
                },
            },
            "total": {"type": "NUMBER"},
            "metadata": {
                "type": "OBJECT",
                "properties": {
                    "nameAddress": {"type": "STRING"},
                    "dateUtc": {"type": "STRING"},
                    "currency": {"type": "STRING"},
                },
            },
        },
        "required": ["items", "total"],
    },
)


class ScanChatbot:
    def __init__(self):
        self.api_key = os.environ["GEMINI_CHATBOT_API_KEY"]
        self.model_id = os.environ["GEMINI_CHATBOT_MODEL"]
        self.client = genai.Client(api_key=self.api_key)

    async def request_scan(self, file_path: str, mime_type: str) -> dict:
        uploaded_file = self.client.files.upload(
            file=file_path,
            config=types.UploadFileConfig(
                mime_type=mime_type,
                display_name=os.path.basename(file_path),
            ),
        )

        result = self.client.models.generate_content(
            model=self.model_id,
            config=SCAN_GENERATION_CONFIG,
            contents=[
                types.Content(
                    parts=[
                        types.Part(
                            file_data=types.FileData(
                                file_uri=uploaded_file.uri,
                                mime_type=mime_type,
                            )
                        )
                    ]
                )
            ],
        )

        self.client.files.delete(name=uploaded_file.name)

        return json.loads(result.text or "{}")
