import * as React from "react";
import * as Constants from "../../common/constants";
import * as Styles from "../../common/styles";

import { css } from "@emotion/react";

const STYLES_POPOVER = css`
  z-index: ${Constants.zindex.tooltip};
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  min-width: 200px;
  border-radius: 4px;
  user-select: none;
  position: absolute;
  background-color: ${Constants.system.white};
  color: ${Constants.system.black};
  padding: 16px;
  border: 1px solid ${Constants.system.gray40};
`;

const STYLES_POPOVER_SECTION = css`
  border-bottom: 1px solid ${Constants.system.gray40};
  padding-bottom: 6px;
  margin-bottom: 6px;

  :last-child {
    border-bottom: none;
    margin-bottom: -6px;
    padding-bottom: 0px;
  }
`;

const STYLES_POPOVER_ITEM = css`
  box-sizing: border-box;
  padding: 6px 0px;
  display: flex;
  align-items: center;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    color: ${Constants.system.redlight3};
  }
`;

export class PopoverNavigation extends React.Component {
  render() {
    return (
      <div
        css={STYLES_POPOVER}
        style={this.props.style}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {this.props.topSection}
        {this.props.navigation.map((section, i) => (
          <div css={STYLES_POPOVER_SECTION}>
            {section.map((each, j) => (
              <div
                key={`${i}-${j}`}
                css={STYLES_POPOVER_ITEM}
                style={this.props.itemStyle}
                onClick={each.onClick}
              >
                <div css={Styles.HEADING_05 || this.props.css} style={{ width: "100%" }}>
                  {each.text}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
