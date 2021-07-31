import * as Constants from "/common/constants";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import * as Styles from "../../common/styles"
const STYLES_H3 = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl2};
  line-height: 1.1;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  overflow-wrap: break-word;
  color: inherit;
  text-decoration: none;
  display: block;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

`;

const STYLES_P = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl1};
  line-height: 1.5;
  overflow-wrap: break-word;

  strong,
  b {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

`;


export const H3 = (props) => {
  return <h3 css={STYLES_H3} {...props} />;
};

export const P1 = (props) => {
  return <p {...props} css={[Styles.P1, props?.css]} />;
};

export const P = (props) => {
  return <div css={STYLES_P} {...props} />;
};
