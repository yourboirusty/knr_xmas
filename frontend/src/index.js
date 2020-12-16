import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Box, Ball} from './threeD';
import DrawingCanvas from './DrawingCanvas';
import reportWebVitals from './reportWebVitals';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three'
import './App.css';
import 'react-bootstrap/dist/css/react-bootstrap.js';

const texture = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/back/image.png')

ReactDOM.render(
    <Container>
      <Row>
      <Col>
  {/* <DrawingCanvas/> */}
  test
  </Col>
  <Col>
  {/* <Canvas
   camera={{position: [0, 1, 7], near:2, far:15}}
   style={{height:200,width:200}}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Ball position={[3, 0, 0]} texture = {texture} />
  </Canvas> */}
  test
  </Col>
  </Row>
  </Container>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
