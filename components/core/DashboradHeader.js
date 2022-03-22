import * as React from "react";
import * as Constants from "/common/constants";
import {css} from "@emotion/react";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {Magic} from "magic-sdk";
import AccountButton from "../widget/AccountButton";
import * as SVGLogo from "../../common/logo";

const STYLES_CONTAINER = css`
  position: fixed;
  z-index: ${Constants.zindex.alert};
  padding: 0px 72px;
  width: 100%;
  height: 56px;
  margin: auto auto;
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl0};
  transition: top 0.25s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${Constants.system.white};
  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: ${Constants.system.white};
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    background-color: ${Constants.system.white};
  }
`;

const APP_LOGO = css`
  width: 28px;
  height: 28px;
  margin-right: 8px;
`;


const STYLES_LINK = css`
  color: ${Constants.system.black};
  text-decoration: none;
  transition: 200ms ease color;
  align-items: center;
  font-family: ${Constants.font.medium};
  font-weight: 600;
  font-size: ${Constants.typescale.lvl1};

  :hover {
    color: ${Constants.system.redlight3};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  display: flex;
  text-align: center;
  align-items: center;
`;




const WebsitePrototypeHeader = (props) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    let magic;
    useEffect(function () {
        magic = window && new Magic("pk_live_893A36ED60BCFF42"); // ✨
    })

    useEffect(() => {
        window.addEventListener("resize", handleOpen);
        return () => window.removeEventListener("resize", handleOpen);
    });

    const handleOpen = () => {
        setOpen(false);
    };

    const exit = async () => {
        localStorage.clear();
        if (magic) {
            await magic.user.logout();
        }
        await router.replace({pathname: "/"})
    };

    return (
        <div css={STYLES_CONTAINER} style={props.style}>
            <div css={STYLES_LEFT}>
                <a href={"/dashboard"} >
                    <SVGLogo.Logo  />
                </a>
            </div>
        </div>
    );
}
;

export default WebsitePrototypeHeader;
