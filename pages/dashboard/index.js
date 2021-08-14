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
import Web3Storage from "../../components/sidebar/Web3Storage";
import {ConfirmationModal} from "../../components/widget/ConfirmationModal";
import {Web3ConfirmationModal} from "../../components/widget/Web3ConfirmationModal";

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
`;


const title = `IPFSpace`;
const description =
    "Decentralized DataSharing Infrastructure, Based on IPFS & FileCoin ,Designed to store and share humanity's data";
const url = "https://anipfs.space";

const SIDEBARS = {
    SIDEBAR_ADD_FILE_TO_BUCKET: <SidebarAddFileToBucket />,
    WEB3_INTRO:<Web3Storage/>
};
export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identity: null,
            privacyTooltip: false,
            items:[],
            loading:true,
            dbClient:null,
            isRefreshByHand:false,
            showWeb3:false
        }
        this.handleFile.bind(this)
    }

    async componentDidMount() {
        if (this.state.identity == null) {
            const identity = await localStorage.getItem("identity")
            this.setState({
                identity: identity
            })
            await this._auth(identity)
        }
    }

    _auth = (identity)=>{
        A.auth(identity).then(async (v) => {
            this.setState({
                client: v
            })
            await this._requestData(identity, v);
        })
    }

    _requestData = async (identity, v) => {
        const user = await A.userInfo(v, identity)
        console.log(user[0])
        this.setState({
            user:user[0],
            web3:user[0].web3,
            showWeb3: (!this.state.isRefreshByHand ) && (!user[0].web3)
        })
        A.authIndex(identity, v).then(r => {
            console.log(r)
            const userConfig = r[0]
            const files = userConfig.files;
            this.setState({
                userConfig: userConfig,
                items: files,
                loading: false
            })
        })
    }

    _refreshData = ()=>{
        if(this.state.client){
            this.setState({
                loading:true,
                isRefreshByHand:true
            })
            this._requestData(this.state.identity,
                this.state.client)
        }else{
            this._auth(this.state.identity);
        }
    }
    _getWeb3Storage = ()=>{
        this._handleAction({
            type: "SIDEBAR",
            value: "WEB3_INTRO",
        });
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


    _deleteCid = async (cids) => {
        console.log(cids)
        const userConfig = await A.deleteFile(cids,this.state.client,this.state.identity);
        const files = userConfig.files;
        this.setState({
            userConfig:userConfig,
            items:files
        })
    }


    handleFile = async (files,keys) => {

        this.setState({ sidebar: null, sidebarData: null });

        if (!files || !files.length) {
            this._handleRegisterLoadingFinished({keys});
            return;
        }
        const web3 = this.state.user.web3
        const resolvedFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (Store.checkCancelled(`${files[i].lastModified}-${files[i].name}`)) {
                continue;
            }

            await Window.delay(3000);

            let response;
            try {
                response = await FileUpload.uploadEnter({
                    file: files[i],
                    context: this,
                    token:this.state.web3
                });
            } catch (e) {
                console.log(e)
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
                await A.storeFile(this.state.client,this.state.identity,fileJson)
                this.setState({
                    userConfig: {
                        ...this.state.userConfig,
                        files: [...this.state.userConfig.files, fileJson],
                    },
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
        await this.handleFile(toUpload, Object.keys(fileLoading));
    };

    setApiToken = async (token) => {
        console.log(token)
        let user = this.state.user;
        user.web3 = token;
        await A.storeUserInfo(this.state.client, user);
        this.setState({ sidebar: null, sidebarData: null,web3:token });
    }

    _handleDismiss = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ sidebar: null, sidebarData: null });
    };

    _handleWeb3Storage = (res) => {
        this.setState({
            showWeb3:false
        })
        if(res){
            this._getWeb3Storage();
        }
    };

    render() {
        let sidebarElement;
        if (this.state.sidebar) {
            sidebarElement = React.cloneElement(this.state.sidebar, {
                onUpload:this.handleUploadFiles,
                fileLoading:this.state.fileLoading,
                setApiToken:this.setApiToken
            });
        }
        return (
            <WebsitePrototypeWrapper title={title} description={description} url={url}>
                <div  css={STYLES_ROOT} >
                    <DashboradHeader/>
                    <Alert
                        fileLoading={this.state.fileLoading}
                        onAction={this._handleAction}/>
                    {
                        this.state.loading?(
                            <Loading/>
                        ):(
                            <FileLayout
                                _handleUploadData={this._handleUploadData}
                                _refreshData = {this._refreshData}
                                _getWeb3Storage = {this._getWeb3Storage}
                                files={this.state.items}
                                has1tT = {this.state.web3}
                                deleteCid={this._deleteCid}/>
                        )
                    }
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

                    {this.state.showWeb3 && (
                        <Web3ConfirmationModal
                            type={"CONFIRM"}
                            withValidation={false}
                            callback={this._handleWeb3Storage}
                            header={`Do you want to get 1T free storage space ?`}
                            subHeader={`Follow our guide to Web3.storage to claim your 1T free storage space.`}
                        />
                    )}
                </div>
            </WebsitePrototypeWrapper>
        )
    }
}