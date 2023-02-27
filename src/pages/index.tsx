import React, { useEffect, useRef, useState } from 'react'
import type { HeadFC, PageProps } from "gatsby"
import { Gltf, OrbitControls } from '@react-three/drei'

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Experience from "../components/Experience"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

import Shoe from "../models/Shoe"

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
      <h1>WORK IN PROGRESS! Proceex with caution</h1>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <Canvas style={{ height: "500px" }}>
        <ambientLight />
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <OrbitControls makeDefault /> */}
        <Shoe position={[0, 0, 0]} rotation={[rotx, roty, rotz]} scale={[1, 1, 1]} />
      </Canvas>
      {/* <input type="range" min="0" max="360" value={Number(rotx) * conversionFactor} onChange={e => setrotx(Number(e.target.value) / conversionFactor)} /> */}
      {/* <input type="range" min="0" max="360" value={Number(roty) * conversionFactor} onChange={e => setroty(Number(e.target.value) / conversionFactor)} /> */}
      {/* <input type="range" min="0" max="360" value={Number(rotz) * conversionFactor} onChange={e => setrotz(Number(e.target.value) / conversionFactor)} /> */}

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
