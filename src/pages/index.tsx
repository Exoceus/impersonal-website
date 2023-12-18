import type {HeadFC, PageProps} from "gatsby";
import React from "react";

import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

const IndexPage: React.FC<PageProps> = () => {
    return (
        <div className="page-wrapper">
            {/* <Navbar /> */}
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
        </div>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Jatin Mehta</title>;
