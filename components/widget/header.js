import React, {useEffect, useState} from "react";
import Breakpoint, {BreakpointProvider, setDefaultBreakpoints} from "react-socks";
import {header} from 'react-bootstrap';
import * as SVGLogo from "../../common/logo";
import AccountButton from "./AccountButton";
import {Magic} from "magic-sdk";
import {css} from "@emotion/react";
import * as Constants from "../../common/constants";
import {searchISCNById} from "../../common/iscn/sign";
import {withSnackbar} from "notistack";
import { withRouter } from 'next/router'

const STYLES_CONTAINER = css`
  position: fixed;
  z-index: ${Constants.zindex.alert};
  background: #ffffff;
  width: 100%;
  margin: auto auto;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  transition: top 0.25s;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

setDefaultBreakpoints([
    {xs: 0},
    {l: 1199},
    {xl: 1200}
]);

const NavLink = props => (
    <div
        {...props}
        getProps={({isCurrent}) => {
            // the object returned here is passed to the
            // anchor element's props
            return {
                className: isCurrent ? 'active' : 'non-active',
            };
        }}
    />
);


const Header = function (props) {
    const [open, setOpen] = useState(false);

    const handleBtnClick = () => {
        props._goToHome();
    };
    const handleBtnClick1 = () => {
        props._goToMarketplace();
    };
    const handleBtnClick2 = () => {
        props._sharingPool();
    };
    const handleBtnClick3 = () => {
    };

    let magic;
    useEffect(function () {
        magic = window && new Magic("pk_live_26A238CA88F40218"); // ✨
    })

    useEffect(() => {
        window.addEventListener("resize", handleOpen);
        return () => window.removeEventListener("resize", handleOpen);
    });

    const handleOpen = () => {
        setOpen(false);
    };

    const exit = async () => {
        localStorage.clear();
        if (magic) {
            await magic.user.logout();
        }
        await props.router.replace({pathname: "/"})
    };


    const search = async (v) => {
        props._searchISCN(v);
    }

    return (
        <header css={STYLES_CONTAINER} id="myHeader" className='navbar white'>
            <div className='container'>
                <div className='row w-100-nav'>
                    <div className='logo px-0'>
                        <div className='navbar-title navbar-item'>
                            <a href={"/dashboard"}>
                                <SVGLogo.Logo/>
                            </a>
                        </div>
                    </div>

                    <div className='search'>
                        <input id="quick_search" className="xs-hide" name="quick_search"
                               placeholder="search iscn  here..." type="text" onKeyDown={(v)=>search(v)}/>
                    </div>

                    <BreakpointProvider>
                        <Breakpoint xl>
                            <div className='menu'>
                                <div className='navbar-item'>
                                    <div >
                                        <div className="dropdown-custom  btn"
                                             onClick={handleBtnClick}>
                                            Home
                                        </div>
                                    </div>
                                </div>
                                <div className='navbar-item'>
                                    <div >
                                        <div className="dropdown-custom  btn"
                                             onClick={handleBtnClick1}>
                                            Market
                                        </div>

                                    </div>
                                </div>
                                <div className='navbar-item'>
                                    <div >
                                        <div className="dropdown-custom  btn"
                                             onClick={handleBtnClick2}>
                                            Sharing
                                        </div>
                                    </div>
                                </div>
                                <div className='navbar-item'>
                                    <div >
                                        <div className="dropdown-custom  btn"
                                             onClick={(e)=>{props._goMyNFTs()}}>
                                            My NFTs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Breakpoint>
                    </BreakpointProvider>

                    <AccountButton name={props.userInfo==null? props.idx.substr(0, 20):props.userInfo.name}
                                   icon={props.userInfo==null?null:props.userInfo.icon}
                                   showProfile={props.showProfile}
                                   exit={exit}
                                   _getWeb3Storage={props._getWeb3Storage}
                                   idxLoading={props.idxLoading} idx={props.idx}/>
                </div>
            </div>
        </header>
    );
}
export default withRouter(Header);
