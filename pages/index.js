/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";
import WebsitePrototypeWrapper from "../components/core/WebsitePrototypeWrapper";
import WebsitePrototypeFooter from "../components/core/WebsitePrototypeFooter";
import * as Constants from "/common/constants";
import {ButtonPrimary} from "../components/widget/Buttons";
import WebsitePrototypeHeader from "../components/core/WebsitePrototypeHeader";
import Landing from "./Landing";
import { withRouter, NextRouter } from 'next/router'
import Image from 'next/image'

const STYLES_ROOT = css`
  padding: 0 88px;
  margin: -88px auto 0 auto;
  width: 100%;
  background-color: ${Constants.system.backgroundColor};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 24px 0 24px;
  }
`;


const STYLES_CONTAINER = css`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const STYLES_SECTION_WRAPPER = css`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  padding: 120px 0;
  display: flex;
  align-items: flex-start;

  @media (max-width: ${Constants.sizes.tablet}px) {
    padding: 88px 0;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 0;
    display: block;
  }
`;

const STYLES_FOOTER_WRAPPER = css`
  max-width: 100%;
  width: 100%;
  height: 100%;
  padding: 16px 0;
  display: flex;
  align-items: flex-start;
  background-color: ${Constants.system.grayLight3};

  @media (max-width: ${Constants.sizes.tablet}px) {
    padding: 88px 0;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 48px 0;
    display: block;
  }
`;

const STYLES_TEXT_BLOCK_CENTER = css`
  display: block;
  margin: 0 auto 80px auto;
  width: 50%;
  text-align: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 48px auto 64px auto;
    width: 100%;
  }
`;

const STYLES_H1 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl4};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.grayDark6};
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_P = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.5;
  margin: 4px 0 0 0;
  color: ${Constants.system.grayDark6};
  width: 64%;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
`;

const STYLES_HIGHLIGHT_BLUE = css`
  color: ${Constants.system.redlight3};
`;


function IndexPage({router}){

    const _signIn = async () => {
        const identity = localStorage.getItem('identity')
        console.log(identity)
        if (identity) {
            await router.replace({pathname: "/dashboard"})
        } else {
            await router.push({pathname:"/user/auth"})
        }
    }
    const title = `IPFSpace`;
    const description =
        "Welcome to the future of file store. Powered by IPFSpace.";
    const url = "https://anipfs.space";

    return (
        <WebsitePrototypeWrapper title={title} description={description} url={url} >
            <div  css={STYLES_ROOT}>
                <div css={STYLES_CONTAINER}>
                    <WebsitePrototypeHeader/>
                    <div css={STYLES_SECTION_WRAPPER} style={{ display: `block` }}>
                        <div css={STYLES_TEXT_BLOCK_CENTER}>
                            <h1 css={STYLES_H1} style={{ width: `100%` }}>
                                IPFSpace is  on  <span css={STYLES_HIGHLIGHT_BLUE}> decentralized storage</span>
                            </h1>
                            <p css={STYLES_P} style={{ width: `100%` }}>
                                A storage platform based on IPFS
                            </p>
                            <p css={STYLES_P} style={{ width: `100%` }}>
                                Use MetaMask, Recovery phrase and Email for security
                            </p>
                            <p css={STYLES_P} style={{ width: `100%` }}>
                                By making data storage easier, reliable, safe and highly scalable
                            </p>
                            <br />
                            <a style={{ textDecoration: `none` }} onClick={_signIn} >
                                <ButtonPrimary>Sign In</ButtonPrimary>
                            </a>
                        </div>
                        <img
                            width={'100%'}
                            height={"100%"}
                            src="https://slate.textile.io/ipfs/bafkreic7x37gplkxgk27yhslecqqyuovhabywcojmdgj2pwua42jnnmdwm"
                            style={{
                                borderRadius: `4px`,
                                width: `100%`,
                                boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`,
                                backgroundSize: `cover`,
                            }}
                        />
                        <Landing/>
                    </div>
                </div>
            </div>
            <div  css={STYLES_FOOTER_WRAPPER} style={{ display: `block` }}>
                <WebsitePrototypeFooter />
            </div>
        </WebsitePrototypeWrapper>
    );
}

export default withRouter(IndexPage)