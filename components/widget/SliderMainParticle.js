/** @jsx jsx */
import {jsx, css} from "@emotion/react";
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


const BANNER_BTN = css`
  padding-left: 32px;
  padding-right: 32px;
  background: linear-gradient(-90deg, #5352FC 0%, #6BA2FF 100%);
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 52px;
  font-family:"Times New Roman";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%)
`;

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
const website = "https://www.istorage.one/"
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

    const backToWebSite = async ()=>{
        window.open(website,"_blank")
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
            <div style={{display:'flex',alignItems:"center"}}>
                <div style={{float:"left",width:200,zIndex:1000,alignItems:"center"}}>
                    <button  onClick={() => backToWebSite()}  className="col-white"
                             style={{fontSize:64,paddingTop:136,fontWeight:500}}>IStorage</button>
                </div>
            </div>
            <div className="row align-items-center" >
                <div className="col-md-8 align-items-center"  style={{paddingTop:100}}>
                    <div className="spacer-double"></div>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                        <p style={{fontSize:24,fontWeight:500}} className="col-white">We are in the process of functional development, if you know front-end development and are interested in us, welcome to join our team</p>
                    </Reveal>
                    <div className="spacer-10"></div>

                    <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                        <p className="col-white">If you have any questions or suggestions, We are so glad that you can email us <a style={{textDecoration:"underline"}} href="https://www.istorage.one/#contact" target={"_blank"}><p className="col-white">Click here to contact Us</p></a></p>
                    </Reveal>
                    <div className="spacer-10"></div>
                    <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
                        <span  style={{  background:"linear-gradient(-90deg, #5352FC 0%, #6BA2FF 100%)"}} onClick={() => _signIn()} className="btn-main inline lead">Sign In</span>
                        <div className="mb-sm-30"></div>
                    </Reveal>
                </div>
            </div>
        </div>
    )
}
export default withRouter(slidermainparticle);
