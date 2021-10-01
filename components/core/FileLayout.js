import {SecondaryTabGroup} from "../widget/TabGroup";
import * as SVG from "../../common/svg";
import {ButtonPrimary, ButtonTertiary} from "../widget/Buttons";
import * as Constants from "../../common/constants";
import {Boundary} from "../widget/Boundary";
import {CheckBox} from "../widget/CheckBox";
import React, {useState} from "react";
import DataView from "../widget/DataView";
import {css} from "@emotion/react";
import EmptyState from "../../common/EmptyState";
import {FileTypeGroup} from "./FileTypeIcon";
import {Input, Space} from 'antd';
import {searchISCNById} from "../../common/iscn/sign";
import {withSnackbar} from "notistack";
import {formatAsUploadMessage} from "../../common/strings";

const {Search} = Input;

const STYLES_FILETYPE_TOOLTIP = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 260px;
`;

const STYLES_CONTAINER = css`
  padding: 16px 62px;
  padding-top: 120px;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${Constants.system.grayLight};
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
    padding-left: 12px;
  }

`;

const STYLES_CHECKBOX_LABEL = css`
  padding-top: 0;
  position: relative;
  top: -4px;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  user-select: none;
`;
const STYLES_TOOLTIP_ANCHOR = css`
  border: 1px solid #f2f2f2;
  background-color: ${Constants.system.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 8px 24px rgba(178, 178, 178, 0.2);
  position: absolute;
  z-index: ${Constants.zindex.tooltip};
`;

class FileLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileTypes: {
                image: false,
                video: false,
                audio: false,
                pdf: false,
            },
            view: 1,
            filtersActive: false,
            filetypeTooltip: false,
            searchLoading: false
        }
    }

    componentDidMount() {
        this.setState({
            files: this.props.files
        })
    }


    _handleFiletypeFilter = (type) => {
        this.setState(
            {fileTypes: {...this.state.fileTypes, [type]: !this.state.fileTypes[type]}},
            this._filterFiles
        );
    };

    _onSearch = async (value) => {
        this.setState({
            searchLoading: true
        })
        console.log(value)
        if (value) {
            const res = await searchISCNById(value)
            if (res === "-1") {
                this._errorMessage("Invalid ISCN ID format")
            } else if (res === "-2") {
                this._errorMessage("Request ISCN failed")
            } else {
                const url = "https://app.like.co/view/" + encodeURIComponent(value)
                window.open(url)
            }
        }
        this.setState({
            searchLoading: false
        })
    }


    _errorMessage = (message) => {
        this.props.enqueueSnackbar(message,
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
    }

    _filterFiles = () => {
        const filters = this.state.fileTypes;
        let fileTypeFiltersActive = Object.values(filters).some((val) => val === true);

        if (!fileTypeFiltersActive) {
            this.setState({fileTypeFiltersActive});
            return;
        }

        let filteredFiles;
        if (fileTypeFiltersActive) {
            filteredFiles = this.props.files.filter((file) => {
                return (
                    (filters.image && file.type.startsWith("image/")) ||
                    (filters.video && file.type.startsWith("video/")) ||
                    (filters.audio && file.type.startsWith("audio/")) ||
                    (filters.pdf && file.type.startsWith("application"))
                );
            });
        }

        this.setState({
            filteredFiles,
            fileTypeFiltersActive,
        });
    };

    _handleFiletypeTooltip = () => {
        this.setState({filetypeTooltip: !this.state.filetypeTooltip});
    };

    render() {
        const tab = this.state.view === 0 ? "grid" : "table";

        return <div css={STYLES_CONTAINER} style={{display: `block`}}>
            <div style={{display: `flex`}}>
                <SecondaryTabGroup
                    tabs={[
                        <SVG.GridView height="24px" style={{display: "block"}}/>,
                        <SVG.TableView height="24px" style={{display: "block"}}/>,
                    ]}
                    value={this.state.view}
                    onChange={(value) => this.setState({view: value})}
                    style={{margin: "0 0 24px 0"}}
                />

                <Search
                    style={{marginRight: "24px"}}
                    placeholder="search iscn by id"
                    allowClear
                    enterButton="Search"
                    size="large"
                    loading={this.state.searchLoading}
                    onSearch={this._onSearch}
                />

                {
                    (
                        this.props.try ? null : (
                            this.props.has1tT ? (null) : (
                                <ButtonPrimary
                                    onClick={this.props._getWeb3Storage}
                                    style={{background: "#1890ff", whiteSpace: "nowrap", marginRight: 24, height: 36}}
                                >
                                    Web3.Storage
                                </ButtonPrimary>
                            )
                        )
                    )
                }
                {
                    this.props.try ? null : (
                        <ButtonPrimary
                            onClick={this.props._refreshData}
                            style={{whiteSpace: "nowrap", marginRight: 24, height: 36}}
                        >
                            Refresh
                        </ButtonPrimary>
                    )
                }
                <ButtonPrimary
                    onClick={this.props._handleUploadData}
                    style={{whiteSpace: "nowrap", marginRight: 24, height: 36}}
                >
                    Upload data
                </ButtonPrimary>

                {/*<div  style={{ whiteSpace: "nowrap", marginRight: 24 ,height:36, }}*/}
                {/*      className="bg-gray-200 relative flex w-1 flex-wrap items-stretch">*/}
                {/*    <input*/}
                {/*        style={{ whiteSpace: "nowrap", marginRight: 24 ,height:36,}}*/}
                {/*        className="w-1 border-none pl-4 bg-transparent focus:border-red-400 outline-none"*/}
                {/*        placeholder="Search files"*/}
                {/*    />*/}
                {/*</div>*/}
                <div style={{position: "relative"}}>
                    <ButtonTertiary style={{marginRight: 20}} onClick={this._handleFiletypeTooltip}>
                        <SVG.Filter
                            height="18px"
                            style={{
                                color: this.state.filtersActive
                                    ? Constants.system.brand
                                    : Constants.system.textGray,
                            }}
                        />
                    </ButtonTertiary>
                    {this.state.filetypeTooltip ? (
                        <Boundary
                            captureResize={true}
                            captureScroll={false}
                            enabled
                            onOutsideRectEvent={() => this.setState({filetypeTooltip: false})}
                        >
                            <div css={STYLES_TOOLTIP_ANCHOR} style={{width: 134, left: 2, top: 50}}>
                                <div css={STYLES_FILETYPE_TOOLTIP}>
                                    <div style={{width: 100}}>
                                        <CheckBox
                                            name="image"
                                            value={this.state.fileTypes.image}
                                            onChange={() => this._handleFiletypeFilter("image")}
                                            boxStyle={{height: 20, width: 20}}
                                        >
                                            <span css={STYLES_CHECKBOX_LABEL}>Image</span>
                                        </CheckBox>
                                    </div>
                                    <div style={{width: 100, marginTop: 12}}>
                                        <CheckBox
                                            name="audio"
                                            value={this.state.fileTypes.audio}
                                            onChange={() => this._handleFiletypeFilter("audio")}
                                            boxStyle={{height: 20, width: 20}}
                                        >
                                            <span css={STYLES_CHECKBOX_LABEL}>Audio</span>
                                        </CheckBox>
                                    </div>
                                    <div style={{width: 100, marginTop: 12}}>
                                        <CheckBox
                                            name="video"
                                            value={this.state.fileTypes.video}
                                            onChange={() => this._handleFiletypeFilter("video")}
                                            boxStyle={{height: 20, width: 20}}
                                        >
                                            <span css={STYLES_CHECKBOX_LABEL}>Video</span>
                                        </CheckBox>
                                    </div>
                                    <div style={{width: 100, marginTop: 12}}>
                                        <CheckBox
                                            name="pdf"
                                            value={this.state.fileTypes.pdf}
                                            onChange={() => this._handleFiletypeFilter("pdf")}
                                            boxStyle={{height: 20, width: 20}}
                                        >
                                            <span css={STYLES_CHECKBOX_LABEL}>Document</span>
                                        </CheckBox>
                                    </div>
                                </div>
                            </div>
                        </Boundary>
                    ) : null}
                </div>
            </div>

            {this.props.files.length ? (
                <DataView items={this.state.fileTypeFiltersActive ? this.state.filteredFiles : this.props.files}
                          view={tab}
                          keplr={this.props.keplr}
                          keplrAddress={this.props.keplrAddress}
                          _openISCN={this.props._openISCN}
                          deleteCid={this.props.deleteCid}
                          encryptLoading={this.props.encryptLoading}/>
            ) : (
                <EmptyState>
                    <FileTypeGroup/>
                </EmptyState>
            )}
        </div>
    }
}

export default withSnackbar(FileLayout);
