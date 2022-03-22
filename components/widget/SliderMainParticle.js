import React, { useState} from 'react';
import Reveal from 'react-awesome-reveal';
import {keyframes} from "@emotion/react";
import * as SVGLogo from "../../common/logo";
import Login from "../core/Login";

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
const whitePager = "https://hub.textile.io/ipfs/bafybeiei6dlmkuvvtahisbjcs7vufqbes6mta7pgoaenvtifvtsqechmu4";

const slidermainparticle = (props) =>{
    const [showLogin,setShowLogin] = useState(false)

    const _signIn =  () => {
        setShowLogin(true);
    }

    const whitePaper=()=>{

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
                                    <a  onClick={()=>{ setShowLogin(false)}} className="nav-link" aria-current="page" href="#home">Home</a>
                                    <a onClick={()=>{ setShowLogin(false)}}  className="nav-link" href="#roadmap">Roadmap</a>
                                    <a onClick={()=>{ setShowLogin(false)}}  className="nav-link" href="#faq">Faq</a>
                                    <a onClick={()=>{ setShowLogin(false)}} className="nav-link" href="#contact">Contact</a>
                                </div>
                                <div onClick={()=>_signIn()} className="btn-main" style={{marginLeft:16}}>Sign In</div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="col-md-6" style={{marginTop:86}} >
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
                        <span onClick={() => window.open(whitePager, "_blank")} className="btn-main inline lead">White Paper</span>
                        <div className="mb-sm-30"></div>
                    </Reveal>
                    <div className="spacer-single"></div>
                </div>
                {
                    showLogin &&   <div style={{paddingTop:32}} className="col-lg-4 offset-lg-2 wow fadeIn" data-wow-delay=".5s" >
                        <Login />
                    </div>
                }
            </div>
        </div>
    )
}
export default slidermainparticle;