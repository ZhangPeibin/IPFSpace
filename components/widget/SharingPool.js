import React from 'react';
import {css} from "@emotion/react";
import * as Constants from "../../common/constants";
import SharingPoolColumn from "./SharingPoolColumn";

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

const BUTTON_BLACK = css`
  width: max-content;
  text-align: center;
  color: #fff !important;
  background: #222;
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

const BUTTON_HOME = css`
  width: max-content;
  text-align: center;
  color: #222 !important;
  background: #d5d3d3;
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
    {value: 'All categories', label: 'All categories'},
    {value: 'Art', label: 'Art'},
    {value: 'Music', label: 'Music'},
    {value: 'Domain Names', label: 'Domain Names'}
]
const options1 = [
    {value: 'Buy Now', label: 'Buy Now'},
    {value: 'On Auction', label: 'On Auction'},
    {value: 'Has Offers', label: 'Has Offers'}
]
const options2 = [
    {value: 'All Items', label: 'All Items'},
    {value: 'My Items', label: 'My Items'},
]


export default function SharingPool(props){
    const showNFTDetail = (nft)=>{
        props._showNFTDetail(nft,1)
    }

    return (
        <div css={STYLES_CONTAINER}>
            <section className='container'>
                <SharingPoolColumn saveNFTToSpace={props.saveNFTToSpace} showNFTDetail={showNFTDetail}/>
            </section>
        </div>
    );

}