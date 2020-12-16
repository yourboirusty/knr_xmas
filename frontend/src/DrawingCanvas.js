import React, { Component } from "react";
import api from "./Axios";

import CanvasDraw from "react-canvas-draw";;

export default class DrawingCanvas extends Component{
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    dataImg: null,
    text: ""
  };
  componentDidMount() {
    api.get("")
    .then(response =>{
        this.setState({
            text: response.message
        });
    });
    // let's change the color randomly every 2 seconds. fun!
    window.setInterval(() => {
        this.setState({
            color: "#" + Math.floor(Math.random() * 16777215).toString(16)
        });
        }, 2000);
  }
  render() {
    return (
      <div>
        <div>
          <button
            onClick={() => {
              this.saveableCanvas.canvasContainer.children[1].toBlob(blob => {
                const formData = new FormData();
                formData.append('file', blob, 'test.png');
                api.post('img/', formData);
            }
              )
        }
    }
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
        </div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
        />
      </div>
    );
  }
};