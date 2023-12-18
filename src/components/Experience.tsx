import {Canvas} from "@react-three/fiber";
import React, {Suspense, useEffect, useState} from "react";

import Loader from "./Loader";

import AV21 from "../models/AV21";
import Shoe from "../models/Shoe";

export default function Experience() {
    const [movementSpeed, setMovementSpeed] = useState<number>(6);
    const [shoeRot, setShoeRot] = useState(0.0);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = (event: any) => {
        const {target} = event;
        const {documentElement, body} = target as Document;
        const {
            scrollTop: documentElementScrollTop,
            scrollHeight: documentElementScrollHeight,
            clientHeight,
        } = documentElement;
        const {scrollTop: bodyScrollTop, scrollHeight: bodyScrollHeight} = body;
        const percent =
            ((documentElementScrollTop || bodyScrollTop) /
                ((documentElementScrollHeight || bodyScrollHeight) - clientHeight)) *
            100;
        setShoeRot(() => (percent / 5) % (2 * Math.PI));
    };

    const renderCarContent = () => {
        if (movementSpeed * 10 < 100) {
            return <p>Accelerate the car to learn more!</p>;
        } else if (movementSpeed * 10 < 200) {
            return (
                <>
                    <p>
                        I'm a part of Simulation and Infrastructure team that aims to optimize the developer experience
                        of the other subteams (Perception, Controls, etc.) by maintaining and updating the tech stack
                        (Docker, ROS2, Asseto Corsa, LGSVL).
                    </p>
                    <p>Accelerate the car to learn more!</p>
                </>
            );
        } else {
            return (
                <>
                    <p>
                        I'm a part of Simulation and Infrastructure team that aims to optimize the developer experience
                        of the other subteams (Perception, Controls, etc.) by maintaining and updating the tech stack
                        (Docker, ROS2, Asseto Corsa, LGSVL).
                    </p>
                    <p>
                        I got to travel to Monza, Italy (track of the F1 Italian Grand Prix, Ferrari home track) for a
                        month as a part of the "boots on the group" crew which conducts on-track testing
                    </p>
                </>
            );
        }
    };

    return (
        <div>
            <h3>Experience</h3>

            <div style={{minHeight: "300px"}}>
                <h4>autonomous race car</h4>
                <div style={{height: "200px"}}>
                    <Canvas flat>
                        <ambientLight />
                        <directionalLight position={[1, 0, 0]} />
                        <directionalLight position={[-1, 0, 0]} />
                        <AV21
                            isMoving={true}
                            scale={1}
                            movementSpeed={movementSpeed}
                            rotation={[(0 * Math.PI) / 180, (270 * Math.PI) / 180, (0 * Math.PI) / 180]}
                            position={[0, -1.5, 0]}
                        />
                    </Canvas>
                </div>

                <center>
                    Speed:
                    <input
                        type="range"
                        min="1"
                        max="20"
                        step={"1"}
                        value={String(movementSpeed)}
                        onChange={(e) => setMovementSpeed(parseInt(e.target.value))}
                    />
                    {String(movementSpeed * 10) + " mph"}
                </center>
            </div>
            <p>
                MIT Driverless is a student club collaboration between MIT, Pitsburgh, Rochester and Waterloo that
                competes in the Indy Autonomous Challenge (Las Vegas, Indiannapolis, Monza in Italy).
            </p>
            {renderCarContent()}

            <h4>web3 gaming</h4>
            <p>
                Cradle is an early stage crypto-gaming that I joined as the 8th employee as a full stack engineer where
                it grew from 0 to over 10k users. I have worked 2 co-op terms and part time over the span of 1.5 years
                at the company.
            </p>
            <p>
                Some cool accomplishments were:
                <ul>
                    <li>
                        Designing and developing security architecture using SSS to allow multi-device logins without
                        storing private keys.
                    </li>
                    <li>
                        Worked as the primary developer on a Flask API that serves all company products and was used for
                        a demo for a $4M Series A.
                    </li>
                </ul>
            </p>

            <h4>virtual shoe try-on</h4>
            <Canvas style={{height: "250px"}}>
                <Suspense fallback={<Loader />}>
                    <pointLight position={[-2, -2, 0]} />
                    <ambientLight />
                    <Shoe position={[0, -0.25, 0]} rotation={[0, shoeRot + 0.5, 0.5]} scale={[1.1, 1.1, 1.1]} />
                </Suspense>
            </Canvas>
            <p>
                I worked on experimental AR features to create an interactive online shopping experience during the
                pandemic for the e-commerce company Zappos (subsidiary of Amazon). I also was a part of the Machine
                Intelligence team worked on implementing image segmentation models for foot recognition. It was mind
                boggling watching my work be deployed into the Zappos mobile app beta used by millions of people.
            </p>
            <p>The internship structure was very unique and allowed for rapid experimentation!</p>

            <h4>other</h4>
            <p>
                Currently, I'm at Geotab, a global leader in telematics. They create a device that plugs into vehicles
                and can be used to gather key data about the vehicle to make more optimized decisions. I'm working as a
                Software Developer under the Data and Analytics department. This is my first co-op in a mid-sized
                company and I am learning more about cloud technologies, containerization, orchestration, E2E testing
                and Java.
            </p>
            <p>
                In the summer of 2021, I did an internship at RBC under the Summer Tech Labs program. During those 8
                weeks, I sharpened my full-stack web development skills and become more familiar with the Agile
                methodology.
            </p>
        </div>
    );
}
