/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import Router from 'next/router'

import * as React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import {IAssetData} from "@components/core/web3/types";
import {getChainData} from "@components/core/web3/network";
import {getProviderOptions} from "@components/core/web3/providers";
import {generateMessageForEntropy, hashPersonalMessage, recoverPublicKey} from "@components/core/web3/signMessage";
import {BigNumber, utils} from "ethers";
import {PrivateKey} from "@textile/hub";
import {H3} from "@components/widget/Typography";
import * as Styles from "@common/styles";
import * as SVG from "@common/svg";
import * as Constants from "@common/constants";
import {withSnackbar} from "notistack";
import {IDXClient} from "@components/core/ceramic/IDXClient";
import {CircularProgress} from "@material-ui/core";


interface IAppState {
    fetching: boolean;
    address: string;
    web3: any;
    provider: any;
    connected: boolean;
    chainId: number;
    networkId: number;
    assets: IAssetData[];
    showModal: boolean;
    pendingRequest: boolean;
    result: any | null;
    secretKey: string;
    password: string;
    passwordAgain: string;
    loading: boolean;
}

const INITIAL_STATE: IAppState = {
    fetching: false,
    address: "",
    web3: null,
    provider: null,
    connected: false,
    chainId: 1,
    networkId: 1,
    assets: [],
    showModal: false,
    pendingRequest: false,
    result: null,
    secretKey: null,
    password: null,
    passwordAgain: null,
    loading: false
};

function initWeb3(provider: any) {
    const web3: any = new Web3(provider);

    web3.eth.extend({
        methods: [
            {
                name: "chainId",
                call: "eth_chainId",
                outputFormatter: web3.utils.hexToNumber
            }
        ]
    });

    return web3;
}

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

class Web3Wallet extends React.Component<any, any> {
    // @ts-ignore
    public web3Modal: Web3Modal;
    public state: IAppState;

    constructor(props: any) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
        };
    }

    async componentDidMount() {
        this.web3Modal = new Web3Modal({
            network: this.getNetwork(),
            cacheProvider: true,
            providerOptions: await getProviderOptions()
        });
    }

    public getNetwork = () => getChainData(this.state.chainId).network;


    public showMessage = (message) => {
        this.props.enqueueSnackbar(message,
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
    }

    public checkPassword = async () => {
        const password = this.state.password
        const passwordAgain = this.state.passwordAgain
        if (password != null) {
            const passwordLength = password.length;
            if (passwordAgain == null) {
                this.showMessage("please input password again!")
            } else {
                const passwordAgainLength = passwordAgain.length;
                if (passwordLength < 6 || passwordAgainLength < 6) {
                    this.showMessage("password length must be larger than 6!")
                } else {
                    if (password != passwordAgain) {
                        this.showMessage("password not equal passwordAgain!")
                    } else {
                        this.setState({
                            message: null
                        })
                        await this.handleLogin()
                    }
                }
            }
        } else {
            this.showMessage("please input password!")
        }
    }

    handleLogin = async () => {
        this.setState({
            loading: true
        })

        const provider = await this.web3Modal.connect();
        await this.subscribeProvider(provider);
        const web3: any = initWeb3(provider);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        const address = accounts[0];
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.chainId()
        const secretKey = this.state.password;
        await this.setState({
            web3,
            provider,
            connected: true,
            address,
            chainId,
            networkId,
            secretKey
        });

        console.log(address)
        //
        // const client = new IDXClient()
        // const result = await client.getDID(address, web3.eth.currentProvider)
        // console.log(result)
        await this.sign();
        this.setState({
            loading: false
        })
    }

    public sign = async () => {
        const {web3, address, secretKey} = this.state;
        const message = generateMessageForEntropy(address, "IPFSpace", secretKey)
        const hasPersonalMessage = hashPersonalMessage(message)
        const signedText = await web3.eth.sign(hasPersonalMessage, address);
        // const signer = recoverPublicKey(signedText, hasPersonalMessage);
        // const verified = signer.toLowerCase() === address.toLowerCase();
        // console.log(verified)
        // if (!verified) {
        //     this.showMessage("Signature information error")
        //     return;
        // }
        const hash = utils.keccak256(signedText);
        console.log(hash)
        const array = hash
            // @ts-ignore
            .replace('0x', '')
            // @ts-ignore
            .match(/.{2}/g)
            .map((hexNoPrefix) => BigNumber.from('0x' + hexNoPrefix).toNumber())

        if (array.length !== 32) {
            throw new Error('Hash of signature is not the correct size! Something went wrong!');
        }
        const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array))
        console.log(identity.toString())
        // @ts-ignore
        localStorage.setItem("identity", identity.toString())
        await Router.replace({pathname: "/dashboard"})
    }


    public subscribeProvider = async (provider: any) => {
        if (!provider.on) {
            return;
        }
        provider.on("close", () => {
            console.log("close")
        });
        provider.on("accountsChanged", async (accounts: string[]) => {
            await this.setState({address: accounts[0]});
            // await this.getAccountAssets();
            console.log("accountsChanged")
        });
        provider.on("chainChanged", async (chainId: number) => {
            const {web3} = this.state;
            const networkId = await web3.eth.net.getId();
            await this.setState({chainId, networkId});
            // await this.getAccountAssets();
            console.log("chainChanged")
        });

        provider.on("networkChanged", async (networkId: number) => {
            const {web3} = this.state;
            const chainId = await web3.eth.chainId();
            await this.setState({chainId, networkId});
            // await this.getAccountAssets();
            console.log("networkChanged")
        });
    };


    public _handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    public _handlePasswordAgain = (e) => {
        this.setState({
            passwordAgain: e.target.value
        })
    }

    render() {
        return (
            <div
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <H3
                    style={{
                        textAlign: "center",
                        lineHeight: "30px",
                        padding: "36px 32px  24px 32px",
                    }}
                >
                    {"Set Web3 Wallet's Password"}
                </H3>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <div className="relative w-full mb-3">
                            <label
                                className="block text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Password
                            </label>
                            <input
                                onChange={this._handlePassword}
                                type="password"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="password"
                                style={{
                                    transition: "all .15s ease", borderColor: "#FF715E",
                                    border: "none",
                                }}
                            />

                            <label
                                className="block  text-gray-700 text-xs font-bold mb-2 mt-4"
                                htmlFor="grid-password"
                            >
                                Password again
                            </label>
                            <input
                                onChange={this._handlePasswordAgain}
                                type="password"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="password again"
                                style={{
                                    transition: "all .15s ease", borderColor: "#FF715E",
                                    border: "none",
                                }}
                            />
                            {
                                <button
                                    onClick={(this.checkPassword)}
                                    className="mt-6 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                    type="button"
                                    style={{
                                        transition: "all .15s ease",
                                        backgroundColor: "#FF715E",
                                        alignContent: "center"
                                    }}
                                >
                                    {this.state.loading && <CircularProgress size={18} style={{color:"#faebd7",marginRight:"12px"}} />}
                                    {this.state.loading?"Connecting ..." :" Continue with Web3 Wallet"}
                                </button>
                            }
                        </div>

                        <div className="mt-28">
                            <div style={{marginTop: "auto"}}>
                                <div css={STYLES_LINK_ITEM}>
                                    <div css={Styles.HORIZONTAL_CONTAINER_CENTERED} onClick={(e) => this.props.back()}>
                                        <SVG.ArrowDownLeft height="16px"
                                                           style={{marginRight: 4}}/> Back
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default withSnackbar(Web3Wallet);
