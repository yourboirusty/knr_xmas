import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import DrawingCanvas from './features/canvas/DrawingCanvas';
import {Scene} from './features/threeD/threeD';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
      <DrawingCanvas/>
      <Scene/>
    </div>
  );
}

export default App;
