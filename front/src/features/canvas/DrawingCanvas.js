import React, { useState } from "react";
import api from "../../app/axios";
import CanvasDraw from "react-canvas-draw";
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUrl,
  setImg,
  selectImageData,
  selectImageUrl
} from './imageSlice';
import ColorPicker from 'material-ui-color-picker';

  export default function DrawingCanvas(props) {
    const [cookies, setCookie] = useCookies(['img_url']);
    let width = 1200;
    let height = 400;
    let url='img/'
    const [radius, setRadius] = useState(12)
    const [color, setColor] = useState("#FF0000")
    let saveableCanvas = React.createRef();
    const imageData = useSelector(selectImageData);
    const imageUrl = useSelector(selectImageUrl);
    const dispatch = useDispatch();
    if (cookies.img_url) {
      dispatch(setUrl(cookies.img_url))
    }

    function saveImg(){
      saveableCanvas.canvasContainer.children[1].toBlob(blob => {
        const formData = new FormData();
        formData.append('file', blob, 'test.png');
        if (imageUrl){
          url = 'img/'+imageUrl
        }
        api.post(url, formData).then( response => {
          setCookie('img_url', response.data.image, { path: '/' });
          console.log(cookies)
          dispatch(setUrl(response.data.image));
        }
        );}
          )
      };
    function saveChanges(){
      let img = new Image();
      img.src = 
        dispatch(setImg(saveableCanvas.canvasContainer.children[1].toDataURL()));
    };
    return (
      <div>
        <div>
          <button
            onClick={saveImg}
          >
            Save
          </button>
          <button
            onClick={() => {
              saveableCanvas.clear();
              saveChanges()
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              saveableCanvas.undo();
              saveChanges()
            }}
          >
            Undo
          </button>
          <button
            onClick={() => {
              setRadius(24)
            }}
          >
            Bigger
          </button>
          <button
            onClick={() => {
              setRadius(12)
            }}
          >
            Normal
          </button>
          <button
            onClick={() => {
              setRadius(6)
            }}
          >
            Smol
          </button>

        </div>
        <CanvasDraw
          onChange={saveChanges}
          ref={canvasDraw => (saveableCanvas = canvasDraw)}
          brushColor={color?color:'red'}
          canvasWidth={width}
          canvasHeight={height}
          brushRadius={radius}

        />
                  <ColorPicker
          name='color'
          defaultValue="#FF0000"
          onChange={color => setColor(color)}
          />
      </div>
    );
  }