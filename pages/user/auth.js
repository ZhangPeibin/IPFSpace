import * as React from "react";
/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import {Divider} from "../../components/widget/Divider";
import {H3} from "../../components/widget/Typography";
import * as SVG from "/common/svg";
import * as Styles from "../../common/styles";
import * as Constants from "../../common/constants";
import Metamask from "../../components/core/Metamask";
import EmailSign from "../../components/core/EmailSign";
import Link from 'next/link'
import PasswordInput from "../../components/core/PasswordInput";
import * as Utilities from "../../common/utilities";

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

const AUTH_BACKGROUNDS = [
    "https://slate.textile.io/ipfs/bafkreih6q3baivs5e7of2e6ig4d5rg2uiio4amtt56nz4kexrmv5rmecta",
    "https://slate.textile.io/ipfs/bafybeichgslmsm43nsgaurtiono2774qkrqqces5uj7jdbvd4rwhjgj23y",
    "https://slate.textile.io/ipfs/bafybeibhhwcdrjile6v2vi5knrdntvinwbsxtxiuahskom6634nxvgdch4",
    "https://slate.textile.io/ipfs/bafybeieaprew4mzwnn43gjqimpas2skjxlddsk7kloxmw35x2oi75g223m",
    "https://slate.textile.io/ipfs/bafkreidbjytq4yjvlghj73m2l2fvy4rkbxdrfaclwotptwms3a24oybnp4",

];

const STEP = {
    STEP_METAMASK_PASSWORD : "METAMASK_PASSWORD"
}

export const BackgroundGenerator = ({ children, isMobile, ...props }) => {
    const background = React.useMemo(() => {
        const backgroundIdx = Utilities.getRandomNumberBetween(0, AUTH_BACKGROUNDS.length - 1);
        return AUTH_BACKGROUNDS[backgroundIdx];
    }, []);

    const [height, setHeight] = React.useState();

    React.useLayoutEffect(() => {
        if (!window) return;
        const updateHeight = () => {
            const windowInnerHeight = window.innerHeight;
            setHeight(windowInnerHeight);
        };

        updateHeight();
        // NOTE(amine): don't update height on mobile
        if (isMobile) return;

        window.addEventListener("resize", updateHeight);
        return () => window.addEventListener("resize", updateHeight);
    }, [isMobile]);

    return (
        <div style={{ backgroundImage: `url(${background})`, height }} {...props}>
            {children}
        </div>
    );
};

export default class AuthPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step:null
        }
    }


    metaMaskPassword = ()=>{
        this.setState(
            {
                step:STEP.STEP_METAMASK_PASSWORD
            }
        )
    }

    render() {
        return (
            <WebsitePrototypeWrapper>
                <BackgroundGenerator>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                {
                                    this.state.step==null && (
                                        <div
                                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                                            <H3
                                                style={{
                                                    textAlign: "center",
                                                    lineHeight: "30px",
                                                    padding: "36px 32px  24px 32px",
                                                }}
                                            >
                                                {"Store, experience, share files on IPFSpace"}
                                            </H3>
                                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                                <div
                                                    css={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItem: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <Metamask onAction={this.metaMaskPassword}/>

                                                    <Link href={"/user/mnemonic"}>
                                                        <button
                                                            css={{
                                                                backgroundColor: "#FF715E"
                                                            }}
                                                            className="mt-2 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                            type="button"
                                                            style={{transition: "all .15s ease"}}
                                                        >
                                                            Continue with Recovery Phrase
                                                        </button>
                                                    </Link>

                                                    <Divider
                                                        color="#AEAEB2"
                                                        width="45px"
                                                        height="0.5px"
                                                        style={{margin: "0px auto", marginTop: "20px"}}
                                                    />
                                                </div>
                                                <div className="text-gray-500 text-center mb-3 font-bold">
                                                    <small>Or sign in with email</small>
                                                </div>
                                                <form>
                                                    <EmailSign/>

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
                                    )
                                }
                                {
                                    this.state.step===STEP.STEP_METAMASK_PASSWORD &&
                                    <PasswordInput back={()=>this.setState({step:null})} />
                                }
                            </div>
                        </div>
                    </div>
                </BackgroundGenerator>
            </WebsitePrototypeWrapper>
        );
    }
}

