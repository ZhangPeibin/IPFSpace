import Particles from "react-tsparticles";
import React, {useEffect, useState} from "react";

const  IndexBg = (props) =>{
    const [view, setView] = useState(<div style={{background: "#1e1f26"}}/>);
    useEffect(()=>{
        const h = document.documentElement.clientHeight
        setView(
            <Particles
                id="tsparticles"
                height={h}
                options={{
                    background: {
                        color: {
                            value: "#1e1f26",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            push: {
                                quantity: 2,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#03dac6",
                            width:1
                        },
                        links: {
                            color: "#ffffff",
                            distance: 120,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 0.8,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area:600,
                            },
                            value:40,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
        )
    },[])

    return  view
}

export default IndexBg;