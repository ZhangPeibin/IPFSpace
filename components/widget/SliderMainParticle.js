import React, { useState} from 'react';
import Reveal from 'react-awesome-reveal';
import {keyframes} from "@emotion/react";
import {generateMessageForEntropy, hashPersonalMessage} from "../core/web3/signMessage";
import {BigNumber, utils} from "ethers";
import {PrivateKey} from "@textile/hub";
import Web3 from "web3";
import Web3Modal from "web3modal";
import {getChainData} from "../core/web3/network";
import {withRouter} from "next/router";

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
const whitePager = "https://hub.textile.io/ipfs/bafybeifrxtvv3jx27aq5mnhxloqjvt5canq5i24dqdxeb2puycp2hemiu4";

const slidermainparticle = (props) =>{

    function initWeb3(provider) {
        const web3 = new Web3(provider);
        web3.eth.extend({
            methods: [
                {
                    name: "chainId",
                    call: "eth_chainId",
                    outputFormatter: web3.utils.hexToNumber
                }
            ]
        });

        return web3;
    }

    const  getNetwork = () => getChainData(80001).network;

    const _signIn =  async () => {
        const web3Modal = new Web3Modal({
            network: getNetwork(),
            cacheProvider: true,
        });

        const provider = await web3Modal.connect();
        const web3 = initWeb3(provider);
        await switchNetworkMumbai(web3);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        const address = accounts[0];
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.chainId()
        console.log(chainId)
        console.log(networkId)
        const message = generateMessageForEntropy(address, "MultiStorage", "MultiStorage")
        const hasPersonalMessage = hashPersonalMessage(message)
        const signedText = await web3.eth.sign(hasPersonalMessage, address);
        const hash = utils.keccak256(signedText);
        console.log(hash)
        const array = hash
            // @ts-ignore
            .replace('0x', '')
            // @ts-ignore
            .match(/.{2}/g)
            .map((hexNoPrefix) => BigNumber.from('0x' + hexNoPrefix).toNumber())

        if (array.length !== 32) {
            throw new Error('Hash of signature is not the correct size! Something went wrong!');
        }
        const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array))
        localStorage.setItem('seed',JSON.stringify(array));
        // @ts-ignore
        localStorage.setItem("identity", identity.toString())
        await props.router.replace({pathname: "/dashboard"})
    }

    const switchNetworkMumbai = async (web3) => {
        try {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x13881" }],
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await web3.currentProvider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: "0x13881",
                                chainName: "Mumbai",
                                rpcUrls: ["https://rpc-mumbai.matic.today"],
                                nativeCurrency: {
                                    name: "Matic",
                                    symbol: "Matic",
                                    decimals: 18,
                                },
                                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
                            },
                        ],
                    });
                } catch (error) {
                    alert(error.message);
                }
            }
        }
    }


    return(
        <div className="container">
            <div className="row align-items-center" style={{paddingTop:16}}>
                <div style={{display:'flex',alignItems:"center"}}>
                    <div style={{float:"left",width:200,zIndex:1000,alignItems:"center",paddingTop:12}}>
                        <h4 className="col-white" >NeXT Storage </h4>
                    </div>
                    <div  style={{float:"right",width:"100%"}}>
                        <nav className="navbar navbar-expand-xl"  >
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <a  onClick={()=>{ setShowLogin(false)}} className="nav-link" href="#home">Home</a>
                                    <a  onClick={()=>{ setShowLogin(false)}} className="nav-link"  href="#home">How it works</a>
                                    <a  onClick={()=>{ setShowLogin(false)}} className="nav-link" href="#home">What is W3DS</a>
                                    <a onClick={()=>{ setShowLogin(false)}}  className="nav-link" href="#roadmap">Roadmap</a>
                                    <a onClick={()=>{ setShowLogin(false)}}  className="nav-link" href="#faq">Faq</a>
                                    <a onClick={()=>{ setShowLogin(false)}} className="nav-link" href="#contact">Contact</a>
                                </div>
                                <div onClick={()=>_signIn()} className="btn-main" style={{marginLeft:16}}>Sign In</div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="col-md-6"  style={{paddingTop:160}}>
                    <div className="spacer-double"></div>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                        <h2 className="col-white">Build web3 storage aggregation layer, designed to build Data metaverse with the W3DS protocol</h2>
                    </Reveal>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={900} triggerOnce>
                        <p className="lead col-white">

                        </p>
                    </Reveal>
                    <div className="spacer-10"></div>
                    <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
                        <span onClick={() => window.open(whitePager, "_blank")} className="btn-main inline lead">White Paper</span>
                        <div className="mb-sm-30"></div>
                    </Reveal>
                    <div className="spacer-single"></div>
                </div>
                {/*{*/}
                {/*    showLogin &&   <div style={{paddingTop:32,background:"#ffffff"}} className="col-lg-4 offset-lg-2 wow fadeIn" data-wow-delay=".5s" >*/}
                {/*        <Login />*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
        </div>
    )
}
export default withRouter(slidermainparticle);
