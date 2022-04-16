import React from 'react';
import Reveal from 'react-awesome-reveal';
import {keyframes} from "@emotion/react";

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
const featurebox = () => (
    <div className='row' style={{marginTop:32}}>
        <div className="col-lg-4 col-md-6 mb-3">
            <div className="feature-box f-boxed style-3">
                <div className="text">
                    <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                        <h4 className="col-white">Decentralized Identity Layer</h4>
                    </Reveal>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                        <p className="">You can use <span style={{color: "black"}}>Metamask</span> or <span
                            style={{color: "black"}}>Magic (email)</span> to log in to your personal space,
                            and everyone's space ID is encrypted in the <span
                                style={{color: "black"}}>front-end</span> for production.</p>
                    </Reveal>
                </div>
                <i className="wm icon_wallet"></i>
            </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
            <div className="feature-box f-boxed style-3">
                <div className="text">
                    <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                        <h4 className="col-white">W3DS Protocol Layer </h4>
                    </Reveal>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                        <p className="">After you upload the data to the space, you need to register the <span
                            style={{color: "black"}}>data ISCN</span> and
                            <span style={{color: "black"}}> minting  nft's</span> on <span style={{color: "black"}}>Polygon network</span> with
                            datas.</p>
                    </Reveal>
                </div>
                <i className="wm icon_cloud-upload_alt"></i>
            </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
            <div className="feature-box f-boxed style-3">
                <div className="text">
                    <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                        <h4 className="col-white">Data Trade Layer </h4>
                    </Reveal>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                        <p className="">You can sell your NFT to the marketplace or share your NFT to the SharingPool,
                            so others can buy/view it, You will earn from sharing in the future.</p>
                    </Reveal>
                </div>
                <i className="wm icon_tags_alt"></i>
            </div>
        </div>
    </div>
);
export default featurebox;