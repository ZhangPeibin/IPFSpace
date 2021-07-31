import * as React from "react";
import * as Constants from "/common/constants";
import {css} from "@emotion/react";
import {useEffect, useState} from "react";

const STYLES_CONTAINER = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 72px 0px;
  width: 100%;
  margin: 0 auto;
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  display: flex;
  align-items: center;
  justify-content: space-between;
  // @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
  //   -webkit-backdrop-filter: blur(25px);
  //   backdrop-filter: blur(25px);
  //   background-color: rgba(237, 236, 239, 0);
  // }
  // @media (max-width: ${Constants.sizes.mobile}px) {
  //   padding: 12px 24px;
  // }
`;

const STYLES_LINK = css`
  color: ${Constants.system.black};
  text-decoration: none;
  transition: 200ms ease color;
  display: block;
  display: flex;
  align-items: center;
  height: 100%;
  font-family: ${Constants.font.semiBold};
  font-weight: 500;
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

const STYLES_MOBILENAV = css`
  display: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: flex;
  }
`;

const STYLES_BURGER_BUN = css`
  width: 20px;
  height: 2px;
  background: ${Constants.system.darkGray};
  transition: all 0.2s linear;
  position: relative;
  transform-origin: 1.5px;
  transform: rotate(0);
  transistion-property: transform;

  @media (max-width: ${Constants.sizes.mobile}px) {
    background: ${Constants.system.slate};
  }
`;

const openBurgerBun = {
    transform: `rotate(45deg)`,
};

const STYLES_BURGER_BUN2 = css`
  width: 20px;
  height: 2px;
  background: ${Constants.system.darkGray};
  transition: all 0.2s linear;
  position: relative;
  transform-origin: 1.5px;
  transform: rotate(0);
  transistion-property: transform;

  @media (max-width: ${Constants.sizes.mobile}px) {
    background: ${Constants.system.slate};
  }
`;

const openBurgerBun2 = {
    transform: `rotate(-45deg)`,
};


const STYLES_MENU = css`
  display: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
    flex-direction: column;
    justify-content: center;
    background: ${Constants.system.wall};
    height: 100vh;
    width: 100vw;
    text-align: left;
    padding: 24px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(100%);
    transition: 200ms ease-in-out;
    transition-property: transform, width;
  }
`;

const openMenu = {
    display: `flex`,
    transform: `translateX(0)`,
};

const openNavLink = {
    display: `flex`,
};

const STYLES_NAVLINK = css`
  display: none;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 8px 0;
    color: ${Constants.system.slate};
    text-decoration: none;
    transition: color 0.3s linear;
    transition-property: transform;
    font-family: ${Constants.font.medium};
    font-weight: 400;
    font-size: ${Constants.typescale.lvl2};
    letter-spacing: -0.017rem;
    line-height: 1.3;
    text-align: left;

    :hover {
      color: ${Constants.system.darkGray};
    }
  }
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
            {/*<div css={STYLES_LEFT}>*/}
            {/*    <a css={STYLES_LINK} href="/" style={{marginRight: 16, position: "relative", top: "1px"}}>*/}
            {/*        IPFSpace*/}
            {/*    </a>*/}
            {/*</div>*/}
            {/*{<div css={STYLES_RIGHT}>*/}
            {/*    <a css={STYLES_LINK} href={signInURL}>*/}
            {/*        Sign In*/}
            {/*    </a>*/}
            {/*</div>}*/}

        </div>
    );
};

export default WebsitePrototypeHeader;
