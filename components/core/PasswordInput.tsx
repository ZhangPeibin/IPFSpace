/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import {H3} from "../widget/Typography";
import * as Styles from "../../common/styles";
import * as SVG from "../../common/svg";
import * as React from "react";
import * as Constants from "../../common/constants";
import {BigNumber, providers, utils} from "ethers";
import {PrivateKey} from "@textile/hub";
import {useRouter} from "next/router";
import {useState} from "react";

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


declare global {
    interface Window {
        ethereum: any;
    }
}

class StrongType<Definition, Type> {
    // @ts-ignore
    private _type: Definition;

    constructor(public value?: Type) {
}
}

type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: providers.ExternalProvider };

export class EthereumAddress extends StrongType<'ethereum_address', string> {
}


const META_TASK_STATE_GRAPH = {
    idle: {confirmMetamask: "metamaskExist"},
    metamaskExist: {signin: "signingIn"},
    signingIn: {success: "signedIn", error: "error"},
    signedIn: {diconnect: "idle"},
    error: {signin: "signingIn"},
};

const reducer = (state, event) => {
    const nextState = META_TASK_STATE_GRAPH[state][event];
    return nextState !== undefined ? nextState : state;
};


let password  ="";
let passwordAgain  ="";

const PasswordInput = (props)=>{
    const backAction =  props.back;
    const router = useRouter();
    const [state,setState] = useState({
        message:null
    });

    function back() {
        backAction()
    }


    const generateMessageForEntropy = (ethereum_address: EthereumAddress, application_name: string, secret: string) => {
        return (
            '******************************************************************************** \n' +
            'READ THIS MESSAGE CAREFULLY. \n' +
            'DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE \n' +
            'ACCESS TO THIS APPLICATION. \n' +
            'DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT \n' +
            'TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n' +
            '******************************************************************************** \n' +
            'The Ethereum address used by this application is: \n' +
            '\n' +
            ethereum_address.value +
            '\n' +
            '\n' +
            '\n' +
            'By signing this message, you authorize the current application to use the \n' +
            'following app associated with the above address: \n' +
            '\n' +
            application_name +
            '\n' +
            '\n' +
            '\n' +
            'The hash of your non-recoverable, private, non-persisted password or secret \n' +
            'phrase is: \n' +
            '\n' +
            secret +
            '\n' +
            '\n' +
            '\n' +
            '******************************************************************************** \n' +
            'ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE KEYS \n' +
            'ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. \n' +
            'AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND \n' +
            'WRITE ACCESS TO THIS APPLICATION. \n' +
            '******************************************************************************** \n'
        );
    }


    const getSigner = async () => {
        if (!(window as WindowInstanceWithEthereum).ethereum) {
            throw new Error(
                'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
            );
        }

        // @ts-ignore
        const provider = new providers.Web3Provider((window as WindowInstanceWithEthereum).ethereum);
        const signer = provider.getSigner();
        return signer
    }

    const getAddressAndSigner = async ()=> {
        const signer = await getSigner();
        const accounts = await (window as WindowInstanceWithEthereum).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            throw new Error('No account is provided. Please provide an account to this application.');
        }

        const address = new EthereumAddress(accounts[0]);

        return {address, signer}
    }

    const generatePrivateKey = async (): Promise<PrivateKey> => {
        const metamask = await getAddressAndSigner()
        // avoid sending the raw secret by hashing it first
        const secret = password
        const message = generateMessageForEntropy(metamask.address, 'IPFSpace', secret)
        const signedText = await metamask.signer.signMessage(message);
        console.log(signedText)
        const hash = utils.keccak256(signedText);
        console.log(hash)
        if (hash === null) {
            throw new Error('No account is provided. Please provide an account to this application.');
        }
        // The following line converts the hash in hex to an array of 32 integers.
        // @ts-ignore
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
        return identity;
        // Your app can now use this identity for generating a user Mailbox, Threads, Buckets, etc

    }
    const handleLogin = async () => {
        if(password!=null){
            const passwordLength = password.length;
            if(passwordAgain==null){
                setState({
                    message:"please input password again!"
                })
            }else{
                const passwordAgainLength = passwordAgain.length;
                if( passwordLength < 6 || passwordAgainLength<6){
                    setState({
                        message:"password  length must be larger than 6!"
                    })
                }else{
                    if(password != passwordAgain){
                        setState({
                            message:"password not equal passwordAgain!"
                        })
                    }else{
                        setState({
                            message:null
                        })
                        const identity = await generatePrivateKey()
                        localStorage.setItem("identity", identity.toString())
                        await router.replace({pathname: "/dashboard"})
                    }
                }
            }
        }else{
            setState({
                message:"please input password!"
            })
        }
    }

    const _handlePassword =(e)=> {
        password = e.target.value;
        console.log(password)
    }

    const _handlePasswordAgain =(e)=> {
        passwordAgain = e.target.value;
        console.log(passwordAgain)
    }

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
                {"Enter password for your metamask auth"}
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
                            onChange={_handlePassword}
                            type="password"
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="password"
                            style={{transition: "all .15s ease",borderColor: "#FF715E",
                                border:"none",}}
                        />

                        <label
                            className="block  text-gray-700 text-xs font-bold mb-2 mt-4"
                            htmlFor="grid-password"
                        >
                            Password again
                        </label>
                        <input
                            onChange={_handlePasswordAgain}
                            type="password"
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="password again"
                            style={{transition: "all .15s ease",borderColor: "#FF715E",
                                border:"none",}}
                        />
                        {
                            state.message &&(
                                <div style={{
                                    color: "#FF715E"
                                }} className="text-gray-500 text-center mt-6 font-bold">
                                    <small>{ state.message}</small>
                                </div>
                            )
                        }


                        <button
                            onClick={(handleLogin)}
                            className="mt-6 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="button"
                            style={{transition: "all .15s ease",backgroundColor: "#FF715E"}}
                        >
                            Continue with Metamask
                        </button>
                    </div>

                    <div className="mt-28">
                        <div style={{marginTop: "auto"}}>
                            <div css={STYLES_LINK_ITEM}>
                                <div css={Styles.HORIZONTAL_CONTAINER_CENTERED} onClick={(e)=>back()}>
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

export default PasswordInput;