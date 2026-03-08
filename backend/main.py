import os
import tempfile

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from gemini_service import ScanChatbot
from response_parser import parse_scan_response
from models import Receipt

app = FastAPI(title="Paragony API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/scan", response_model=list[Receipt])
async def scan_receipts(files: list[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")

    results: list[Receipt] = []
    chatbot = ScanChatbot()

    for file in files:
        suffix = os.path.splitext(file.filename or "upload.png")[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        try:
            raw = await chatbot.request_scan(tmp_path, file.content_type or "image/png")
            receipt = parse_scan_response(raw)
            results.append(receipt)
        finally:
            os.unlink(tmp_path)

    return results
