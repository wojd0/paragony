# Paragony

A receipt scanning and management app using Google Gemini AI. Built with **Expo** (React Native + Web) and **FastAPI** (Python).

## Project Structure

```
paragony/
├── backend/       # FastAPI Python backend
│   ├── main.py
│   ├── gemini_service.py
│   ├── models.py
│   ├── response_parser.py
│   └── requirements.txt
└── mobile/        # Expo (React Native + Web) frontend
    ├── app/       # File-based routes (Expo Router)
    └── src/       # Components, types, utils
```

## Getting Started

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Create a `backend/.env` file:
```
GEMINI_CHATBOT_API_KEY=your_gemini_api_key
GEMINI_CHATBOT_MODEL=models/gemini-flash-lite-latest
```

### 2. Frontend

```bash
cd mobile
npm install
npx expo start
```

- Press **w** for web
- Press **i** for iOS simulator
- Press **a** for Android emulator

## Tech Stack

- **Frontend**: Expo, React Native, Expo Router, NativeWind (Tailwind CSS)
- **Backend**: FastAPI, Google Gemini AI (google-genai)
- **Platforms**: iOS, Android, Web
