from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import random
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
async def post_image(file: UploadFile = File(...)):
    try:
        name = random.getrandbits(32)
        with Path('static/%x.png' % name).open('wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
    finally:
        file.file.close()


@app.get("/img/")
async def get_image():
    path = Path('static/')
    images = [
        str(img).split('/')[1]
        for img in path.iterdir()
        if '.png' in str(img) and path.is_dir()
        ]
    return {'images': images}
