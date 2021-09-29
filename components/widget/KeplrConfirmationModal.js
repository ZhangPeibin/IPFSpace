import * as React from "react";
import * as Constants from "../../common/constants";

import { css } from "@emotion/react";
import { useState } from "react";

import {
  ButtonPrimaryFull,
  ButtonSecondaryFull,
  ButtonWarningFull,
} from "./Buttons";
import { Input } from "./Input.js";
import { Boundary } from "./Boundary.js";
import * as Styles from "../../common/styles";
import * as SVG from "../../common/svg";

const STYLES_TRANSPARENT_BG = css`
  background-color: ${Constants.system.bgBlurGrayBlack};
  z-index: ${Constants.zindex.modal};
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`;

const STYLES_MAIN_MODAL = css`
  background-color: ${Constants.system.white};
  width: 380px;
  height: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  padding: 24px;
  text-align: left;
`;

const STYLES_HEADER = css`
  color: ${Constants.system.black};
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.semiBold};
  word-break: break-word;
  white-space: pre-line;
`;

const STYLES_SUB_HEADER = css`
  color: ${Constants.system.textGray};
  font-size: ${Constants.typescale.lvl0};
  font-family: ${Constants.font.text};
  margin-top: 16px;
`;

const STYLES_LINK_ITEM = (theme) => css`
  display: block;
  text-decoration: none;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  user-select: none;
  cursor: pointer;
  margin-top: 12px;
  transition: 200ms ease all;
  word-wrap: break-word;
  color: ${Constants.system.textGray};

  :hover {
    color: ${Constants.system.redlight3};
  }
`;


export const KeplrConfirmationModal = (props) => {

  return (
    <div css={STYLES_TRANSPARENT_BG}>
      <Boundary enabled={true} onOutsideRectEvent={() => props.callback(false)}>
        <div css={STYLES_MAIN_MODAL}>
          <div css={STYLES_HEADER}>{props.header}</div>
          <div css={STYLES_SUB_HEADER}>{props.subHeader}</div>

          <div>
            <a css={STYLES_LINK_ITEM} style={{marginTop: 16}}
               href="https://docs.keplr.app/"
               target="_blank">
              <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
                <SVG.RightArrow height="16px" style={{marginRight: 4}}/> What is Keplr
              </div>
            </a>
          </div>
          <div>
            <a css={STYLES_LINK_ITEM} style={{marginTop: 4}}
               href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap"
               target="_blank">
              <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
                <SVG.RightArrow height="16px" style={{marginRight: 4}}/> How to download Keplr
              </div>
            </a>
          </div>
          <>
            <>
              <ButtonPrimaryFull
                  onClick={() => props.callback(true)}
                  style={{ margin: "24px 0px 8px" }}
              >
                {"Connect Keplr Wallet"}
              </ButtonPrimaryFull>

              <ButtonSecondaryFull onClick={() => props.callback(false)}>
                {"Cancel "}
              </ButtonSecondaryFull>
            </>
          </>
        </div>
      </Boundary>
    </div>
  );
};
