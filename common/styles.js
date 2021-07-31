import * as Constants from "/common/constants";

import { css } from "@emotion/react";

/* TYPOGRAPHY */

export const HEADING_01 = css`
  font-family: ${Constants.font.medium};
  font-size: 1.953rem;
  font-weight: medium;
  line-height: 1.5;
  letter-spacing: -0.02px;
`;

export const HEADING_02 = css`
  font-family: ${Constants.font.text};
  font-size: 1.563rem;
  font-weight: medium;
  line-height: 1.5;
  letter-spacing: -0.02px;
`;

export const HEADING_03 = css`
  font-family: ${Constants.font.medium};
  font-size: 1.25rem;
  line-height: 1.5;
  letter-spacing: -0.02px;
`;

export const HEADING_04 = css`
  font-family: ${Constants.font.medium};
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: -0.01px;
`;

export const LINK = css`
  text-decoration: none;
  color: ${Constants.system.blue};
  cursor: pointer;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.system.blue};
  }
`;

const TEXT = css`
  box-sizing: border-box;
  overflow-wrap: break-word;

  a {
    ${LINK}
  }
`;

export const P1 = css`
  font-family: ${Constants.font.text};
  font-size: 1rem;
  font-weight: regular;
  line-height: 1.5;
  letter-spacing: -0.011px;

  ${TEXT}
`;


export const HEADING_05 = css`
  font-family: ${Constants.font.medium};
  font-size: 0.875rem;
  line-height: 1.5;
  letter-spacing: -0.01px;
`;

export const BODY_01 = css`
  font-family: ${Constants.font.text};
  font-size: 1rem;
  font-weight: regular;
  line-height: 1.5;
  letter-spacing: -0.01px;
`;

export const BODY_02 = css`
  font-family: ${Constants.font.text};
  font-size: 0.875rem;
  font-weight: regular;
  line-height: 1.5;
  letter-spacing: -0.01px;
`;

export const SMALL_TEXT = css`
  font-family: ${Constants.font.text};
  font-size: 0.75rem;
  font-weight: normal;
  line-height: 1.3;
`;

export const CODE_01 = css`
  font-family: ${Constants.font.code};
  font-size: 0.75rem;
  font-weight: normal;
  line-height: 1.3;
`;

export const CODE_02 = css`
  font-family: ${Constants.font.code};
  font-size: 0.875rem;
  font-weight: normal;
  line-height: 1.5;
`;

/* FREQUENTLY USED */

export const HORIZONTAL_CONTAINER = css`
  display: flex;
  flex-direction: row;
`;

export const VERTICAL_CONTAINER = css`
  display: flex;
  flex-direction: column;
`;

export const HORIZONTAL_CONTAINER_CENTERED = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const VERTICAL_CONTAINER_CENTERED = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CONTAINER_CENTERED = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ICON_CONTAINER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin: -4px;
  cursor: pointer;
  color: ${Constants.system.black};

  :hover {
    color: ${Constants.system.brand};
  }
`;

export const HOVERABLE = css`
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export const MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
    pointer-events: none;
  }
`;

export const MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
    pointer-events: none;
  }
`;

