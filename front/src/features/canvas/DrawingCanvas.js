import React, { useEffect, useState } from "react";
import api from "../../app/axios";
import CanvasDraw from "react-canvas-draw";
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import {selectColor, setColor} from '../threeD/ornamentSlice';
import { Button, Grid, Container } from '@material-ui/core';

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
    const [color, setDrawColor] = useState("#FF0000")
    let saveableCanvas = React.createRef();
    const imageData = useSelector(selectImageData);
    const imageUrl = useSelector(selectImageUrl);
    const dispatch = useDispatch();
    useEffect(() =>{
    if (cookies.img_url) {
      dispatch(setUrl(cookies.img_url))
    }
    if (cookies.bombka_color){
      dispatch(setColor(cookies.bombka_color))
    }
  })

    function saveImg(){
      saveableCanvas.canvasContainer.children[1].toBlob(blob => {
        const formData = new FormData();
        formData.append('file', blob, 'test.png');
        if (imageUrl){
          url = 'img/'+imageUrl
        }
        api.post(url, formData).then( response => {
          setCookie('img_url', response.data.image, { path: '/' });
          dispatch(setUrl(response.data.image));
        }
        );}
          )
      };
    function saveChanges(){
      dispatch(setImg(saveableCanvas.canvasContainer.children[1].toDataURL()));
    };
    function setBombkaColor(color){
      dispatch(setColor(color));
    }
    return (
      <Grid container spacing={5}>
        <Grid item xs={12} >
          <Button
            onClick={saveImg}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              saveableCanvas.clear();
              saveChanges()
            }}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              saveableCanvas.undo();
              saveChanges()
            }}
          >
            Undo
          </Button>
          <Button
            onClick={() => {
              setRadius(24)
            }}
          >
            Bigger
          </Button>
          <Button
            onClick={() => {
              setRadius(12)
            }}
          >
            Normal
          </Button>
          <Button
            onClick={() => {
              setRadius(6)
            }}
          >
            Smol
          </Button>

        </Grid>
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
          defaultValue="Drawing color"
          onChange={color => setDrawColor(color)}
          />    
          <ColorPicker
          name='bombka_color'
          defaultValue="Bombka color"
          onChange={bombka_color => setBombkaColor(bombka_color)}
          />    
      </Grid>
    );
  }