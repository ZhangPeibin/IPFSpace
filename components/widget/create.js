import React from "react";
import {nftaddress,nftmarketaddress} from '../../config'
import {justUpload} from "../../common/fileupload";
import Web3Modal from "web3modal";
import Web3 from "web3";
import * as DDNFTMarket from "../../abi/DDNFTMarketplace"
import { Player } from 'video-react';
import {getURLfromCID} from "../../common/strings";

export default function Createpage(props) {
    const [preUrl, setPreUrl] = React.useState("");
    const [fileType, setFileType] = React.useState("");
    const [preCid, setPreCid] = React.useState("");
    const [title, setTitle] = React.useState("title");
    const [description, setDescription] = React.useState("this is description");
    const [loadingMsg,setLoadingMsg] = React.useState("")

    const onChange = async (e) => {
        var files = e.target.files;
        if (files && files.length>0) {
            const result = await justUpload(files[0])
            setFileType(result.type)
            console.log(result)
            setPreCid(result.cid)
            setPreUrl(getURLfromCID(result.cid))
        }
    }

    const _title = (e) => {
        setTitle((e.target.value))
    }
    const _description = (e) => {
        setDescription((e.target.value))
    }

    const mint = async (e) => {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        let userIcon = "";
        let userName = accounts[0];
        let userWebSite = "";

        if(props.userInfo){
            userIcon = props.userInfo.icon;
            userName = props.userInfo.name;
            userWebSite = props.userInfo.website;
        }
        let iscnId ;
        if(props.mintFile.iscnId){
            if(props.mintFile.iscnId.length>0){
                iscnId = props.mintFile.iscnId[0];
            }
        }
        setLoadingMsg("Minting Data NFT , Please waiting ...")
        const srcCid = props.mintFile.cid;
        const marketContract = new web3.eth.Contract(DDNFTMarket.ABI, nftmarketaddress);

        let transaction = await marketContract.methods.createNFT(
            userIcon,
            userName,
            userWebSite,
            srcCid,
            preCid,
            title,
            description,
            fileType,
            iscnId,
            props.mintFile.type,
            props.mintFile.size
        ).send({from: accounts[0]})
            .on('receipt', function (receipt) {

            });
        console.log("transaction")
        console.log(transaction)
        if(transaction){
            const  result = transaction["events"]["DDNFTCreated"]["returnValues"]['tokenId'];
            console.log(result)
            setLoadingMsg("NFT is listing on  the market , Please waiting ...")
            props._mintNFTSuccess(result,srcCid);
        }
    }

    return (
        <div>
            <section className='container' style={{marginTop:72}}>
                <div className="row">
                    <div className="col-lg-7 offset-lg-1 mb-5">
                        <form id="form-create-item" className="form-border" action="#">
                            <div className="field-set">
                                <h5>Upload Data preview</h5>
                                <p>Tip: Please upload a file that can describes your data </p>
                                <div className="d-create-file">
                                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                                    {preCid && (
                                        <p key="{index}">{preCid}</p>
                                    )}
                                    <div className='browse'>
                                        <input type="button" id="get_file" className="btn-main" value="Browse"/>
                                        <input id='upload_file' type="file" onChange={onChange}/>
                                    </div>

                                </div>

                                <div className="spacer-single"></div>

                                <h5>Title</h5>
                                <input onChange={_title} type="text" name="item_title" id="item_title"
                                       className="form-control"
                                       placeholder="e.g. 'Crypto Funk"/>

                                <div className="spacer-10"></div>

                                <h5>Description</h5>
                                <textarea onChange={_description} data-autoresize name="item_desc" id="item_desc"
                                          className="form-control"
                                          placeholder="e.g. 'This is very limited item'"></textarea>

                                <div className="spacer-10"></div>

                                {/*<h5>Price</h5>*/}
                                {/*<input onChange={_price} type="number" name="item_price" id="item_price"*/}
                                {/*       className="form-control"*/}
                                {/*       placeholder="enter price for one item (matic)"/>*/}

                                {/*<div className="spacer-10"></div>*/}

                                <p>{loadingMsg}</p>
                                <div className="spacer-2"></div>
                                {/*<h5>Royalties</h5>*/}
                                {/*<input type="text" name="item_royalties" id="item_royalties"*/}
                                {/*       className="form-control"*/}
                                {/*       placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"/>*/}

                                {/*<div className="spacer-10"></div>*/}

                                <button type="button" className="btn-main" onClick={mint}>Minting Data NFT</button>


                            </div>
                        </form>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-xs-12">
                        <h5>Preview item</h5>
                        <div className="nft__item m-0">
                            <div className="nft__item_wrap" >
                                <span>
                                    {
                                        fileType.startsWith("video")?(
                                            <Player
                                                playsInline
                                                src={preUrl}
                                            />
                                            ):(
                                            preUrl.length>0  && <img src={preUrl} style={{height:200, paddingLeft:16,paddingRight:16,objectFit:"cover"}} />
                                        )
                                    }
                                </span>
                            </div>
                            <div className="nft__item_info" style={{marginLeft:16,marginRight:16}}>
                                <span>
                                    <h6>{title}</h6>
                                </span>
                                <div className="nft__item_info" style={{marginBottom:23}}>
                                    <span>{description}</span>
                                </div>

                                {/*<div className="nft__item_price" style={{marginBottom:23}}>*/}
                                {/*    {price}<span>matic</span>*/}
                                {/*</div>*/}

                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

