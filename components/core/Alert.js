import * as React from "react";
import * as Constants from "../../common/constants";
import * as SVG from "../../common/svg";
import { error } from "../../common/messages";
import { css } from "@emotion/react";
import { LoaderSpinner } from "../widget/Loaders";

const STYLES_ALERT = `
  box-sizing: border-box;
  z-index: ${Constants.zindex.alert};
  position: fixed;
  top: 72px;
  width: 100%;
  color: ${Constants.system.white};
  min-height: 40px;
  padding: 12px 164px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  transition: top 0.25s;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 12px 24px 12px 24px;
    left: 0px;
    right: 0px;
    width: 100%;
  }
`;

const STYLES_WARNING = css`
  ${STYLES_ALERT}
  background-color: ${Constants.system.red};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(255, 212, 201, 0.75);
    color: ${Constants.system.red};
  }
`;

const STYLES_INFO = css`
  ${STYLES_ALERT}
  background-color: ${Constants.system.redLight4};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(255,141,128, 0.85);
    color: ${Constants.system.white};
  }
`;

const STYLES_MESSAGE = css`
  ${STYLES_ALERT}
  background-color: ${Constants.system.gray};
  color: ${Constants.system.grayBlack};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(224, 224, 224, 0.75);
  }
`;

const STYLES_TEXT = css`
  max-width: ${Constants.sizes.mobile}px;
  width: 100%;
  color: ${Constants.system.white};
`;

const STYLES_MESSAGE_BOX = css`
  display: flex;
  align-items: center;
  color: ${Constants.system.redlight3};
  //Note(amine): remove bottom padding from svg
  svg {
    display: block;
  }
`;

export class Alert extends React.Component {
  state = {
    message: null,
    status: null,
  };

  componentDidMount = () => {
    window.addEventListener("create-alert", this._handleCreate);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-alert", this._handleCreate);
  };

  _handleCreate = (e) => {
    if (e.detail.alert) {
      if (e.detail.alert.decorator && error[e.detail.alert.decorator]) {
        this.setState({
          message: error[e.detail.alert.decorator],
          status: e.detail.alert.status || null,
        });
      } else {
        this.setState({
          message: e.detail.alert.message || "Whoops something went wrong! Please try again.",
          status: e.detail.alert.status || null,
        });
      }
      window.setTimeout(this._handleDelete, 5000);
    }
  };

  _handleDelete = (e) => {
    if (this.state.message) {
      this.setState({ message: null, status: null });
    }
  };

  _handleDismissPrivacyAlert = (e) => {
    // Actions.updateStatus({ status: { hidePrivacyAlert: true } });
    // this.props.onAction({
    //   type: "UDPATE_VIEWER",
    //   viewer: {
    //     data: {
    //       ...this.props.viewer.data,
    //       status: { ...this.props.viewer.data.status, hidePrivacyAlert: true },
    //     },
    //   },
    // });
  };

  render() {
    //NOTE(martina): alert
    if (this.state.message) {
      return (
        <div
          css={this.state.status === "INFO" ? STYLES_INFO : STYLES_WARNING}
          style={this.props.style}
        >
          {this.state.message}
        </div>
      );
    }

    //NOTE(martina): uploading message
    if (this.props.fileLoading && Object.keys(this.props.fileLoading).length) {
      let total = Object.values(this.props.fileLoading).filter((upload) => {
        return !upload.cancelled;
      }).length;
      let uploaded =
        Object.values(this.props.fileLoading).filter((upload) => {
          return upload.loaded === upload.total;
        }).length || 0;

      return (
        <div
          css={STYLES_INFO}
          style={{ cursor: "pointer", ...this.props.style }}
          onClick={() =>
            this.props.onAction({
              type: "SIDEBAR",
              value: "SIDEBAR_ADD_FILE_TO_BUCKET",
            })
          }
        >
          <div css={STYLES_MESSAGE_BOX}>
            <div style={{ height: 16, width: 16, marginRight: 16 }}>
              <LoaderSpinner style={{ height: 16, width: 16,        color: Constants.system.white,
              }} />
            </div>
            <span css={STYLES_TEXT}>
              {uploaded} / {total} file
              {total === 1 ? "" : "s"} uploading{" "}
            </span>
          </div>
        </div>
      );
    }else{
      return (
          <div css={STYLES_MESSAGE} style={this.props.style}>
            <div css={STYLES_MESSAGE_BOX} style={{ fontSize: 14 ,}}>
              The data nft module is live, you can now test it on the Polygon testnet mumbai ！ You should register ISCN before mint you data
              <span
                  style={{ position: "absolute", right: 24, padding: 4, cursor: "pointer" }}
                  onClick={this._handleDismissPrivacyAlert}
              >
            </span>
            </div>
          </div>
      );
    }

    return null;
  }
}
