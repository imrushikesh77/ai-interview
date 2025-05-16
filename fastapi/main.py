# from fastapi import FastAPI, HTTPException, Request
# from fastapi.responses import JSONResponse
# import whisper
# import os

# app = FastAPI()

# # Load Whisper model (you can change this to "small", "medium", etc.)
# model = whisper.load_model("base")

# # Directory where uploaded files are stored
# UPLOAD_DIR = "uploads"

# @app.post("/transcribe")
# async def transcribe_from_filename(request: Request):
#     try:
#         data = await request.json()
#         filename = data.get("filename")

#         if not filename:
#             raise HTTPException(status_code=400, detail="Filename is required.")

#         file_path = os.path.join(UPLOAD_DIR, filename)

#         if not os.path.isfile(file_path):
#             raise HTTPException(status_code=404, detail="File not found.")

#         # Transcribe the audio file
#         result = model.transcribe(file_path)
#         return {"transcription": result["text"]}

#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import whisper
import os
import traceback

app = FastAPI()

# Load Whisper model (can be "tiny", "base", "small", "medium", "large")
model = whisper.load_model("base")

# Adjusted path to match your structure
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # points to app/
UPLOAD_DIR = os.path.join(BASE_DIR, "backend", "uploads", "voices")

@app.post("/transcribe")
async def transcribe_from_filename(request: Request):
    try:
        data = await request.json()
        filename = data.get("filename")

        if not filename:
            raise HTTPException(status_code=400, detail="Filename is required.")

        file_path = os.path.join(UPLOAD_DIR, filename)

        if not os.path.isfile(file_path):
            raise HTTPException(status_code=404, detail=f"File '{filename}' not found.")

        result = model.transcribe(file_path)
        return {"transcription": result["text"]}

    except Exception as e:
        print("🔥 Server Error:")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})