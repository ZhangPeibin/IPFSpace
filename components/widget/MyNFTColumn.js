import React, {Component} from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import * as DDNFTMarket from "../../abi/DDNFTMarketplace";
import {nftaddress, nftmarketaddress,nftactionaddress} from "../../config";
import web3 from "web3";
import {css} from "@emotion/react";
import {withSnackbar} from "notistack";
import * as DDNFT from "../../abi/DDNFT";
import * as DDAction from "../../abi/DDAction"
import {Avatar, Text} from "grommet";
import AvatarPlaceholder from "./AvatarPlaceholder";
import Script from "next/script";
import {Player} from "video-react";
import {getURLfromCID} from "../../common/strings";

const BUTTON_LIKE = css`
  width: max-content;
  text-align: center;
  color: #fff !important;
  background: #382828;
  border-radius: 0;
  letter-spacing: normal;
  outline: 0;
  font-weight: 800;
  text-decoration: none;
  padding: 2px 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const BUTTON_LIKEED = css`
  width: max-content;
  text-align: center;
  color: #fff !important;
  background: #e84545;
  border-radius: 0;
  letter-spacing: normal;
  outline: 0;
  font-weight: 800;
  text-decoration: none;
  padding: 2px 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const BUTTON_WHITE = css`
  width: max-content;
  text-align: center;
  color: #222 !important;
  background: #FFF;
  border-radius: 0;
  letter-spacing: normal;
  outline: 0;
  font-weight: 800;
  text-decoration: none;
  padding: 0px 40px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

class MyNFTColumn extends Component {

    constructor(props) {
        super(props);
        this.onImgLoad = this.onImgLoad.bind(this);
        this.state = {
            height: 0,
            items: [],
        };
    }

    async componentDidMount() {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        this.setState({
            web3: web3,
            accounts: accounts,

        })

        await  this.loadMyNFTs();
    }



    loadMyNFTs = async () =>{
        const contract = new this.state.web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let result = await contract.methods.fetchMyNFTs().call({from: this.state.accounts[0]}, function (error, result) {
        });
        console.log(result)
        this.setState({
            items: result
        })
    }


    onImgLoad({target: img}) {
        let currentHeight = this.state.height;
        if (currentHeight < img.offsetHeight) {
            this.setState({
                height: img.offsetHeight
            })
        }
    }

    async like(e,nft){
        e.stopPropagation();
        const ddactionContract = new this.state.web3.eth.Contract(DDAction.ABI, nftactionaddress)
        let marketCreateTransaction = await ddactionContract.methods.likeDDNFT(
            nft.tokenId,
            !nft.isMsgSenderLiked,
        ).send({from: this.state.accounts[0]})
            .on('receipt', function (receipt) {
            });
        console.log("likeDDNFT transaction")
        console.log(marketCreateTransaction)

        await this.loadAllItems();
    }


    showDetail(nft){
        console.log(nft)
        this.props.showNFTDetail(nft);
    }

    render() {
        return (
            <div className='row'>
                {this.state.items.map((nft, index) => (
                    <div key={index} className="d-item  col-md-6 col-sm-6 col-xs-12 mb-4" style={{width:280}}>
                        <div className="nft__item m-0">
                            <div onClick={(e)=>{this.showDetail(nft)}} style={{paddingLeft:16,paddingRight:16,paddingTop:12,float:"left",display:"flex",alignItems:"center"}}>
                                {
                                    (nft.userIcon  && nft.userIcon.length>0)? (
                                        <Avatar style={{marginTop:"4px",marginBottom:"4px"}} size="36px" src={nft.userIcon} flex={false} />
                                    ) : (
                                        <AvatarPlaceholder did={nft.own} size={36} />
                                    )
                                }
                                <div style={{display:"block"}}>
                                    <div>
                                        <h4 style={{marginLeft:16,color:"#000"}}>
                                            {nft.userName.substr(0,10)}
                                        </h4>
                                    </div>
                                    {
                                        nft.userWebSite && nft.userWebSite.length>0 &&
                                        <div>
                                        <span  style={{marginLeft:16,color:"#000"}}>
                                            {nft.userWebSite}
                                        </span>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="nft__item_wrap"  >
                                {
                                    nft.filetype && nft.filetype.startsWith("video") ? (
                                        <Player
                                            playsInline
                                            src={getURLfromCID(nft.preCid)}
                                        />
                                    ):(
                                        <img
                                            onClick={(e)=>{this.showDetail(nft)}}
                                             onLoad={this.onImgLoad} src={getURLfromCID(nft.preCid)}
                                             style={{width:230,height:280,boxSizing:"border-box",objectFit:"cover"}}
                                             alt=""/>
                                    )
                                }
                            </div>
                            <div className="nft__item_info" onClick={(e)=>{this.showDetail(nft)}} style={{paddingLeft:16,paddingRight:16}}>
                                <span >
                                     <h6>{nft.title} </h6>
                                </span>
                                {
                                    <>
                                        <div>
                                            <span>{nft.description}</span>
                                            <div onClick={(e)=>this.like(e,nft)} className="nft__item_like" style={{color:nft.isMsgSenderLiked?"pink":"#ddd"}}>
                                                <i className="fa fa-heart"></i><span>{nft.likeNum}</span>
                                            </div>
                                        </div>
                                    </>
                                }

                                <div style={{marginTop:16}}> </div>

                            </div>
                        </div>
                    </div>
                ))}
                {/*{this.state.nfts.length !== this.dummyData.length &&*/}
                {/*<div className='col-lg-12'>*/}
                {/*    <div className="spacer-single"></div>*/}
                {/*    <span onClick={() => this.loadMore()} className="btn-main lead m-auto">Load More</span>*/}
                {/*</div>*/}
                {/*}*/}
            </div>

        );
    }
}

export default withSnackbar(MyNFTColumn);
