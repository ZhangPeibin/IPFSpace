/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, {useEffect,useState} from "react";
import WebsitePrototypeWrapper from "../components/core/WebsitePrototypeWrapper";
import * as Constants from "/common/constants";
import {ButtonPrimary} from "../components/widget/Buttons";
import WebsitePrototypeHeader from "../components/core/WebsitePrototypeHeader";
import { useRouter } from 'next/router'
import IndexBg from "../components/widget/Indexbg";
import Landing from "./Landing";
import Footer from "../components/core/Footer";

const STYLES_ROOT = css`
  width: 100%;
  display: flex;
  position:absolute;
  padding-left: 48px;
  padding-right: 48px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 24px 0 24px;
  }
`;

const STYLES_CONTAINER = css`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display:block;
`;

const STYLES_SECTION_WRAPPER = css`
  max-width: 1440px;
  width: 100%;
  display: block;
  margin-top: 180px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 0;
    display: block;
  }
`;

const STYLES_TEXT_BLOCK_CENTER = css`
  display: block;
  margin: 0 auto 80px auto;
  height: 100%;
  text-align: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0px auto 64px auto;
    width: 100%;
  }
`;

const STYLES_H1 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl5};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.index_font_color};
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_P = css`
  font-family: ${Constants.font.semiBold};
  font-weight: 500;
  font-size: ${Constants.typescale.lvl2};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.index_font_color};
  width: 64%;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
`;

const STYLES_HIGHLIGHT_BLUE = css`
  color: ${Constants.system.index_font_color};
`;


function IndexPage(){
    const router = useRouter()
    const whitePager = "https://hub.textile.io/ipfs/bafybeiei6dlmkuvvtahisbjcs7vufqbes6mta7pgoaenvtifvtsqechmu4";

    const _whitePager = () =>{
        window.open(whitePager,"_blank")
    }

    const title = `Decentralized DataSharing Infrastructure`;
    const description =
        "Decentralized DataSharing Infrastructure, Based on IPFS & FileCoin ,Designed to store and share humanity's data";
    const url = "https://www.anipfs.space";

    return (
        <WebsitePrototypeWrapper title={title} description={description} url={url} >
            <div css={STYLES_ROOT}>
                <div css={STYLES_CONTAINER}>
                    <WebsitePrototypeHeader/>
                    <div css={STYLES_SECTION_WRAPPER} style={{ display: `block` }}>
                        <div css={STYLES_TEXT_BLOCK_CENTER}>
                            <h1 css={STYLES_H1} style={{ width: `100%` }}>
                                <span css={STYLES_HIGHLIGHT_BLUE}> Decentralized Data Sharing Infrastructure</span>
                            </h1>
                            <p css={STYLES_P} style={{ width: `100%` }}>
                                Based on IPFS & FileCoin
                            </p>
                            <p css={STYLES_P} style={{ width: `100%` }}>
                                Designed to store and share humanity's data
                            </p>
                            <br />
                            <ButtonPrimary style={{  minWidth:'120px', marginRight: `12px`,background:"#ffffff",color:"#FF715E" }} onClick={_whitePager}>White Pager</ButtonPrimary>
                            {/*<ButtonPrimary  style={{minWidth:'120px', marginLeft: `12px` }} onClick={()=>{router.push('/try')}}>Try it out</ButtonPrimary>*/}
                        </div>
                    </div>
                </div>
            </div>
            <IndexBg/>
            <Landing/>
            <Footer/>
        </WebsitePrototypeWrapper>
    );
}

export default IndexPage