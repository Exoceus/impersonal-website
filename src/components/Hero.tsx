import {Canvas} from "@react-three/fiber";
import React, {Suspense, useState} from "react";
import Loader from "./Loader";

import Lever from "../models/Lever";

export default function Hero() {
    const [leverPulled, setLeverPulled] = useState(false);
    return (
        <section>
            <h1>Hey, I'm Jatin Mehta</h1>
            <h3>Welcome to my small corner of the internet.</h3>
            <section className="explorer-section">
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
                    <h2>
                        Making <br />
                        Meaningful
                        <br />
                        Software
                    </h2>
                </div>
            </section>
            {!leverPulled ? (
                <p>Pull the lever down to learn more!</p>
            ) : (
                <p>
                    I’m a builder at heart trying to create software people want, creating content about technical
                    topics, and tinkering with hardware.
                </p>
            )}
        </section>
    );
}
