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
import Select from "react-select";
import * as Constants from "../../common/constants";

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
const STYLES_CONTAINER = css`
  padding-top:72px;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${Constants.system.grayLight};
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
    padding-left: 12px;
  }
`;
const customStyles = {
    option: (base, state) => ({
        ...base,
        background: "#212428",
        color: "#fff",
        borderRadius: state.isFocused ? "0" : 0,
        "&:hover": {
            background: "#16181b",
        }
    }),
    menu: base => ({
        ...base,
        background: "#212428 !important",
        borderRadius: 0,
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    }),
    control: (base, state) => ({
        ...base,
        padding: 2
    })
};
const options = [
    {value: 'All', label: 'All'},
    {value: 'Video', label: 'Video'},
    {value: 'Image', label: 'Image'},
]
class ExploreMarket extends Component {

    constructor(props) {
        super(props);
        this.onImgLoad = this.onImgLoad.bind(this);
        this.loadAllItems = this.loadAllItems.bind(this);
        this.state = {
            height: 0,
            items: [],
            filterItem:[],
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
        await this.loadAllItems();
    }

    _filterFiles = (option) => {
        const filters = this.state.items;
        if(option ===0 ){
            this.setState({
                filterItem:this.state.items
            })
        }else if(option ===1){
            let filteredFiles = filters.filter((file) => {
                return (
                    (file.filetype.startsWith("video/"))
                );
            });

            this.setState({
                filterItem:filteredFiles
            })
        }else if(option ===2){
            let filteredFiles = filters.filter((file) => {
                return (
                    (file.filetype.startsWith("image/"))
                );
            });

            this.setState({
                filterItem:filteredFiles
            })
        }
    };

    loadAllItems = async () => {
        const contract = new this.state.web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let result = await contract.methods.fetchMarketItems().call({from: this.state.accounts[0]}, function (error, result) {
        });
        console.log(result)
        this.setState({
            items: result
        })

        this._filterFiles(0);
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
        e.stopPropagation()
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
        this.props._showNFTDetail(nft,0);
    }

    onChange = selectedOption =>{
        console.log(selectedOption)
        const value = selectedOption.value;
        if(value === "Video"){
            this._filterFiles(1)
        }else if (value === 'Image'){
            this._filterFiles(2)
        }else {
            this._filterFiles(0)
        }
    }


    render() {
        return (
                <div css={STYLES_CONTAINER} >
                    <section className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className="items_filter">
                                    <div className='dropdownSelect one'>
                                        <Select
                                            onChange={this.onChange}
                                            className='select1' styles={customStyles}
                                            menuContainerStyle={{'zIndex': 999}}
                                            defaultValue={options[0]} options={options}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            {this.state.filterItem.map((nft, index) => (
                                <div key={index} className="d-item  col-md-6 col-sm-6 col-xs-12 mb-4" style={{width:280}}>
                                    <div className="nft__item m-0">
                                        <div onClick={(e)=>{this.showDetail(nft)}}  style={{paddingLeft:16,paddingRight:16,paddingTop:12,float:"left",display:"flex",alignItems:"center"}}>
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
                                                    <img onLoad={this.onImgLoad} src={getURLfromCID(nft.preCid)} onClick={(e)=>{this.showDetail(nft)}}
                                                         style={{width:230,height:280,boxSizing:"border-box",objectFit:"cover"}}
                                                         alt=""/>
                                                )
                                            }
                                        </div>
                                        <div className="nft__item_info" onClick={(e)=>{this.showDetail(nft)}} style={{paddingLeft:16,paddingRight:16}}>
                                <span >
                                     <h6>{nft.title} </h6>
                                </span>
                                            <>
                                                <span>{nft.description}</span>
                                                <div className="nft__item_action">
                                                    {web3.utils.fromWei(nft.price)+" "}<span>matic</span>
                                                </div>
                                                <div onClick={(e)=>this.like(e,nft)} className="nft__item_like" style={{color:nft.isMsgSenderLiked?"pink":"#ddd"}}>
                                                    <i className="fa fa-heart"></i><span>{nft.likeNum}</span>
                                                </div>
                                            </>
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
                    </section>
                </div>
        );
    }
}

export default withSnackbar(ExploreMarket);
