import * as React from "react";
import * as Constants from "../../common/constants";
import * as Strings from "../../common/strings";

import { css } from "@emotion/react";

const STYLES_DESCRIPTION_GROUP_LABEL = css`
  box-sizing: border-box;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};
  color: ${Constants.system.black};
  padding: 0;
  margin: 16px 0 8px 0;
  display: block;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const STYLES_DESCRIPTION_GROUP_DESCRIPTION = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.semantic.textGray};
  margin-bottom: 16px;
  line-height: 1.5;
  display: block;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  a {
    font-family: ${Constants.font.text};
    font-weight: 400;
    color: ${Constants.system.grayLight2};
    cursor: pointer;
    transition: 200ms ease color;

    :visited {
      color: ${Constants.system.grayLight2};
    }

    :hover {
      color: ${Constants.system.grayDark6};
    }
  }
`;

export const DescriptionGroup = (props) => {
  return (
    <div style={{ maxWidth: props.full ? "none" : "480px", ...props.style }}>
      {!Strings.isEmpty(props.label) ? (
        <div css={STYLES_DESCRIPTION_GROUP_LABEL} style={props.labelStyle}>
          {props.label} {props.tooltip ? null : null}
        </div>
      ) : null}
      {!Strings.isEmpty(props.description) ? (
        <div css={STYLES_DESCRIPTION_GROUP_DESCRIPTION} style={props.descriptionStyle}>
          {props.description}
        </div>
      ) : null}
    </div>
  );
};
