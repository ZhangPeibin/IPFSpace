/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import * as React from "react";
import * as Constants from "../../common/constants";

import {FileTypeGroup} from "../core/FileTypeIcon";
import {P1,P} from "../widget/Typography";
import {ButtonPrimary} from "../widget/Buttons";
import {SidebarWarningMessage} from "../core/WarningMessage";
import * as Strings from "../../common/strings";
import {Alert, CheckBox, Dismiss} from "../../common/svg";
import {LoaderSpinner} from "../widget/Loaders";
import {DataMeterBar} from "../../common/DataMeter";
import * as Events from "../../common/custom-events";


const sidebar = css`
  height: 100%;
  width: 412px;
  padding: 32px 16px;
  background-color: #fafafa;
`;

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_FILE_LINE = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background-color: ${Constants.system.white};
  border-bottom: 1px solid ${Constants.system.foreground};
`;

const STYLES_FILE_NAME = css`
  min-width: 10%;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.9rem;
  font-family: ${Constants.font.medium};
`;
const STYLES_BAR_CONTAINER = css`
  background: ${Constants.system.white};
  border-radius: 4px;
  padding: 16px;
  margin-top: 48px;
`;

const STYLES_PERFORMANCE = css`
  font-family: ${Constants.font.code};
  font-size: 12px;
  display: block;
  margin: 0 0 8px 0;
`;

const STYLES_LEFT = css`
  width: 100%;
  min-width: 10%;
  display: flex;
  align-items: center;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const STYLES_FILE_STATUS = css`
  flex-shrink: 0;
  margin-right: 16px;
  display: flex;
  align-items: center;
`;
export default class SidebarAddFileToBucket extends React.Component {
    state = {
        url: "",
    };

    _handleUpload = (e) => {
        const files = e.target.files;
        this.props.onUpload({
            files: e.target.files,
        });
    };

    _handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    _handleCancel = (e, key) => {
        e.preventDefault();
        e.stopPropagation();
        Events.dispatchCustomEvent({ name: `cancel-${key}` }); //NOTE(martina): so that will cancel if is in the middle of uploading
    };

    _handleUploadLink = () => {
    };

    render() {
        let loaded = 0;
        let total = 0;
        if (this.props.fileLoading) {
            for (let file of Object.values(this.props.fileLoading)) {
                if (typeof file.loaded === "number" && typeof file.total === "number") {
                    total += file.total;
                    loaded += file.loaded;
                }
            }
        }

        return (
            <div css={sidebar}>
                <P1
                    style={{
                        fontFamily: Constants.font.semiBold,
                        fontSize: Constants.typescale.lvl3,
                        marginBottom: 36,
                    }}
                >
                    {this.props.fileLoading && Object.keys(this.props.fileLoading).length
                        ? "Upload progress"
                        : "Upload data"}
                </P1>

                <input
                    css={STYLES_FILE_HIDDEN}
                    multiple
                    type="file"
                    id="file"
                    onChange={this._handleUpload}
                />
                {this.props.fileLoading && Object.keys(this.props.fileLoading).length ? null : (
                    <React.Fragment>
                        <FileTypeGroup style={{ margin: "64px 0px" }} />

                        <P>
                            Click below or drop a file anywhere on the page to upload a file .
                        </P>

                        <SidebarWarningMessage />

                        <ButtonPrimary full type="label" htmlFor="file" style={{ marginTop: 24 }}>
                            Add file
                        </ButtonPrimary>
                        <br />
                    </React.Fragment>
                )}




                {this.props.fileLoading && Object.keys(this.props.fileLoading).length ? (

                    <div css={STYLES_BAR_CONTAINER}>
                        <strong css={STYLES_PERFORMANCE}>
                            {Strings.bytesToSize(loaded)} / {Strings.bytesToSize(total)}
                        </strong>
                        <DataMeterBar bytes={loaded} maximumBytes={total} />
                    </div>
                ) : null}
                <div style={{ marginTop: 24, borderRadius: 4, overflow: "hidden" }}>
                    {this.props.fileLoading
                        ? Object.entries(this.props.fileLoading).map((entry) => {
                            let file = entry[1];
                            return (
                                <div css={STYLES_FILE_LINE} key={file.name}>
                    <span css={STYLES_LEFT}>
                      <div css={STYLES_FILE_STATUS}>
                        {file.failed ? (
                            <Alert
                                height="24px"
                                style={{
                                    color: Constants.system.red,
                                    pointerEvents: "none",
                                }}
                            />
                        ) : file.cancelled ? (
                            <Dismiss
                                height="24px"
                                style={{
                                    color: Constants.system.gray,
                                    pointerEvents: "none",
                                }}
                            />
                        ) : file.loaded === file.total ? (
                            <CheckBox height="24px" />
                        ) : (
                            <LoaderSpinner
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    margin: "2px",
                                }}
                            />
                        )}
                      </div>
                      <div
                          css={STYLES_FILE_NAME}
                          style={
                              file.failed
                                  ? { color: Constants.system.red }
                                  : file.cancelled
                                  ? { color: Constants.system.gray }
                                  : null
                          }
                      >
                        {file.name}
                      </div>
                    </span>
                                    {file.loaded === file.total || file.failed || file.cancelled ? (
                                        <div css={STYLES_RIGHT} style={{ height: 24, width: 24 }} />
                                    ) : (
                                        <span
                                            css={STYLES_RIGHT}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            onClick={(e) => this._handleCancel(e, entry[0])}
                                        >
                        <Dismiss
                            height="24px"
                            className="boundary-ignore"
                            style={{
                                color: Constants.system.gray,
                                pointerEvents: "none",
                            }}
                        />
                      </span>
                                    )}
                                </div>
                            );
                        })
                        : null}
                </div>
            </div>
        );
    }
}
