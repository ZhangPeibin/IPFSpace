/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import * as A from "../../common/UserInfo"
import React from "react";
import * as Constants from "../../common/constants";
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
import {IDXClient} from "../../components/core/ceramic/IDXClient";
import {Web3ConfirmationModal} from "../../components/widget/Web3ConfirmationModal";
import {SnackbarProvider, withSnackbar} from "notistack";
import {EncryptConfirmation} from "../../components/widget/EncryptConfirmation";
import {LoadingDialog} from "../../components/widget/LoadingDialog";
import EditISCN from "../../components/widget/EditISCN";
import {initKeplr} from "../../common/iscn/keplr";
import {calculateTotalFee} from "../../common/iscn";
import BigNumber from "bignumber.js";
import {formatISCNTxPayload, getISCNId, searchISCNById, signISCNTx} from "../../common/iscn/sign";
import {addISCNIdToFile,addisMintToFile} from "../../common/UserInfo";
import {KeplrConfirmationModal} from "../../components/widget/KeplrConfirmationModal";
import Createpage from "../../components/widget/create";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Web3Modal from "web3modal";
import Web3 from "web3";
import * as DDNFTMarket from "../../abi/DDNFTMarketplace";
import {nftaddress, nftmarketaddress} from "../../config";
import * as DDNFT from "../../abi/DDNFT";
import Header from '../../components/widget/header';
import EditUserProfile from "../../components/widget/EditUserProfile";
import NFTItemDetail from "../../components/widget/ItemDetail";
import Script from "next/script";
import Author from "../../components/widget/Author";
import ExploreMarket from "../../components/widget/ExploreMarket";
import SharingPoolMarket from "../../components/widget/SharingPoolMarket";

const STYLES_ROOT = css`
  width: 100%;
  overflow-y: hidden;
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
  ${STYLES_NO_VISIBLE_SCROLL} @media(max-width: ${Constants.sizes.mobile}px) {
  width: 100%;
}
`;


const title = `All On IPFS & FileCoin`;
const description =
    "Decentralized DataSharing Infrastructure, Based on IPFS & FileCoin ,Designed to store and share humanity's data";
const url = "https://anipfs.space";

const SIDEBARS = {
    SIDEBAR_ADD_FILE_TO_BUCKET: <SidebarAddFileToBucket/>,
    WEB3_INTRO: <Web3Storage/>,
};

const COMPONENTS = {
    HOME:<FileLayout/>,
    SHARING: <SharingPoolMarket/>,
    MINT: <Createpage/>,
    MARKETPLACE:<ExploreMarket/>,
    PROFILE:<EditUserProfile/>,
    LOADING:<Loading/>,
    ITEM_DETAIL:<NFTItemDetail/>,
    COLLECTION:<Author/>
}


class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identity: null,
            privacyTooltip: false,
            items: [],
            dbClient: null,
            isRefreshByHand: false,
            showWeb3: false,
            idxLoading: true,
            idx: "connecting to idx ... ",
            encryptLoading: false,
            openSellPriceFormDialog:false,
            keplr: null,
            keplrAddress: null,
            askISCN: false,
            askISCNCid: null,
            askISCNName: null,
            localHasShowWeb3: false,
            mintFile:null,
            nftDetail:null,
            nftIndex:0,
        }
        this.handleFile.bind(this)
    }

    async componentDidMount() {
        this.setState({
            component:COMPONENTS['LOADING']
        })
        const identity = await localStorage.getItem("identity")
        this.setState({
            identity: identity
        })

        const hasShowWeb3 = await localStorage.getItem("hasShowWeb3")
        if (hasShowWeb3) {
            this.setState({
                localHasShowWeb3: true
            })
        }

        const seed = JSON.parse(localStorage.getItem('seed'));
        const idxClient = new IDXClient()
        idxClient.getJsDID(seed).then((did) => {
            this.setState({
                idxClient: idxClient,
                idx: did.id,
                idxLoading: false
            })
            idxClient.readUserInfo().then((userInfo) => {
                this.setState({
                    userInfo: userInfo
                })
            })
        })

        await this._auth(identity)

        const isAuthByKeplr = localStorage.getItem("isAuthByKeplr")
        if (isAuthByKeplr === "1") {
            const value = await initKeplr()
            if (value) {
                this.setState({
                    keplr: value[0],
                    keplrAddress: value[1]
                })
            }
        }
    }

    editProfile = async (kv) => {
        await this.state.idxClient.writeUserInfo(kv)
        this.state.idxClient.readUserInfo().then((userInfo) => {
            this.setState({
                userInfo: userInfo,
                component:COMPONENTS["HOME"]
            })
        })
    }

    _auth = (identity) => {
        console.log("_auth:" + identity)

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
            user: user[0],
            web3: user[0].web3,
            showWeb3: (!this.state.isRefreshByHand) && (!user[0].web3)
        })
        A.authIndex(identity, v).then(r => {
            console.log(r)
            const userConfig = r[0]
            const files = userConfig.files;
            this.setState({
                userConfig: userConfig,
                items: files,
                component:COMPONENTS['HOME']
            })
        })
    }

    _getWeb3Storage = () => {
        this._handleAction({
            type: "SIDEBAR",
            value: "WEB3_INTRO",
        });
    }

    searchISCN = async (v) => {
        const evt = window.event || v;
        if (evt.keyCode === 13) {
            const value = v.target.value;
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
        }
    }

    _goToMarketplace = () => {
        this.setState({
            component:COMPONENTS["MARKETPLACE"]
        })
    }

    _sharingPool = ()=>{
        this.setState({
           component:COMPONENTS['SHARING']
        })
    }

    mintNFTSuccess = async (itemId,cid) => {
        this._goToHome();
        const userConfig = await addisMintToFile(cid,
            true,itemId,
            this.state.client,
            this.state.identity)
        const files = userConfig.files;
        this.setState({
            userConfig: userConfig,
            items: files,
        })
    }

    _goToHome = () => {
        this.setState({
            component:COMPONENTS["HOME"]
        })
    }

    _showNFTDetail = async (nftData,nftIndex)=>{
        this.setState({
            nftDetail:nftData,
            nftIndex:nftIndex,
            component:COMPONENTS["ITEM_DETAIL"]
        })
    }

    _saveNFTToSpace = async (nftData) => {
        const dateobj = new Date();
        const createTime = dateobj.toISOString();
        const fileJson = {
            filename: nftData.title,
            size: parseInt(nftData.fileSize),
            cid: nftData.srcCid,
            type: nftData.fileType,
            createTime:createTime,
            iscnId:[nftData.iscnId],
            encrypt: false
        }
        const result = this.state.items.filter(item => item.cid === nftData.srcCid)
        if (result && result.length < 1) {
            await A.storeFile(this.state.client, this.state.identity, fileJson)
            this.setState({
                userConfig: {
                    ...this.state.userConfig,
                    files: [...this.state.userConfig.files, fileJson],
                },
                items: [fileJson,...this.state.items],
            });
        }
        this._successMessage("NFT save to space success !")
    }


    _openProfile = () => {
        this.setState({
            component: COMPONENTS["PROFILE"]
        })
    }


    _mint = (file) => {
        console.log(file)
        this.setState({
            component: COMPONENTS["MINT"],
            mintFile:file
        })
    }

    _openISCN = async (cid, filename) => {
        if (!this.state.keplr || !this.state.keplrAddress) {
            const value = await initKeplr()
            this.setState({
                keplr: value[0],
                keplrAddress: value[1]
            })
        }

        if (this.state.keplr && this.state.keplrAddress) {
            this.setState({openISCN: true, cidToISCN: cid, cidToISCNFilename: filename});
        } else {
            this._errorMessage("Error connecting to Keplr wallet, please check whether Keplr is installed")
        }
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

    _successMessage = (message) =>{
        this.props.enqueueSnackbar(message,
            {
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
    }


    editISCNOK = async (payload) => {
        this.setState({
            iscnLoading: true
        })
        const value = await calculateTotalFee(payload, this.state.keplrAddress)
        const balance = value[0]
        const totalFee = value[1]
        if (new BigNumber(balance).lt(totalFee)) {
            this._errorMessage("INSUFFICIENT_BALANCE")
            this.setState({
                iscnLoading: false
            })
            return
        }
        try {
            const res = await signISCNTx(formatISCNTxPayload(payload), this.state.keplr, this.state.keplrAddress)
            const iscnId = await getISCNId(res.txHash)
            console.log(iscnId)
            const userConfig = await addISCNIdToFile(this.state.cidToISCN,
                iscnId,
                this.state.client,
                this.state.identity)

            const files = userConfig.files;
            this.setState({
                userConfig: userConfig,
                items: files,
                openISCN: false,
                iscnLoading: false
            })
        } catch (e) {
            this._errorMessage("Register ISCN Failed " + e.toString())
            this.setState({
                iscnLoading: false
            })
        }
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
        // this._handleAction({
        //     type: "SIDEBAR",
        //     value: "SIDEBAR_ADD_FILE_TO_BUCKET",
        // });
        this.setState({
            showChoiceEncrypt: true
        })
    };

    _encryptLoading = (v) => {
        this.setState({
            encryptLoading: v
        })
    }


    _deleteCid = async (cids) => {
        const userConfig = await A.deleteFile(cids, this.state.client, this.state.identity);
        const files = userConfig.files;
        this.setState({
            userConfig: userConfig,
            items: files
        })
    }


    handleFile = async (files, keys, encrypt) => {

        this.setState({sidebar: null, sidebarData: null});

        if (!files || !files.length) {
            this._handleRegisterLoadingFinished({keys});
            return;
        }
        const web3 = this.state.user.web3
        const resolvedFiles = [];
        const resolvedFileJsons = []
        for (let i = 0; i < files.length; i++) {
            if (Store.checkCancelled(`${files[i].lastModified}-${files[i].name}`)) {
                continue;
            }

            await Window.delay(3000);

            let response;
            try {
                if (encrypt) {
                    response = await FileUpload.uploadWithEncrypt({
                        file: files[i],
                        context: this,
                        token: web3
                    })
                } else {
                    response = await FileUpload.uploadWithNoEncrypt({
                        file: files[i],
                        context: this,
                        token: web3,
                    })
                }
            } catch (e) {
                console.log(e)
            }
            if (!response || response.error) {
                continue;
            }
            console.log(response)
            resolvedFiles.push(response);
            const cid = response['cid']
            const filename = files[i].name
            const size = response['size']
            const type = response['type']
            const createTime = response['created']
            const fileJson = {
                filename: filename,
                size: size,
                cid: cid,
                createTime: createTime,
                type: type,
                encrypt: encrypt
            }
            resolvedFileJsons.push(fileJson)
            const result = this.state.items.filter(item => item.cid === cid)
            if (result && result.length < 1) {
                await A.storeFile(this.state.client, this.state.identity, fileJson)
                this.setState({
                    userConfig: {
                        ...this.state.userConfig,
                        files: [...this.state.userConfig.files, fileJson],
                    },
                    items: [...this.state.items, fileJson],
                });
            }
        }

        if (!resolvedFiles.length) {
            this._handleRegisterLoadingFinished({keys});
            return;
        }
        this._handleRegisterLoadingFinished({keys});
        let message = "Files Upload finished !";
        Events.dispatchMessage({message,});

        if (files.length === 1 && resolvedFileJsons.length === 1) {
            const resolvedFileJson = resolvedFileJsons[0]
            this.setState({
                askISCN: true,
                askISCNCid: resolvedFileJson['cid'],
                askISCNName: resolvedFileJson['filename']
            })
        }
    }

    _handleRegisterLoadingFinished = ({keys}) => {
        let fileLoading = this.state.fileLoading;
        for (let key of keys) {
            delete fileLoading[key];
        }
        this.setState({fileLoading});
    };

    _handleRegisterFileLoading = (fileLoading) => {
        if (this.state.fileLoading) {
            return this.setState({
                fileLoading: {...this.state.fileLoading, ...fileLoading},
            });
        }
        return this.setState({
            fileLoading,
        });
    };

    handleUploadFiles = async ({files, encrypt}) => {
        this.setState({
            showChoiceEncrypt: false
        })
        const {fileLoading, toUpload, numFailed} = FileUpload.formatUploadedFiles({files});
        this._handleRegisterFileLoading(fileLoading)
        await this.handleFile(toUpload, Object.keys(fileLoading), encrypt);
    };

    setApiToken = async (token) => {
        console.log(token)
        let user = this.state.user;
        user.web3 = token;
        await A.storeUserInfo(this.state.client, user);
        this.setState({sidebar: null, sidebarData: null, web3: token});
    }

    _handleDismiss = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({sidebar: null, sidebarData: null});
    };

    _handleWeb3Storage = (res) => {
        this.setState({
            showWeb3: false
        })
        if (res) {
            this._getWeb3Storage();
        }
    };

    _handleSelectFiles = (res) => {
    };

    _showAskISCN = async (isEnable) => {
        this.setState({askISCN: false});

        if (!isEnable) {
            return;
        }
        await this._openISCN(this.state.askISCNCid, this.state.askISCNName)
    }

    handleClickOpen = () => {
        this.setState({
            openSellPriceFormDialog:true
        })
    };

    handleClose = () => {
        this.setState({
            openSellPriceFormDialog:false
        })
    };

    _priceChange = (event)=>{
        this.setState({
            nftPrice: event.target.value
        })
    }

    _sellNFTWithPrice = async () => {
        this.handleClose();
        const price = this.state.nftPrice;
        const itemId = this.state.itemId;
        console.log("price:" + price);
        console.log("itemId:" + itemId);

        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const marketContract = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        const contract = new web3.eth.Contract(DDNFT.ABI, nftaddress);
        const isOperator = await contract.methods.isApprovedForAll(accounts[0], nftmarketaddress).call();
        if(!isOperator){
            await contract.methods.setApprovalForAll(nftmarketaddress,true).send({
                from: accounts[0]
            });
        }
        let marketCreateTransaction = await marketContract.methods.createMarketItem(
            itemId,
            web3.utils.toWei(price),
        ).send({from: accounts[0]})
            .on('receipt', function (receipt) { });
        console.log("market create transaction")
        console.log(marketCreateTransaction)
        this._goToMarketplace();
    }

    _sellNFT = (itemId) =>{
        console.log(itemId);
        this.setState({
            openSellPriceFormDialog:true,
            itemId:itemId
        })
    }

    _createSharePoolItem = async (itemId) => {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const marketContract = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let marketCreateTransaction = await marketContract.methods.createSharePoolItem(
            itemId,
            true,
        ).send({from: accounts[0]})
            .on('receipt', function (receipt) {
            });
        console.log("createSharePoolItem transaction")
        console.log(marketCreateTransaction)
        this.setState({
            component:COMPONENTS["SHARING"]
        })
    }


    render() {
        let sidebarElement;
        if (this.state.sidebar) {
            sidebarElement = React.cloneElement(this.state.sidebar, {
                onUpload: this.handleUploadFiles,
                fileLoading: this.state.fileLoading,
                setApiToken: this.setApiToken
            });
        }

        let contentElement;
        if(this.state.component){
            contentElement = React.cloneElement(this.state.component, {
                mintFile: this.state.mintFile,
                _mintNFTSuccess:this.mintNFTSuccess,
                _toNFT:this._goToMarketplace,
                saveNFTToSpace: this._saveNFTToSpace,
                _openISCN:this._openISCN,
                _mint:this._mint,
                _sellNFT:this._sellNFT,
                _createSharePoolItem:this._createSharePoolItem,
                encryptLoading:this._encryptLoading,
                _handleUploadData:this._handleUploadData,
                files:this.state.items,
                has1tT:this.state.web3,
                keplr:this.state.keplr,
                keplrAddress:this.state.keplrAddress,
                deleteCid:this._deleteCid,
                editProfile:this.editProfile,
                userInfo:this.state.userInfo,
                _showNFTDetail:this._showNFTDetail,
                nftDetail:this.state.nftDetail,
                nftIndex:this.state.nftIndex,
                idx:this.state.idx
            });
        }

        return (
            <WebsitePrototypeWrapper title={title} description={description} url={url}>
                <SnackbarProvider>
                    <div css={STYLES_ROOT}>
                        <Header
                                _searchISCN = {this.searchISCN}
                                idxLoading={this.state.idxLoading}
                                idx={this.state.idx}
                                userInfo={this.state.userInfo}
                                showProfile={() => this._openProfile() }
                                _goToMarketplace={this._goToMarketplace}
                                _sharingPool = {this._sharingPool}
                                _getWeb3Storage={this._getWeb3Storage}
                                _goToHome={this._goToHome}
                                _goMyNFTs={()=>{this.setState({
                                    component:COMPONENTS["COLLECTION"]
                                })}}
                        />

                        {
                            <Alert
                                fileLoading={this.state.fileLoading}
                                onAction={this._handleAction}/>
                        }
                        {
                            this.state.component ?(contentElement):(<div></div>)
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

                        {(!this.state.localHasShowWeb3) && this.state.showWeb3 && (
                            <Web3ConfirmationModal
                                type={"CONFIRM"}
                                withValidation={false}
                                callback={this._handleWeb3Storage}
                                header={`Do you want to get 1T free storage space ?`}
                                subHeader={`Follow our guide to Web3.storage to claim your 1T free storage space.`}
                            />
                        )}

                        {
                            this.state.showChoiceEncrypt && (
                                <EncryptConfirmation
                                    onUpload={this.handleUploadFiles}
                                    cancelEncrypt={() => {
                                        this.setState({
                                            showChoiceEncrypt: false
                                        })
                                    }}
                                    type={"CONFIRM"}
                                    withValidation={false}
                                    callback={this._handleSelectFiles}
                                    header={`Do you want to encrypt the file ?`}
                                    subHeader={`Encryption is performed by the user’s public key, and the encryption is performed on the front end.`}
                                />
                            )
                        }

                        {this.state.askISCN && (
                            <KeplrConfirmationModal
                                callback={this._showAskISCN}
                                header={`Register ISCN for data？`}
                                subHeader={`To register for ISCN, you need to connect to the Keplr wallet.`}
                            />
                        )}

                        {this.state.openISCN && <EditISCN
                            iscnLoading={this.state.iscnLoading}
                            cidToISCNFilename={this.state.cidToISCNFilename}
                            keplrAddress={this.state.keplrAddress}
                            cidToISCN={this.state.cidToISCN}
                            handleClose={() => this.setState({openISCN: false})}
                            editISCNBack={this.editISCNOK}/>
                        }

                        {
                            this.state.encryptLoading && <LoadingDialog/>
                        }
                        {
                            <div>
                                <Dialog open={this.state.openSellPriceFormDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Sell your NFT </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Please fill in the price you want to sell, note that the price unit is: matic.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="price in matic"
                                            type="number"
                                            onChange={this._priceChange}
                                            fullWidth
                                        />
                                    </DialogContent>


                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={this._sellNFTWithPrice} color="primary">
                                            Sell
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        }
                    </div>
                </SnackbarProvider>
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"/>
                <Script src="https://use.fontawesome.com/releases/v5.2.0/css/all.css"/>
            </WebsitePrototypeWrapper>
        )
    }
}

export default withSnackbar(DashboardPage);
