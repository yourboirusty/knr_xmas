import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import {selectImageData,} from '../canvas/imageSlice'
import {selectColor} from './ornamentSlice'
import * as THREE from 'three'
import api from "../../app/axios";
import { Flex, Box } from 'react-three-flex'
import { useSelector } from 'react-redux';

export function Ball(props){

  const mesh = useRef()
  const drawing = useRef()
  const childProps = { ...props };
  const texture = childProps.texture
  const color = childProps.color
  let vel = 0;
  delete childProps.texture
  delete childProps.color
  // let url = process.env.PUBLIC_URL + '/back/image.png' 
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  useFrame(() => {
    if (!vel){
    drawing.current.rotation.y = mesh.current.rotation.y = 1.5*Math.PI;
    vel = 0.005
    }
    if (mesh.current.rotation.y > 1.75*Math.PI){
      vel = -0.005
    }
    else if(mesh.current.rotation.y < 1.25*Math.PI){
      vel = 0.005
    }
    mesh.current.rotation.y = drawing.current.rotation.y += vel;
  })
  return(
    <group>
        <mesh
        {...childProps}
        ref={drawing}
  scale ={[2.11, 2.11, 2.11]}
  >
    <sphereBufferGeometry />
    <meshLambertMaterial attach="material" transparent map={texture}/>
  </mesh>
  <mesh
    {...childProps}
    ref={mesh}
    scale ={[2.1, 2.1, 2.1]}
    >
      <sphereBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
    </group>
  )
  }

export function Scene(){
  let image = useSelector(selectImageData)
  const texture = new THREE.TextureLoader().load(image)
  const color = useSelector(selectColor)
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 3)
camera.position.set(-1, 1.2, 1.5)
camera.lookAt(0, 0, 0)
return(
  <Canvas
  camera={{position: [0, 1, 7], near:2, far:15}}
   style={{height:200,width:200}}>
     <ambientLight />
     <pointLight position={[10, 10, 10]} />
  <Ball position={[3, 0, 0]} texture={texture} color={color}/>
  </Canvas>
)
}

export function Other(){
  const [ornament_list, setList] = useState([])
  let ornaments = [];
  useEffect(()=>{
    api.get('img/')
    .then((response) => {
      response.data.images.map((item)=>{
      ornaments.push(
        {
          texture: new THREE.TextureLoader().load('back/'+item.file),
          color: item.color
        }
      )
    })
    setList(ornaments)
    }
    )
  })
  

return(
  <Canvas
  camera={{position: [0, 1, 7], near:2, far:15}}>
         <ambientLight />
     <pointLight position={[10, 10, 10]} />

  <Flex justifyContent="center" alignItems='center'>
  {ornament_list.map((item, index)=>{
    return <Box key={index}> <Ball texture={item.texture} color={item.color}/> </Box>
 
  })}
  </Flex>
  </Canvas>
)
}

