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
  const [rotx, setrotx] = useState(0)
  const [roty, setroty] = useState(0.0)
  const [rotz, setrotz] = useState(0.7)

  useEffect(() => {
    console.warn("HERE?")
    const interval = setInterval(() => {
      update()
    }, 10);
    window.addEventListener('scroll', handleScroll);
    return () => { clearInterval(interval); window.addEventListener('scroll', handleScroll); }

  }, [])

  const update = () => {
    // setroty(roty => (roty + 0.01) % (2 * Math.PI));
  }

  const handleScroll = (event: any) => {
    const { target } = event;
    const { documentElement, body } = target as Document;
    const { scrollTop: documentElementScrollTop, scrollHeight: documentElementScrollHeight, clientHeight } = documentElement;
    const { scrollTop: bodyScrollTop, scrollHeight: bodyScrollHeight } = body;
    const percent = (documentElementScrollTop || bodyScrollTop) / ((documentElementScrollHeight || bodyScrollHeight) - clientHeight) * 100;
    setroty(roty => (percent / 5) % (2 * Math.PI))
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
      <Canvas style={{ height: "500px" }}>
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <OrbitControls makeDefault /> */}
        <Suspense fallback={<Loader />}>
          <ambientLight />
          <Shoe position={[0, 0, 0]} rotation={[rotx, roty, rotz]} scale={[1, 1, 1]} />
        </Suspense>
      </Canvas>
      <Canvas style={{ height: "500px" }}>
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <OrbitControls makeDefault /> */}
        <Suspense fallback={<Loader />}>
          <ambientLight />
          {/* <OrbitControls makeDefault /> */}
          <Lever_Handle position={[0, 0, 0]} rotation={[rotx, 270 * Math.PI / 180, rotz]} scale={[0.5, 0.5, 0.5]} />
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
