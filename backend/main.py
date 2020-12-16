from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    return {"message": "Hello"}

@app.post("/img/")
async def get_image(file: UploadFile = File(...)):
    print(file)
    try:
        with Path('static/image.png').open('wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
    finally:
        file.file.close()
