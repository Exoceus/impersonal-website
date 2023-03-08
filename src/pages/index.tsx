import React, { useEffect, useRef, useState, Suspense } from 'react'
import type { HeadFC, PageProps } from "gatsby"
import { Html, OrbitControls, useProgress } from '@react-three/drei'

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Experience from "../components/Experience"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

import Shoe from "../models/Shoe"
import Lever_Handle from "../models/Lever_Handle"
import Lever from "../models/Lever"

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

const conversionFactor = 180 / Math.PI;

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}


const IndexPage: React.FC<PageProps> = () => {
  const [shoeRot, setShoeRot] = useState(0.0)

  // const [rotx, setRotx] = useState(0.0)
  // const [roty, setRoty] = useState(0.0)
  // const [rotz, setRotz] = useState(0.0)

  useEffect(() => {
    console.warn("HERE?")
    window.addEventListener('scroll', handleScroll);
    return () => { window.addEventListener('scroll', handleScroll); }

  }, [])

  const handleScroll = (event: any) => {
    const { target } = event;
    const { documentElement, body } = target as Document;
    const { scrollTop: documentElementScrollTop, scrollHeight: documentElementScrollHeight, clientHeight } = documentElement;
    const { scrollTop: bodyScrollTop, scrollHeight: bodyScrollHeight } = body;
    const percent = (documentElementScrollTop || bodyScrollTop) / ((documentElementScrollHeight || bodyScrollHeight) - clientHeight) * 100;
    setShoeRot(roty => (percent / 5) % (2 * Math.PI))
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <h1>WORK IN PROGRESS! Proceed with caution</h1>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      {/* <input type='range' min="0" max={360} value={roty} onChange={e => setRoty(parseFloat(e.target.value))} />
      {roty} */}
      <Canvas style={{ height: "500px", border: " 5px solid red" }}>
        <Suspense fallback={<Loader />}>
          <ambientLight />
          {/* <OrbitControls makeDefault /> */}
          <Lever rotation={[0 * Math.PI / 180, 270 * Math.PI / 180, 0]} scale={0.5} />
        </Suspense>
      </Canvas>

      <Canvas style={{ height: "500px" }}>
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <OrbitControls makeDefault /> */}
        <Suspense fallback={<Loader />}>
          <ambientLight />
          <Shoe position={[0, 0, 0]} rotation={[0, shoeRot, 0.7]} scale={[1, 1, 1]} />
        </Suspense>
      </Canvas>
      <Canvas style={{ height: "500px", border: " 5px solid red" }}>
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <OrbitControls makeDefault /> */}
        <Suspense fallback={<Loader />}>
          <ambientLight />
          {/* <OrbitControls makeDefault /> */}
          <Lever_Handle rotation={[0, 270 * Math.PI / 180, 0.7]} />
        </Suspense>
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
