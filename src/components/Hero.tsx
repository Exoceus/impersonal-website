import React from "react";

export default function Hero() {
    return (
        <div className="hero">
            <div>
                <h1 className="hero-title">
                    Hey, I'm <span>Jatin Mehta</span>
                </h1>
                <h2 className="hero-subtitle">Welcome to my small corner of the internet</h2>
            </div>
            <p>
                If you are just looking for it, here is my <a href="resume.pdf">resume</a>. <br /> <br /> Otherwise,
                what are you waiting for? Start scrolling :)
            </p>
        </div>
    );
}
