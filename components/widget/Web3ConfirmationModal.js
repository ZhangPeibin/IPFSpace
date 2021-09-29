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

const STYLES_HEADER1 = css`
  color: ${Constants.system.redlight3};
  font-size: ${Constants.typescale.lvl2};
  font-family: ${Constants.font.semiBold};
  word-break: break-word;
  white-space: pre-line;
`;

const STYLES_HEADER = css`
  color: ${Constants.system.grayDark5};
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.medium};
  word-break: break-word;
  white-space: pre-line;
  margin-top: 16px;
`;

const STYLES_SUB_HEADER = css`
  color: ${Constants.system.textGray};
  font-size: ${Constants.typescale.lvl0};
  font-family: ${Constants.font.text};
  margin-top: 8px;
`;

const STYLES_INPUT_HEADER = css`
  color: ${Constants.system.black};
  font-size: ${Constants.typescale.lvlN1};
  font-family: ${Constants.font.semiBold};
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 8px;
`;

export const Web3ConfirmationModal = (props) => {

  const lang = {
    deleteText: "Delete",
    confirmText: "Confirm",
    cancelText: "Cancel",
  };

  localStorage.setItem("hasShowWeb3","1")

  return (
    <div css={STYLES_TRANSPARENT_BG}>
      <Boundary enabled={true} onOutsideRectEvent={() => props.callback(false)}>
        <div css={STYLES_MAIN_MODAL}>
          <div css={STYLES_HEADER1}>Web3.Storage is Coming</div>

          <div css={STYLES_HEADER}>{props.header}</div>
          <div css={STYLES_SUB_HEADER}>{props.subHeader}</div>
          {(
              <>
                <ButtonPrimaryFull
                    style={{ margin: "24px 0px 8px" }}
                    onClick={() => props.callback(true)}>
                  Get 1T storage space
                </ButtonPrimaryFull>

                <ButtonSecondaryFull
                    onClick={() => props.callback(false)}
                >
                  {lang.cancelText}
                </ButtonSecondaryFull>
              </>
          )}
        </div>
      </Boundary>
    </div>
  );
};
