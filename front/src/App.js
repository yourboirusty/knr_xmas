import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import DrawingCanvas from './features/canvas/DrawingCanvas';
import { Container } from '@material-ui/core';
import {Scene, Other} from './features/threeD/threeD';
import './App.css';

function App() {
  return (
    <Container className="App">

      <DrawingCanvas/>
      <Scene/>
      <Other/>
    </Container>
  );
}

export default App;
