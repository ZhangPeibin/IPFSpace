import React, {useEffect, useState} from 'react';
import Reveal from 'react-awesome-reveal';
import {keyframes} from "@emotion/react";
import * as SVGLogo from "../../common/logo";
import {useRouter} from "next/router";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline {
    display: inline-block;
  }
`;

const slidermainparticle = (props) =>{
    const router = useRouter()
    const [isAuthenticated,setIsAuthenticated] = useState(false)

    useEffect(()=>{
        const isAuthenticated = localStorage.getItem('identity')?true:false
        console.log("已登录：",isAuthenticated)
        setIsAuthenticated(isAuthenticated)
    },[])

    const _signIn =  () => {
        if (isAuthenticated) {
            router.replace("/dashboard")
        } else {
            router.push("/user/auth")
        }
    }


    return(
        <div className="container">
            <div className="row align-items-center">
                <div style={{display:'flex',alignItems:"center"}}>
                    <div>
                        <SVGLogo.LogoWhite  />
                    </div>
                    <div  style={{float:"right",width:"100%"}}>
                        <nav className="navbar navbar-expand-xl"  >
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <a className="nav-link" aria-current="page" href="#home">Home</a>
                                    <a className="nav-link" href="#roadmap">Roadmap</a>
                                    <a className="nav-link" href="#faq">Faq</a>
                                    <a className="nav-link" href="#contact">Contact</a>
                                </div>
                                <div className="btn-main" style={{marginLeft:16}}>Sign In</div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="col-md-6">

                    <div className="spacer-single"></div>
                    <div className="spacer-double"></div>
                    <div className="spacer-double"></div>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                        <h1 className="col-white">Storage, Sell or Sharing your  datas.</h1>
                    </Reveal>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={900} triggerOnce>
                        <p className="lead col-white">
                            Unit of data stored on IPFS and Filecoin and minted in the blockchain, proving that a digital asset is unique and can be sold or bought, or can be shared for profit

                        </p>
                    </Reveal>
                    <div className="spacer-10"></div>
                    <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
                        <span onClick={() => window.open("#", "_self")} className="btn-main inline lead">White Paper</span>
                        <div className="mb-sm-30"></div>
                    </Reveal>
                </div>
            </div>
        </div>
    )
}
export default slidermainparticle;