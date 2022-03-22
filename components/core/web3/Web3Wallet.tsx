/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import * as React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import {IAssetData} from "@components/core/web3/types";
import {getChainData} from "@components/core/web3/network";
import {generateMessageForEntropy, hashPersonalMessage} from "@components/core/web3/signMessage";
import {BigNumber, utils} from "ethers";
import {PrivateKey} from "@textile/hub";
import * as Constants from "@common/constants";
import {CircularProgress} from "@material-ui/core";
import { withRouter, NextRouter } from 'next/router'

interface WithRouterProps {
    router: NextRouter
}
interface MyComponentProps extends WithRouterProps {}


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
    loading: boolean;
}

const INITIAL_STATE: IAppState = {
    fetching: false,
    address: "",
    web3: null,
    provider: null,
    connected: false,
    chainId: 80001,
    networkId: 80001,
    assets: [],
    showModal: false,
    pendingRequest: false,
    result: null,
    secretKey: null,
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

class Web3Wallet extends React.Component<MyComponentProps > {
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
        });
    }

    public getNetwork = () => getChainData(this.state.chainId).network;


    switchNetworkMumbai = async (web3) => {
        try {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x13881" }],
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await web3.currentProvider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: "0x13881",
                                chainName: "Mumbai",
                                rpcUrls: ["https://rpc-mumbai.matic.today"],
                                nativeCurrency: {
                                    name: "Matic",
                                    symbol: "Matic",
                                    decimals: 18,
                                },
                                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
                            },
                        ],
                    });
                } catch (error) {
                    alert(error.message);
                }
            }
        }
    }

    handleLogin = async () => {
        this.setState({
            loading: true
        })
        const provider = await this.web3Modal.connect();
        await this.subscribeProvider(provider);
        const web3: any = initWeb3(provider);
        await this.switchNetworkMumbai(web3);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        const address = accounts[0];
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.chainId()
        console.log(chainId)
        console.log(networkId)
        const secretKey = "0xDeDeDeShare.io";
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
        await this.sign();
        this.setState({
            loading: false
        })
    }

    public sign = async () => {
        const {web3, address, secretKey} = this.state;
        const message = generateMessageForEntropy(address, "DDshare", secretKey)
        const hasPersonalMessage = hashPersonalMessage(message)
        const signedText = await web3.eth.sign(hasPersonalMessage, address);
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
        localStorage.setItem('seed',JSON.stringify(array));
        // @ts-ignore
        localStorage.setItem("identity", identity.toString())
        await this.props.router.replace({pathname: "/dashboard"})
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
                >
                <button
                    onClick={(this.handleLogin)}className="btn btn-main btn-fullwidth color-2"
                    type="button"
                >
                    {this.state.loading && <CircularProgress size={18} style={{color:"#faebd7",marginRight:"12px"}} />}
                    {this.state.loading?"Connecting ..." :" MetaMask"}
                </button>
            </div>
        )
    }
}


export default withRouter(Web3Wallet);
