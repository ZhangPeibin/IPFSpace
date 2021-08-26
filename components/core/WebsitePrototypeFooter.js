/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import * as React from "react";
import * as Constants from "/common/constants";

const STYLES_CONTAINER = css`
  position: -webkit-sticky;
  position: sticky;
  padding: 24px 0px;
  z-index: ${Constants.zindex.header};
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvlN1};
  display: block;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding-left: 48px;
  padding-right: 48px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    padding: 8px 24px;
  }
`;


const OFFERS_DIV_PARENT = css`
  position: relative;
  margin: 0px auto;
  display: flex;
  width: 100%;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.index_font_color};
  text-decoration: none;
  transition: 200ms ease color;
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  text-align: left;
  color: ${Constants.system.index_font_color};
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: flex-start;
  }
`;


const OFFERS_DIV = css`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-wrap: break-word;
  width: 100%;
  margin-bottom: 6px;
  @media (max-width: ${Constants.sizes.mobile}px) {
  }
`;

export const WebsitePrototypeFooter = (props) => {
    return (
        <div css={STYLES_CONTAINER} style={props.style}>
            <div>
                <h3 css={STYLES_LINK} style={{fontSize: "52px",paddingTop:"2rem"}} className="mb-4 font-medium">
                    How contact us
                </h3>
            </div>
            <div css={OFFERS_DIV_PARENT}>
                <div
                    css={OFFERS_DIV}>
                    <a css={STYLES_LINK} target={'_blank'} href="https://twitter.com/IPFSpace" style={{fontSize: "20px",fontFamily:"Calibri"}} className="mb-2 mt-4">
                        Twitter：@IPFSpace
                    </a>
                    <a >

                    </a>
                    <a css={STYLES_LINK} target={'_blank'} href="https://t.me/peibin"  style={{fontSize: "20px",fontFamily:"Calibri"}} className="mb-2 mt-4">
                        Telegram:  @peibin
                    </a>
                    <h2  css={STYLES_LINK} style={{fontSize: "20px",fontFamily:"Calibri"}} className="mb-2 mt-4">
                        Email: ipfspace@163.com
                    </h2>
                    <h2  css={STYLES_LINK} style={{fontSize: "20px",fontFamily:"Calibri"}} className="mb-2 mt-4">
                        Slack On FileCoin : @IPFSpace
                    </h2>

                    <p css={STYLES_LEFT}  style={{fontSize: "20px",marginTop:"20px",marginBottom:"36px",marfontFamily:"Calibri"}}>
                        Powered by{" "}
                        <a css={STYLES_LINK}  style={{color:"#FF715E",fontSize: "20px",fontFamily:"Calibri"}} href="https://www.anipfs.space">
                            DDshare
                        </a>{" "}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default WebsitePrototypeFooter;
