import React from 'react';
import Particle from '../components/widget/Particle';
import SliderMainParticle from '../components/widget/SliderMainParticle';
import {createGlobalStyle} from 'styled-components';
import {css} from "@emotion/react";
import * as Constants from "../common/constants";
import FeatureBox from '../components/widget/FeatureBox';
import Faq from 'react-faq-component';
import Script from "next/script";

const img = css`
  width: 427px;
  height: 240px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    height: 180px;
  }
`;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }

  header#myHeader.navbar .search #quick_search {
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }

  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a {
    color: #fff;
  }

  header#myHeader .dropdown-toggle::after {
    color: #fff;
  }

  header#myHeader .logo .d-block {
    display: none !important;
  }

  header#myHeader .logo .d-none {
    display: block !important;
  }

  @media only screen and (max-width: 1199px) {
    .navbar {
      background: #403f83;
    }

    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2 {
      background: #fff;
    }

    .item-dropdown .dropdown a {
      color: #fff !important;
    }
  }
`;

const data = {
    rows: [
        {
            title: "How to ensure login security ? ",
            content: "When the user logs in through the wallet or Magic, the previous section will use the keccak_256 method to generate a unique seed from the wallet address or mailbox, and use the ed25519 method provided by textile to obtain the unique secret key. Everything is done on the user side. "
        },
        {
            title: "When is the official launch?",
            content: "We will open Testnet 1.0 after the feature is complete, so stay tuned!"
        },
        {
            title: "Will a DAO be built? ",
            content: "Yes, we will build DAO. We will establish a data audit mechanism, which will take DAO as the core to ensure the quality and standardization of the data market. Of course, there are more DAO functions to promote ecological development."
        }]
}


const homeone = () => {
    return (
        <>
            <Script src="/js/jquery-3.6.0.min.js" />
            <Script src="/js/bootstrap.bundle.min.js" />
            <Script src="/js/all.min.js" />
            <Script src="/js/swiper-bundle.min.js" />
            <Script src="/js/aos.js" />
            <Script src="/js/custom.js" />

            <div>
                <GlobalStyles/>
                <section className="jumbotron no-bg"
                         style={{paddingTop: 32, backgroundImage: `url(${'./img/background/2.jpg'})`}}>
                    <Particle/>
                    <SliderMainParticle/>
                </section>
                <section>
                    <div className='container'>
                        <FeatureBox/>
                    </div>
                </section>
                <section className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='text-center'>
                                <h2>How DDShare Stores</h2>
                                <div className="small-border"></div>
                                <div>
                                    <div>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <div
                                                style={{
                                                    width: "427px",
                                                    marginRight: "24px",
                                                }}>
                                                <img
                                                    css={img}
                                                    alt="..."
                                                    src="/static/ipfs.png"
                                                    className=" align-middle rounded-t-lg"
                                                />

                                                <blockquote className=" p-4 mb-4">
                                                    <a href={"https://ipfs.io/"} target={"_blank"}
                                                       style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                                        IPFS
                                                    </a>
                                                </blockquote>
                                            </div>
                                            <div
                                                style={{
                                                    marginLeft: "24px",
                                                    width: "427px",
                                                }}>
                                                <img
                                                    css={img}
                                                    alt="..."
                                                    src="/static/filecoin.png"
                                                    className="  rounded-t-lg"
                                                />
                                                <blockquote className=" p-4 mb-4">
                                                    <a href={"https://filecoin.io/"} target={"_blank"}
                                                       style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                                        FileCoin
                                                    </a>
                                                </blockquote>
                                            </div>
                                        </div>


                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <div
                                                style={{
                                                    width: "427px",
                                                    marginRight: "24px",
                                                }}>
                                                <img
                                                    css={img}
                                                    alt="..."
                                                    src="/static/nft-storage.png"
                                                    className=" align-middle rounded-t-lg"
                                                />

                                                <blockquote className=" p-4 mb-4">
                                                    <a href={"https://nft.storage/"} target={"_blank"}
                                                       style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                                        NFT.Storage
                                                    </a>
                                                </blockquote>
                                            </div>
                                            <div
                                                style={{
                                                    marginLeft: "12px",
                                                    marginRight: "12px",
                                                    width: "427px",
                                                }}>
                                                <img
                                                    css={img}
                                                    alt="..."
                                                    src="/static/web3-storage-card.png"
                                                    className="  rounded-t-lg"
                                                />
                                                <blockquote className=" p-4 mb-4">
                                                    <a href={"https://web3.storage/"} target={"_blank"}
                                                       style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                                        Web3.storage
                                                    </a>
                                                </blockquote>
                                            </div>

                                            <div
                                                style={{
                                                    marginLeft: "24px",
                                                    width: "427px",
                                                }}>
                                                <img
                                                    css={img}
                                                    alt="..."
                                                    src="/static/textile.png"
                                                    className="  rounded-t-lg"
                                                />
                                                <blockquote className=" p-4 mb-4">
                                                    <a href={"https://www.textile.io"} target={"_blank"}
                                                       style={{fontSize: "22px"}} className=" font-bold text-gray-700">
                                                        Textile.io
                                                    </a>
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>

                <section className='roadmap container-fluid ' id="roadmap">
                    <div>
                        <div className='text-center'>
                            <h2>Growth Roadmap </h2>
                            <div className="small-border"></div>

                            <div className="container">
                                <div className="roadmap__wrapper" data-aos="fade-up" data-aos-duration="1000">
                                    <div className="row justify-content-center g-5">
                                        <div className="col-lg-8">
                                            <div className="roadmap__item">
                                                <div className="roadmap__inner">
                                                    <div className="roadmap__content">
                                                        <h4>1. Testnet 1.0 Launch Initiated</h4>
                                                        <p>We will start the testnet 1.0 test after the main functions are
                                                            completed. All users participating in the test will obtain
                                                            contribution value according to the contribution amount. After
                                                            the test is completed, airdrop will be carried out according to
                                                            the contribution value.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="roadmap__item">
                                                <div className="roadmap__inner">
                                                    <div className="roadmap__content">
                                                        <h4>2. Testnet 2.0 Launch Initiated</h4>
                                                        <p>When the modification of Testnet 1.0 is completed, the top 200
                                                            users of Testnet 1.0 will be invited to test Testnet 2.0.
                                                            Testnet 2.0 will focus on the interaction of core functions.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="roadmap__item">
                                                <div className="roadmap__inner">
                                                    <div className="roadmap__content">
                                                        <h4>3. Mainnet Launch</h4>
                                                        <p>When the testnet is completed, we will choose a time to launch
                                                            the mainnet and issue governance tokens at the same time. The
                                                            airdrops obtained by the testnet can be exchanged for the
                                                            mainnet token at this time.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="roadmap__item">
                                                <div className="roadmap__inner">
                                                    <div className="roadmap__content">
                                                        <h4>4. Data race</h4>
                                                        <p>We will start a data competition and invite major partners to
                                                            provide high-quality and high-demand data as required, and in
                                                            turn enrich the data market. The team that completes the game
                                                            will be rewarded</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="roadmap__item">
                                                <div className="roadmap__inner">
                                                    <div className="roadmap__content">
                                                        <h4>5. Staking </h4>
                                                        <p>When the product is gradually improved, we will enable token
                                                            staking to allow users to have more ways to obtain tokens, and
                                                            in turn increase the liquidity of tokens</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='faq container' id="faq">
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='text-center'>
                                <h2>FAQ</h2>
                                <div className="small-border"></div>
                            </div>
                            <Faq data={data}/>
                        </div>
                    </div>
                </section>

                <section className='contact container-fluid bg-gray ' id="contact">
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='text-center'>
                                <h2>Contact us</h2>
                                <div className="small-border"></div>
                                <footer className="footer bg__gradient">
                                    <div className="footer__wrapper padding-top padding-bottom">
                                        <div className="container">
                                            <div className="footer__content text-center">
                                                <p>We are glad that you can contact us</p>
                                                <ul className="social justify-content-center">
                                                    <li className="social__item">
                                                        <a href="https://twitter.com/IPFSpace" target={'_blank'} className="social__link"><i className="fab fa-twitter"></i></a>
                                                    </li>
                                                    <li className="social__item">
                                                        <a href="#" className="social__link" target={'_blank'}><i className="fab fa-discord"></i></a>
                                                    </li>
                                                    <li className="social__item">
                                                        <a href="https://t.me/peibin" className="social__link" target={'_blank'}><i className="fab fa-twitch"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}
export default homeone;