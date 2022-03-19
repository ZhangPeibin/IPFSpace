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

const BUTTON_LIKE = css`
  width: max-content;
  text-align: center;
  color: #382828 !important;
  background: #e2dbdb;
  border-radius: 0;
  letter-spacing: normal;
  outline: 0;
  font-weight: 800;
  text-decoration: none;
  padding: 8px 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const BUTTON_LIKEED = css`
  text-align: center;
  background: #e2dbdb;
  color: #e84545 !important;
  border-radius: 0;
  letter-spacing: normal;
  outline: 0;
  font-weight: 800;
  padding: 8px 20px;
  text-decoration: none;
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
  padding: 8px 40px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

class Responsive extends Component {

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

        await  this.loadMyCreateds();
    }

    loadMyCreateds = async () =>{
        const contract = new this.state.web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);
        let result = await contract.methods.fetchSharePoolItems().call({from: this.state.accounts[0]}, function (error, result) {
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

    async saveToMySpace(nft){
        const contract = new this.state.web3.eth.Contract(DDNFT.ABI, nftaddress);
        let result = await contract.methods.tokenMetadata(nft.tokenId).call({from: this.state.accounts[0]}, function (error, result) {
        });
        if(result){
            this.props.saveNFTToSpace(result);
        }else{
            this.showErrorMessage("Failed to request on-chain data, please try again!")
        }
    }

    async openISCN(nft){
        const contract = new this.state.web3.eth.Contract(DDNFT.ABI, nftaddress);
        let result = await contract.methods.tokenMetadata(nft.tokenId).call({from: this.state.accounts[0]}, function (error, result) {
        });
        console.log(result)
        if(result){
            const iscnId = result.iscnId;
            if (iscnId) {
                const url = "https://app.like.co/view/"+encodeURIComponent(iscnId)
                window.open(url)
            } else {
                this.showErrorMessage("Failed to request ISCN data, please try again!")
            }
        }else{
            this.showErrorMessage("Failed to request on-chain data, please try again!")
        }
    }

    showErrorMessage = (message)=>{
        this.props.enqueueSnackbar(message,
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
    }

    async like(nft){
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

    render() {
        return (
            <div className='row'>
                {this.state.items.map((nft, index) => (
                    <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
                        <div className="nft__item m-0">
                            {/*{ nft.deadline &&*/}
                            {/*    <div className="de_countdown">*/}
                            {/*        <Clock deadline={nft.deadline} />*/}
                            {/*    </div>*/}
                            {/*}*/}
                            <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                                <span>
                                    <img onLoad={this.onImgLoad} src={"https://ipfs.io/ipfs/" + nft.preCid}
                                         className="lazy nft__item_preview"
                                         alt=""/>
                                </span>
                            </div>
                            <div className="nft__item_info">
                                <span >
                                     <h6>{nft.title}</h6>
                                </span>
                                <div className="nft__item_action" style={{marginBottom:8}} >
                                    <span>{nft.description}</span>
                                </div>
                                <div>
                                    <span css={nft.isMsgSenderLiked?BUTTON_LIKEED:BUTTON_LIKE} onClick={()=>this.like(nft)} >Total liked :{nft.likeNum} </span>
                                </div>
                                <div className="nft__item_price" style={{marginBottom:23}}>
                                    <div style={{float:"left",display:'flex',marginBottom:12,marginTop:12}}>
                                        <button type="button" className="btn-main" style={{marginTop:6,marginRight:6}} onClick={()=>this.openISCN(nft)} >ISCN</button>
                                        <button type="button" className="btn-main" style={{marginTop:6}} onClick={()=>this.saveToMySpace(nft)} >Save</button>
                                    </div>
                                </div>

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

export default withSnackbar(Responsive);
