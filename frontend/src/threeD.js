import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

export function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />

    </mesh>
  )
}

function _delete(obj, prop) {
  if (obj[prop] && ! obj[prop].length) delete obj[prop];
}

export function Ball(props){
  const mesh = useRef()
  const drawing = useRef()
  const texture = props.texture
  console.log(props)
  // let url = process.env.PUBLIC_URL + '/back/image.png' 
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  useFrame(() => {
    mesh.current.rotation.y += 0.01
    drawing.current.rotation.y += 0.01
  })

  return(
    <group>
        <mesh
        {...props}
        ref={drawing}
  scale ={[2.1, 2.1, 2.1]}
  >
    <sphereBufferGeometry />
    <meshPhongMaterial attach="material" transparent map={texture}/>

  </mesh>
  <mesh
    {...props}
    ref={mesh}
    scale ={[2.1, 2.1, 2.1]}
    >
      <sphereBufferGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
    </group>
  )
  }
export function Scene(){
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 3)
camera.position.set(-1, 1.2, 1.5)
camera.lookAt(0, 0, 0)
return(
  <Ball position={[3, 0, 0]} />
)


}

