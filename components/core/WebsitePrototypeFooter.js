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
  display: flex;
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

const STYLES_LINK = css`
  color: ${Constants.system.index_font_color};
  text-decoration: none;
  transition: 200ms ease color;

  :hover {
    color: ${Constants.system.blue};
  }
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

export const WebsitePrototypeFooter = (props) => {
    return (
        <div css={STYLES_CONTAINER} style={props.style}>
            <p css={STYLES_LEFT}>
                Powered by{" "}
                <a css={STYLES_LINK} href="https://textile.io">
                    IPFSpace
                </a>{" "}
            </p>
            <div css={STYLES_RIGHT}>
                <a css={STYLES_LINK} href="https://twitter.com/IPFSpace" style={{marginRight: 24}}>
                    Twitter
                </a>
            </div>
        </div>
    );
};

export default WebsitePrototypeFooter;
