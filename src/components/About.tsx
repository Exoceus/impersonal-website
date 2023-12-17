import {Canvas} from "@react-three/fiber";
import React, {Suspense, useState} from "react";
import Loader from "./Loader";

import Lever from "../models/Lever";

export default function About() {
    const [leverPulled, setLeverPulled] = useState(false);
    return (
        <section>
            <h3>About</h3>
            <div className="explorer-section">
                <div style={{height: "100%", display: "flex", justifyContent: "space-between"}}>
                    <div></div>
                    <Canvas className="lever-canvas">
                        <Suspense fallback={<Loader />}>
                            <directionalLight position={[0, 0, 5]} />
                            <ambientLight />
                            <Lever setLeverPulled={setLeverPulled} />
                        </Suspense>
                    </Canvas>
                </div>
                <div>
                    <h1>
                        Making <br />
                        Meaningful
                        <br />
                        Software
                    </h1>
                </div>
            </div>
            {!leverPulled ? (
                <p>Pull the lever down to learn more!</p>
            ) : (
                <>
                    <p>
                        I’m a builder at heart trying to create software people want, creating content about technical
                        topics, and tinkering with hardware.
                    </p>

                    <h4>
                        Making Use<span style={{textDecoration: "line-through"}}>less</span>ful Stuff
                    </h4>
                    <p>
                        I’m a builder at heart trying to create software people enjoy using, creating content about
                        technical topics, and tinkering with hardware.
                    </p>
                    <p>Also I like reading.</p>

                    <h4>Sometimes Always Learning</h4>
                    <p>
                        Currently, I am in second year of studying Computer Science at the University of Waterloo and
                        overall, it has been an amazing experience. Ever since high school, I had aimed to get into
                        UWaterloo and having been in Waterloo, I have gotten to learn so much more about technology and
                        software from a first levels approach.
                    </p>
                    <p>
                        Apart from school, I try to push myself (not always successfully) to learn more about
                        philosophy, music and anything else that seems interesting to me.
                    </p>
                </>
            )}
        </section>
    );
}
