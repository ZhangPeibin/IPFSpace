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
import {CircularProgress} from "@material-ui/core";

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


export const LoadingDialog = (props) => {

  return (
    <div css={STYLES_TRANSPARENT_BG}>
      <Boundary enabled={true} onOutsideRectEvent={() => props.callback(false)}>
        <div css={STYLES_MAIN_MODAL}>
          <CircularProgress color="inherit" />
          <h1> Decrypting data , please waiting ...</h1>
        </div>
      </Boundary>
    </div>
  );
};
