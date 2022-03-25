import React, {Component} from 'react'
// 助记词登录组件
/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import {H3} from "../widget/Typography";
import * as SVG from "../../common/svg";
import * as Styles from "../../common/styles";
import * as Constants from "../../common/constants";
import {useRouter} from 'next/router';
import * as R from "@common/requests";


const STYLES_LINK_ITEM = (theme) => css`
  display: block;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  margin-top: 2px;
  transition: 200ms ease all;
  word-wrap: break-word;


  :hover {
    color: ${Constants.system.redlight3};
  }
`;

const MnemoincExist = () => {
    const router = useRouter();
    let mnemonic = "";
    const onInputChange = (target) => {
        mnemonic = target.currentTarget.value;
    }

    const onPrivateKey = async () => {
        const identity = await R.onRegenerateIdentityByMnemonic(mnemonic)
        localStorage.setItem("identity", identity)
        await router.replace({pathname: "/dashboard"})
    }

    // @ts-ignore
    return (
        <div>
            <div className="relative w-full mb-3">
                <label
                    className="block  text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Your wallet's recovery phrase
                </label>
                <textarea
                    onChange={onInputChange}
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="recovery phrase"
                    style={{
                        transition: "all .15s ease", borderColor: "#FF715E",
                        border: "none",
                        overflow: "hidden",
                        resize: "none",
                        height: "5rem",
                    }}
                />
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={onPrivateKey}
                    className="bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="button"
                    style={{transition: "all .15s ease", backgroundColor: "#FF715E"}}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

const MnemoincNotExist = ({mnemoin}) => {
    const router = useRouter();

    const [state, setState] = React.useState({
        mnemonic: null,
        loading: false,
    });

    const regenerateMnemonic = async () => {
        await R.onRegenerateMnemonic(state, setState);
    }

    const next = async () => {
        const mnemonic = state.mnemonic;
        const identity = await R.onRegenerateIdentityByMnemonic(mnemonic)

        localStorage.setItem("identity", identity)
        await router.replace({pathname: "/dashboard"})
    }

    return (
        <div
        >
            <div className="text-gray-500 text-center mb-3 font-bold">
                <small>For the first time, start setting up now!</small>
            </div>

            <div
                style={{
                    display: state.mnemonic == null ? "none" : "block",
                    backgroundColor: "#fff",
                    marginBottom: "0.3rem",
                    marginTop: "0.4rem",
                    paddingLeft: "0.6rem",
                    paddingRight: "0.4rem",
                    paddingTop: "0.8rem",
                    paddingBottom: "0.8rem",
                    borderRadius: "0.25rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                }}>
                <p>
                    {mnemoin || state.mnemonic}
                </p>
            </div>

            <button
                onClick={regenerateMnemonic}
                className="mt-2 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="button"
                style={{transition: "all .15s ease", backgroundColor: "#FF715E"}}
            >
                Regenerate one
            </button>

            <button
                onClick={next}
                className="mt-2 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="button"
                style={{
                    transition: "all .15s ease",
                    display: state.mnemonic == null ? "none" : "block",
                    backgroundColor: "#FF715E"
                }}
            >
                Next
            </button>

            {/* <Divider
                color="#AEAEB2"
                width="45px"
                height="0.5px"
                style={{margin: "0px auto", marginTop: "20px"}}
            /> */}
        </div>
    );
}



export default class Mnemonic extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <div
                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                    <H3 style={{
                        textAlign: "center",
                        padding: "36px 32px  24px 32px",
                    }}
                    >
                        {"Use wallet's recovery phrase for security"}
                    </H3>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <MnemoincNotExist/>
                        <div className="text-gray-500 text-center mb-3 font-bold">
                            <small>Or I already have an account mnemonic.</small>
                        </div>

                        <MnemoincExist/>

                        <div className="mt-28">
                            <div style={{marginTop: "auto"}}>
                                <div css={STYLES_LINK_ITEM}>
                                    <div css={Styles.HORIZONTAL_CONTAINER_CENTERED} onClick={() => this.props.back()}>
                                        <SVG.ArrowDownLeft height="16px" style={{marginRight: 4}}/> Back
                                    </div>
                                </div>

                                <a css={STYLES_LINK_ITEM}
                                   href="https://support.token.im/hc/en-us/articles/360002074233-What-is-Mnemonic-Phrase"
                                   target="_blank">
                                    <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
                                        <SVG.RightArrow height="16px" style={{marginRight: 4}}/> What is Wallet Recovery
                                        Phrase
                                    </div>
                                </a>

                                <a css={STYLES_LINK_ITEM} style={{marginTop: 4}}
                                   href="https://ipfser.org/2019/11/03/ipfsshengtaibaogao%e4%b8%a8an-overview-of-distributed-storage-ipfs/"
                                   target="_blank">
                                    <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
                                        <SVG.RightArrow height="16px" style={{marginRight: 4}}/> What is IPFS
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



