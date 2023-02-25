import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import Navbar from "../components/navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Experience from "../components/Experience"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
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

export const Head: HeadFC = () => <title>Home Page</title>
