import * as React from "react";
/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import {H3} from "../../components/widget/Typography";
import * as SVG from "/common/svg";
import * as Styles from "../../common/styles";
import * as Constants from "../../common/constants";
import MnemoincExist from "../../components/core/MnemonicExist";
import MnemoincNotExist from "../../components/core/MnemonicNotExist";
import {BackgroundGenerator} from "./auth";


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

export default class MnemonicPage extends React.Component {
    render() {
        return (
            <WebsitePrototypeWrapper>
                <BackgroundGenerator >
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div
                                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                                    <H3
                                        style={{
                                            textAlign: "center",
                                            lineHeight: "30px",
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
                                        <form>
                                            <MnemoincExist/>

                                            <div className="mt-28">
                                                <div style={{marginTop: "auto"}}>
                                                    <a css={STYLES_LINK_ITEM}
                                                       href="https://support.token.im/hc/en-us/articles/360002074233-What-is-Mnemonic-Phrase"
                                                       target="_blank">
                                                        <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
                                                            <SVG.RightArrow height="16px"
                                                                            style={{marginRight: 4}}/> What is Wallet
                                                            Recovery Phrase
                                                        </div>
                                                    </a>

                                                    <a css={STYLES_LINK_ITEM} style={{marginTop: 4}}
                                                       href="https://ipfser.org/2019/11/03/ipfsshengtaibaogao%e4%b8%a8an-overview-of-distributed-storage-ipfs/"
                                                       target="_blank">
                                                        <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
                                                            <SVG.RightArrow height="16px"
                                                                            style={{marginRight: 4}}/> What is IPFS
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BackgroundGenerator>
            </WebsitePrototypeWrapper>
        );
    }
}

