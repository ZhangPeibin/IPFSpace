import React from "react";
import {createGlobalStyle} from 'styled-components';
import {getURLfromCID} from "../../common/strings";
import {Avatar} from "grommet";
import AvatarPlaceholder from "./AvatarPlaceholder";
import * as DDNFTMarket from "../../abi/DDNFTMarketplace";
import {nftactionaddress, nftaddress, nftmarketaddress} from "../../config";
import Web3Modal from "web3modal";
import Web3 from "web3";
import * as DDNFT from "../../abi/DDNFT";
import {withSnackbar} from "notistack";
import * as DDAction from "../../abi/DDAction";
import {Player} from "video-react";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }

  @media only screen and (max-width: 1199px) {
    .navbar {
      background: #403f83;
    }

    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2 {
      background: #111;
    }

    .item-dropdown .dropdown a {
      color: #111 !important;
    }
  }
`;


const NFTItemDetail = function (props) {
    const [openMenu, setOpenMenu] = React.useState(true);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [detail, setDetail] = React.useState(props.nftDetail);


    const buy = async () => {
        console.log(props.userInfo)
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        let userIcon = "";
        let userName = accounts[0];
        let userWebSite = "";
        if (props.userInfo) {
            userIcon = props.userInfo.icon;
            userName = props.userInfo.name;
            userWebSite = props.userInfo.website;
        }

        const marketContract = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let marketCreateTransaction = await marketContract.methods.createMarketSale(
            detail.itemId,
            userIcon, userName, userWebSite
        ).send({from: accounts[0], value: detail.price})
            .on('receipt', function (receipt) {
            });
        console.log("market create transaction")
        props._toNFT();
    }

    const openISCN = async () => {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        const marketContrac = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        await marketContrac.methods.addViewCount(detail.itemId).send({from: accounts[0]}, function (error, result) {
        });

        const newItemDetails = await marketContrac.methods.getItemAtIndex(detail.itemId).call({from: accounts[0]}, function (error, result) {
        });
        setDetail(newItemDetails)

        const contract = new web3.eth.Contract(DDNFT.ABI, nftaddress);
        let result = await contract.methods.tokenMetadata(detail.tokenId).call({from: accounts[0]}, function (error, result) {
        });
        if (result) {
            const iscnId = result.iscnId;
            if (iscnId) {
                const url = "https://app.like.co/view/" + encodeURIComponent(iscnId)
                window.open(url)
            } else {
                showErrorMessage("Failed to request ISCN data, please try again!")
            }
        } else {
            showErrorMessage("Failed to request on-chain data, please try again!")
        }
    }
    const cancelSell = async () => {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const marketContract = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let marketCreateTransaction = await marketContract.methods.cancelMarketItem(
            detail.itemId,
        ).send({from: accounts[0]})
            .on('receipt', function (receipt) {
            });
        console.log("market create transaction")
        console.log(marketCreateTransaction)
        props._toNFT();
    }


    const showErrorMessage = (message) => {
        props.enqueueSnackbar(message,
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
    }

    const saveToMySpace = async () => {

        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        const marketContrac = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        await marketContrac.methods.addDownloadCount(detail.itemId).send({from: accounts[0]}, function (error, result) {
        });
        const newItemDetails = await marketContrac.methods.getItemAtIndex(detail.itemId).call({from: accounts[0]}, function (error, result) {
        });
        setDetail(newItemDetails)

        const contract = new web3.eth.Contract(DDNFT.ABI, nftaddress);
        let result = await contract.methods.tokenMetadata(detail.tokenId).call({from: accounts[0]}, function (error, result) {
        });
        if (result) {
            props.saveNFTToSpace(result);
        } else {
            showErrorMessage("Failed to request on-chain data, please try again!")
        }
    }


    const like = async () => {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        const ddactionContract = new web3.eth.Contract(DDAction.ABI, nftactionaddress)
        let marketCreateTransaction = await ddactionContract.methods.likeDDNFT(
            detail.tokenId,
            !detail.isMsgSenderLiked,
        ).send({from: accounts[0]})
            .on('receipt', function (receipt) {
            });
        console.log("likeDDNFT transaction")
        console.log(marketCreateTransaction)
    }

    return (
        <div>
            <GlobalStyles/>

            <section className='container' style={{marginTop:16}}>
                <div className='row mt-md-5 pt-md-4'>

                    <div className="col-md-6 text-center">
                        {
                            detail.filetype && detail.filetype.startsWith("video") ? (
                                <Player
                                    playsInline
                                    src={getURLfromCID(detail.preCid)}
                                />
                            ):(
                                <img src={getURLfromCID(detail.preCid)} className="img-fluid img-rounded mb-sm-30"
                                     alt=""/>
                            )
                        }

                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            {detail.onMarket ? "Seller" : "Owner"}:
                            <h4>{detail.onMarket ? detail.seller : detail.owner}</h4>
                            <h2>{detail.title}</h2>
                            <div className="item_info_counts">
                                <div className="item_info_type"><i className="fa "></i>{detail.downloadCount}</div>
                                <div className="item_info_type"><i className="fa fa-eye"></i>{detail.viewCount}</div>
                                <div onClick={() => like()} className="item_info_like"
                                     style={{color: detail.isMsgSenderLiked && "pink" }}><i
                                    className="fa fa-heart"></i>{"  " + detail.likeNum}
                                </div>
                            </div>
                            <p>{detail.description}.</p>
                            <h6>Creator</h6>
                            <div className="item_author" style={{alignItems: "center"}}>
                                <div className="author_list_pp">
                                    {
                                        detail.userIcon ? (
                                            <Avatar size="48px"
                                                    src={detail.userIcon} flex={false}/>
                                        ) : (
                                            <AvatarPlaceholder did={""} size={48}/>
                                        )
                                    }
                                </div>
                                <div style={{marginLeft: 64,alignItems:"center"}}>
                                    <div>
                                        <p style={{color: "#000", padding: 0, margin: 0}}>
                                            {detail.userName}
                                        </p>

                                        {
                                            detail.userWebSite && detail.userWebSite.length>0 &&(
                                                <a href={"https://" + detail.userWebSite} target={"_"}
                                                   style={{color: "#262525"}}>
                                                    {detail.userWebSite}
                                                </a>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="spacer-40"></div>

                            <div className="de_tab">

                                <ul className="de_nav">
                                    {
                                        props.nftIndex === 0 && (
                                            <li id='Mainbtn' className="active"><span onClick={buy}>Buy</span></li>
                                        )
                                    }
                                    {
                                        props.nftIndex === 1 && (
                                            <li id='Mainbtn' className="active"><span
                                                onClick={openISCN}>View ISCN</span></li>
                                        )
                                    }
                                    {
                                        props.nftIndex === 1 && (
                                            <li id='Mainbtn1' style={{color: "#FF715E"}}><span onClick={saveToMySpace}>Save Data</span></li>
                                        )
                                    }
                                    {
                                        props.nftIndex === 2 && (
                                            <li id='Mainbtn' className="active"><span
                                                onClick={cancelSell}>Cancel Sell</span></li>
                                        )
                                    }
                                </ul>

                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
export default withSnackbar(NFTItemDetail);