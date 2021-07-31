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

const STYLES_INPUT_HEADER = css`
  color: ${Constants.system.black};
  font-size: ${Constants.typescale.lvlN1};
  font-family: ${Constants.font.semiBold};
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 8px;
`;

export const ConfirmationModal = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const lang = {
    deleteText: "Delete",
    confirmText: "Confirm",
    cancelText: "Cancel",
  };

  const _handleChange = (e) => {
    if (e.target.value === props.matchValue) {
      setIsEnabled(true);
      return;
    }
    setIsEnabled(false);
  };

  let deleteButton = (
    <ButtonWarningFull disabled={true}>{props.buttonText || lang.deleteText}</ButtonWarningFull>
  );
  if (isEnabled) {
    deleteButton = (
      <ButtonWarningFull onClick={() => props.callback(true)}>
        {props.buttonText || lang.deleteText}
      </ButtonWarningFull>
    );
  }

  let confirmButton = (
    <ButtonPrimaryFull disabled={true}>{props.buttonText || lang.confirmText}</ButtonPrimaryFull>
  );
  if (isEnabled) {
    confirmButton = (
      <ButtonPrimaryFull onClick={() => props.callback(true)}>
        {props.buttonText || lang.confirmText}
      </ButtonPrimaryFull>
    );
  }

  return (
    <div css={STYLES_TRANSPARENT_BG}>
      <Boundary enabled={true} onOutsideRectEvent={() => props.callback(false)}>
        <div css={STYLES_MAIN_MODAL}>
          <div css={STYLES_HEADER}>{props.header}</div>
          <div css={STYLES_SUB_HEADER}>{props.subHeader}</div>
          {props.type === "DELETE" && (
            <>
              {props.withValidation ? (
                <>
                  <div css={STYLES_INPUT_HEADER}>{props.inputHeader}</div>
                  <Input placeholder={props.inputPlaceholder} onChange={_handleChange} />
                  <ButtonSecondaryFull
                    onClick={() => props.callback(false)}
                    style={{ margin: "24px 0px 8px" }}
                  >
                    {lang.cancelText}
                  </ButtonSecondaryFull>
                  {deleteButton}
                </>
              ) : (
                <>
                  <ButtonSecondaryFull
                    onClick={() => props.callback(false)}
                    style={{ margin: "24px 0px 8px" }}
                  >
                    {lang.cancelText}
                  </ButtonSecondaryFull>
                  <ButtonWarningFull onClick={() => props.callback(true)}>
                    {props.buttonText || lang.deleteText}
                  </ButtonWarningFull>
                </>
              )}
            </>
          )}

          {props.type === "CONFIRM" && (
            <>
              {props.withValidation ? (
                <>
                  <div css={STYLES_INPUT_HEADER}>{props.inputHeader}</div>
                  <Input placeholder={props.inputPlaceholder} onChange={_handleChange} />
                  <ButtonSecondaryFull
                    onClick={() => props.callback(false)}
                    style={{ margin: "24px 0px 8px" }}
                  >
                    {lang.cancelText}
                  </ButtonSecondaryFull>
                  {confirmButton}
                </>
              ) : (
                <>
                  <ButtonSecondaryFull
                    onClick={() => props.callback(false)}
                    style={{ margin: "24px 0px 8px" }}
                  >
                    {lang.cancelText}
                  </ButtonSecondaryFull>
                  <ButtonPrimaryFull onClick={() => props.callback(true)}>
                    {props.buttonText || lang.confirmText}
                  </ButtonPrimaryFull>
                </>
              )}
            </>
          )}
        </div>
      </Boundary>
    </div>
  );
};
