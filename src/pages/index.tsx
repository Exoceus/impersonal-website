import React, { useRef, useState } from 'react'
import type { HeadFC, PageProps } from "gatsby"
import { Gltf, OrbitControls } from '@react-three/drei'

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Experience from "../components/Experience"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'

function Box(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}



const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <h1>WORK IN PROGRESS! Proceex with caution</h1>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls makeDefault />
        <Gltf src="models/Shoe.glb" receiveShadow castShadow />
      </Canvas>
      <div className="inner-wrapper">
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>
    </div >
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Jatin Mehta's Lair</title>
