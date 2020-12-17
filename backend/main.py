from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import random
from pathlib import Path
from pydantic import BaseModel
import shutil
import os

app = FastAPI()
origins = [
    "*",
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

 
class Image(BaseModel):
    color: str = '0xFF0000'
    file: UploadFile = File(...)


@app.get("/")
async def root():
    return {"message": "Hello"}


@app.post("/img/")
async def post_image(file: UploadFile = File(...)):
    try:
        color = file.filename.split('.')[0]
        name = "c%s_%x.png" % (color, random.getrandbits(32))
        with Path('static/' + name).open('wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {'image': name}
    finally:
        file.file.close()


@app.post('/img/{img_url}')
async def post_detail_image(img_url, file: UploadFile = File(...)):
    try:
        color = file.filename.split('.')[0].replace('#', '0x')
        name = "c%s_%x.png" % (color, random.getrandbits(32))
        with Path('static/' + name).open('wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
        try:
            os.remove(Path('static/' + img_url))
        except FileNotFoundError:
            pass
        return {'image': name,}
    finally:
        file.file.close()


@app.get("/img/")
async def get_image():
    path = Path('static/')
    images = [
        {
            'file': str(img).split('/')[1],
            'color': str(img).split('/')[1].split('_')[0][1:]
        }
        for img in path.iterdir()
        if '.png' in str(img) and path.is_dir()
        ]
    return {'images': images}
