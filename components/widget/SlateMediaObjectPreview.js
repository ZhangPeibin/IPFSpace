import * as React from "react";
import * as Constants from "../../common/constants";
import * as Validations from "../../common/validations";
import * as SVG from "../../common/svg";
import * as Strings from "../../common/strings";

import { css } from "@emotion/react";
import { FileTypeIcon } from "../core/FileTypeIcon";
import { Blurhash } from "react-blurhash";
import { isBlurhashValid } from "blurhash";

const STYLES_IMAGE_CONTAINER = css`
  background-color: ${Constants.system.white};
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    border-radius: 8px;
  }
`;

const STYLES_IMAGE = css`
  background-color: ${Constants.system.white};
  display: block;
  pointer-events: none;
  transition: 200ms ease all;
  max-width: 100%;
  max-height: 100%;
`;

const STYLES_ENTITY = css`
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid ${Constants.system.foreground};
  background-color: ${Constants.system.white};
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  cursor: pointer;
  pointer-events: none;
  padding: 2px;
  font-size: 0.9rem;
`;

const STYLES_TITLE = css`
  width: calc(100% - 32px);
  margin-top: 8px;
  margin-left: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${Constants.system.textGray};
  font-size: 16px;
  font-family: ${Constants.font.medium};
`;

const STYLES_BLUR_CONTAINER = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default class SlateMediaObjectPreview extends React.Component {
  static defaultProps = {
    charCap: 70,
  };

  state = {
    showImage: false,
    error: false,
  };

  componentDidMount = () => {
    this.setImage();
  };

  setImage = () => {
    const type = this.props.file.type;
    let url;
    if (type && Validations.isPreviewableImage(type)) {
      url = Strings.getURLfromCID(this.props.file.cid);
    }
    if (url) {
      const img = new Image();
      img.onload = () => this.setState({ showImage: true });
      img.src = url;
    }
  };

  render() {
    const file = this.props.file;
    const type = this.props.file.type;
    let url;
    if (type && Validations.isPreviewableImage(type)) {
      url = Strings.getURLfromCID(this.props.file.cid);
    }
    console.log(url)
    if (url) {
      if (this.state.error) {
        return (
            <div
                css={STYLES_ENTITY}
                style={{
                  ...this.props.imageStyle,
                  backgroundColor: Constants.system.foreground,
                }}
            >
              <SVG.FileNotFound height="24px" />
              {this.props.iconOnly ? null : <div css={STYLES_TITLE}>File not found</div>}
            </div>
        );
      }
      return (
          <article
              css={STYLES_ENTITY}
              style={{
                ...this.props.style,
                border: this.props.previewPanel ? `1px solid ${Constants.system.bgGray}` : "auto",
              }}
          >
            <img
                css={STYLES_IMAGE}
                style={{
                  ...this.props.imageStyle,
                }}
                src={url}
            />
             <span css={STYLES_TITLE}> {this.props.file.filename}</span>
          </article>
      );
    }

    let name = (file.filename).substring(0, this.charCap);
    let extension = Strings.getFileExtension(file.filename);
    if (extension && extension.length) {
      extension = extension.toUpperCase();
    }
    let element = (
      <FileTypeIcon
        type={file.type}
        height={this.props.previewPanel ? "26px" : "20px"}
        style={{ color: Constants.system.textGray }}
      />
    );
    return (
      <article
        css={STYLES_ENTITY}
        style={{
          ...this.props.style,
          border: this.props.previewPanel ? `1px solid ${Constants.system.bgGray}` : "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="https://slate.textile.io/ipfs/bafkreib5mnvds3cpe7ot7ibrakmrnja2hv5tast3giiarpl5nun7jpdt5m"
            alt=""
            height={this.props.previewPanel ? "80" : "64"}
          />
          <div style={{ position: "absolute" }}>{element}</div>
        </div>
        {!this.props.iconOnly && !this.props.previewPanel ? (
          <div style={{ position: "absolute", bottom: 16, left: 16, width: "inherit" }}>
            <div css={STYLES_TITLE}>{name}</div>
            {extension ? (
              <div
                css={STYLES_TITLE}
                style={{
                  fontSize: 12,
                  color: Constants.system.textGrayLight,
                  fontFamily: Constants.font.medium,
                }}
              >
                {/*{extension}*/}
              </div>
            ) : null}
          </div>
        ) : null}
      </article>
    );
  }
}
