/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import * as A from "../../common/UserInfo"
import React from "react";
import * as Constants from "../../common/constants";
import DashboradHeader from "../../components/core/DashboradHeader";
import WebsitePrototypeWrapper from "../../components/core/WebsitePrototypeWrapper";
import {Boundary} from "../../components/widget/Boundary";
import SidebarAddFileToBucket from "../../components/sidebar/SidebarAddFileToBucket";
import * as FileUpload from "../../common/fileupload";
import * as Store from "../../common/store";
import * as Window from "../../common/window";
import {Alert} from "../../components/core/Alert";
import FileLayout from "../../components/core/FileLayout";
import * as Events from "../../common/custom-events";
import Loading from "../../components/core/Loading";

const STYLES_ROOT = css`
  width: 100%;
  background-color: ${Constants.system.backgroundColor};
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px 24px 0 0px;
  }
`;

const STYLES_NO_VISIBLE_SCROLL = css`
  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${Constants.system.foreground};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const STYLES_SIDEBAR = css`
  position: fixed;
  top: 0;
  right: 0;
  margin: auto;
  z-index: ${Constants.zindex.sidebar};
`;

const STYLES_SIDEBAR_ELEMENTS = css`
  height: 100vh;
  width: ${Constants.sizes.sidebar}px;
  padding: 0;
  flex-shrink: 0;
  background-color: rgba(195, 195, 196, 1);
  top: 0;
  right: 0;
  ${STYLES_NO_VISIBLE_SCROLL}

  @media (max-width: ${Constants.sizes.mobile}px) {
  width: 100%;
}
  /*
  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(195, 195, 196, 0.6);
  }
  */
`;


const title = `Store On IPFS & FileCoin`;
const description =
    "Welcome to the future of file store. Powered by DDshare.";
const url = "https://anipfs.space";

const SIDEBARS = {
    SIDEBAR_ADD_FILE_TO_BUCKET: <SidebarAddFileToBucket />
};
export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            privacyTooltip: false,
            items:[],
            loading:false,
        }
        this.handleFile.bind(this)
    }

    _handleAction = (options) => {
        if (options.type === "SIDEBAR") {
            return this.setState({
                sidebar: SIDEBARS[options.value],
                sidebarData: options.data,
            });
        }
    };

    _handleUploadData = () => {
        this._handleAction({
            type: "SIDEBAR",
            value: "SIDEBAR_ADD_FILE_TO_BUCKET",
        });
    };



    handleFile = async (files, ipfs,keys) => {
        this.setState({ sidebar: null, sidebarData: null });

        if (!files || !files.length) {
            this._handleRegisterLoadingFinished({keys});
            return;
        }

        const resolvedFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (Store.checkCancelled(`${files[i].lastModified}-${files[i].name}`)) {
                continue;
            }

            await Window.delay(3000);

            let response;
            try {
                response = await FileUpload.upload({
                    file: files[i],
                    context: this,
                });
            } catch (e) {
                console.log(e);
            }
            console.log(response);
            if (!response || response.error) {
                continue;
            }
            resolvedFiles.push(response);
            const cid = response['cid']
            const filename = files[i].name
            const size = response['size']
            const type = response['type']
            const createTime = response['created']
            const fileJson = {
                filename:filename,
                size: size,
                cid:cid,
                createTime:createTime,
                type:type
            }

            const result = this.state.items.filter(item=>item.cid===cid)
            if(result && result.length<1){
                this.setState({
                    items:[...this.state.items,fileJson],
                });
            }
        }

        if (!resolvedFiles.length) {
            this._handleRegisterLoadingFinished({keys});
            return;
        }
        this._handleRegisterLoadingFinished({keys});
        let message = "Files Upload finished !";
        Events.dispatchMessage({ message,});
    }

    _handleRegisterLoadingFinished = ({ keys }) => {
        let fileLoading = this.state.fileLoading;
        for (let key of keys) {
            delete fileLoading[key];
        }
        this.setState({ fileLoading });
    };

    _handleRegisterFileLoading = (fileLoading) => {
        if (this.state.fileLoading) {
            return this.setState({
                fileLoading: { ...this.state.fileLoading, ...fileLoading },
            });
        }
        return this.setState({
            fileLoading,
        });
    };

    handleUploadFiles = async ({ files }) => {
        const { fileLoading, toUpload, numFailed } = FileUpload.formatUploadedFiles({ files });
        this._handleRegisterFileLoading(fileLoading)
        //上传文件
        await this.handleFile(toUpload,null, Object.keys(fileLoading));
    };

    _handleDismiss = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ sidebar: null, sidebarData: null });
    };


    render() {
        let sidebarElement;
        if (this.state.sidebar) {
            sidebarElement = React.cloneElement(this.state.sidebar, {
                onUpload:this.handleUploadFiles,
                fileLoading:this.state.fileLoading,
            });
        }
        return (
            <WebsitePrototypeWrapper title={title} description={description} url={url}>
                <div  css={STYLES_ROOT} >
                    <DashboradHeader try={true}/>
                    <Alert
                        fileLoading={this.state.fileLoading}
                        onAction={this._handleAction}/>
                        {/* 展示加载动画或文件展示区 */}
                    {
                        this.state.loading?(
                            <Loading/>
                        ):(
                            <FileLayout
                                _handleUploadData={this._handleUploadData}
                                _refreshData = {this._refreshData}
                                files={this.state.items}
                                deleteCid={this._deleteCid}
                                try={true}/>
                        )
                    }
                    {/* 伸缩右部侧边栏 */}
                    {this.state.sidebar ? (
                        <Boundary
                            onMouseDown
                            captureResize={false}
                            captureScroll={false}
                            enabled
                            onOutsideRectEvent={this._handleDismiss}
                        >
                            <div css={STYLES_SIDEBAR}>
                                <div
                                    css={STYLES_SIDEBAR_ELEMENTS}
                                    ref={(c) => {
                                        this._sidebar = c;
                                    }}
                                >
                                    {sidebarElement}
                                </div>
                            </div>
                        </Boundary>
                    ) : null}

                </div>
            </WebsitePrototypeWrapper>
        )
    }
}