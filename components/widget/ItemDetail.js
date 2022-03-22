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
    const handleBtnClick = () => {
            setOpenMenu(!openMenu);
            setOpenMenu1(false);
            document.getElementById("Mainbtn").classList.add("active");
            document.getElementById("Mainbtn1").classList.remove("active");
        }
    ;

    const buy = async () => {
        console.log(props.userInfo)
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        let userIcon = "";
        let userName = accounts[0];
        let userWebSite = "Unkown ";
        if(props.userInfo){
            userIcon = props.userInfo.icon;
            userName = props.userInfo.name;
            userWebSite = props.userInfo.website;
        }

        const marketContract = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let marketCreateTransaction = await marketContract.methods.createMarketSale(
            props.nftDetail.itemId,
            userIcon,userName,userWebSite
        ).send({from: accounts[0], value: props.nftDetail.price})
            .on('receipt', function (receipt) {
            });
        console.log("market create transaction")
        props._toNFT();
    }

    const  openISCN = async () => {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        const contract = new web3.eth.Contract(DDNFT.ABI, nftaddress);
        let result = await contract.methods.tokenMetadata(props.nftDetail.tokenId).call({from: accounts[0]}, function (error, result) {
        });
        console.log(result)
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
    const  cancelSell = async () =>{
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const marketContract = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let marketCreateTransaction = await marketContract.methods.cancelMarketItem(
            props.nftDetail.itemId,
        ).send({from: accounts[0]})
            .on('receipt', function (receipt) {
            });
        console.log("market create transaction")
        console.log(marketCreateTransaction)
        props._toNFT();
    }



    const showErrorMessage = (message)=>{
        props.enqueueSnackbar(message,
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
    }

    const  saveToMySpace = async () =>{
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(DDNFT.ABI, nftaddress);
        let result = await contract.methods.tokenMetadata(props.nftDetail.tokenId).call({from: accounts[0]}, function (error, result) {
        });
        if(result){
            props.saveNFTToSpace(result);
        }else{
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
            props.nftDetail.tokenId,
            !props.nftDetail.isMsgSenderLiked,
        ).send({from: accounts[0]})
            .on('receipt', function (receipt) {
            });
        console.log("likeDDNFT transaction")
        console.log(marketCreateTransaction)
    }

    return (
        <div>
            <GlobalStyles/>

            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>

                    <div className="col-md-6 text-center">
                        <img src={getURLfromCID(props.nftDetail.preCid)} className="img-fluid img-rounded mb-sm-30"
                             alt=""/>
                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            {props.nftDetail.onMarket ? "Seller":"Owner"}:
                            <h4>{props.nftDetail.onMarket ? props.nftDetail.seller:props.nftDetail.owner}</h4>
                            <h2>{props.nftDetail.title}</h2>
                            <div className="item_info_counts">
                                <div onClick={()=>like()}  className="item_info_like" style={{color:props.nftDetail.isMsgSenderLiked?"pink":"#ddd"}}><i className="fa fa-heart" ></i>{"  "+props.nftDetail.likeNum}
                                </div>
                            </div>
                            <p>{props.nftDetail.description}.</p>
                            <h6>Creator</h6>
                            <div className="item_author">
                                <div className="author_list_pp">
                                    {
                                        props.nftDetail.userIcon ? (
                                            <Avatar style={{marginTop: "4px", marginBottom: "4px"}} size="48px"
                                                    src={props.nftDetail.userIcon} flex={false}/>
                                        ) : (
                                            <AvatarPlaceholder did={""} size={64}/>
                                        )
                                    }
                                </div>
                                <div className="author_list_info">
                                    <div>
                                        <p  style={{color:"#000",padding:0 ,margin:0}}>
                                            {props.nftDetail.userName}
                                        </p>
                                        <a  href={"https://"+props.nftDetail.userWebSite} target={"_"} style={{color:"#262525"}}>
                                            {props.nftDetail.userWebSite}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="spacer-40"></div>

                            <div className="de_tab">

                                <ul className="de_nav">
                                    {
                                        props.nftIndex===0 && (
                                            <li id='Mainbtn' className="active"><span onClick={buy}>Buy</span></li>
                                        )
                                    }
                                    {
                                        props.nftIndex===1 && (
                                            <li id='Mainbtn' className="active"><span onClick={openISCN}>View ISCN</span></li>
                                        )
                                    }
                                    {
                                        props.nftIndex===1 && (
                                            <li id='Mainbtn' className="active"><span onClick={saveToMySpace}>Save To Space</span></li>
                                        )
                                    }
                                    {
                                        props.nftIndex===2 && (
                                            <li id='Mainbtn' className="active"><span onClick={cancelSell}>Cancel Sell</span></li>
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