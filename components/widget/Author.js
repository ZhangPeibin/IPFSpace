import React, {useEffect} from "react";
import {createGlobalStyle} from 'styled-components';
import OnsaleColumn from "./OnsaleColumn";
import MyNFTColumn from "./MyNFTColumn";
import Web3Modal from "web3modal";
import Web3 from "web3";
import {Avatar} from "grommet";
import AvatarPlaceholder from "./AvatarPlaceholder";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
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

const Colection = function (props) {

    const [icon, setIcon] = React.useState(props.userInfo==null?null:props.userInfo.icon);
    const [openMenu, setOpenMenu] = React.useState(true);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [address, setAddress] = React.useState("");

    useEffect(async () => {
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0])
    })

    const handleBtnClick = () => {
        setOpenMenu(!openMenu);
        setOpenMenu1(false);
        document.getElementById("Mainbtn").classList.add("active");
        document.getElementById("Mainbtn1").classList.remove("active");
    };
    const handleBtnClick1 = () => {
        setOpenMenu1(!openMenu1);
        setOpenMenu(false);
        document.getElementById("Mainbtn1").classList.add("active");
        document.getElementById("Mainbtn").classList.remove("active");
    };



    const showNFTDetail = (nft)=>{
        props._showNFTDetail(nft,openMenu?2:1)
    }

    return (
        <div>
            <GlobalStyles/>
            <section className='container no-bottom' style={{marginTop: 64}}>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="d_profile de-flex">
                            <div className="de-flex-col">
                                <div className="profile_avatar" style={{alignItems:"center"}}>
                                    {
                                        icon ? (
                                            <Avatar style={{marginTop:"4px",marginBottom:"4px"}} size="64px" src={icon} flex={false} />
                                        ) : (
                                            <AvatarPlaceholder did={props.idx} size={64} />
                                        )
                                    }
                                    <div className="profile_name">
                                        <h4>
                                            {props.userInfo==null? props.idx.substr(0, 20):props.userInfo.name}
                                            <span className="profile_username">{props.userInfo==null? "":props.idx.substr(0, 20)}</span>
                                            <span id="wallet"
                                                  className="profile_wallet">{address}</span>
                                            <button id="btn_copy" title="Copy Text">Copy</button>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="profile_follow de-flex">*/}
                            {/*    <div className="de-flex-col">*/}
                            {/*        <div className="profile_follower">500 followers</div>*/}
                            {/*    </div>*/}
                            {/*    <div className="de-flex-col">*/}
                            {/*        <span className="btn-main">Follow</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                        </div>
                    </div>
                </div>
            </section>

            <section className='container no-top'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className="items_filter">
                            <ul className="de_nav text-left">
                                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                                <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>My NFT</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {openMenu && (
                    <div id='zero1' className='onStep fadeIn'>
                        <OnsaleColumn saveNFTToSpace={props.saveNFTToSpace} showNFTDetail={showNFTDetail}/>
                    </div>
                )}
                {openMenu1 && (
                    <div id='zero2' className='onStep fadeIn'>
                        <MyNFTColumn saveNFTToSpace={props.saveNFTToSpace} showNFTDetail={showNFTDetail}/>
                    </div>
                )}
                {/*{openMenu2 && ( */}
                {/*  <div id='zero3' className='onStep fadeIn'>*/}
                {/*   <ColumnZeroThree/>*/}
                {/*  </div>*/}
                {/*)}*/}
            </section>

        </div>
    );
}
export default Colection;