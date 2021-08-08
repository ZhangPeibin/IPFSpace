import * as React from "react";
import * as Constants from "/common/constants";
import {css} from "@emotion/react";
import {useEffect, useState} from "react";

const STYLES_CONTAINER = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 32px 0px;
  width: 100%;
  margin: 0 auto;
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 12px 24px;
  }
`;


const STYLES_LINK = css`
  color: ${Constants.system.index_font_color};
  text-decoration: none;
  transition: 200ms ease color;
  display: flex;
  align-items: center;
  height: 100%;
  font-family: ${Constants.font.text};
  font-weight: 600;
  font-size: ${Constants.typescale.lvl1};

  :hover {
    color: ${Constants.system.redlight3};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  height: 24px;
  height: 100%;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: left;
`;



const WebsitePrototypeHeader = (props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", handleOpen);
        return () => window.removeEventListener("resize", handleOpen);
    });

    const handleOpen = () => {
        setOpen(false);
    };

    const signInURL = "/user/auth";
    return (
        <div css={STYLES_CONTAINER} style={props.style}>
            <div css={STYLES_LEFT}>
                <a css={STYLES_LINK} href="/" style={{marginRight: 16, position: "relative", top: "1px"}}>
                    IPFSpace
                </a>
            </div>
            {<div css={STYLES_RIGHT}>
                <a css={STYLES_LINK} href={signInURL}>
                    Sign In
                </a>
            </div>}

        </div>
    );
};

export default WebsitePrototypeHeader;
