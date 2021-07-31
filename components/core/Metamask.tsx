
import * as React from "react";
import {BigNumber, providers, utils} from 'ethers'
import {hashSync} from 'bcryptjs'
import {PrivateKey} from "@textile/hub";
import { useRouter } from 'next/router';
import {sign} from "blurhash/dist/utils";

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

const Metamask = (props) => {
    const onAction = props.onAction;
    const [currentState, dispatch] = React.useReducer(reducer, "idle");
    const [account, setAccount] = React.useState();
    const router = useRouter();

    if (process.browser && !window.ethereum) {
        return <button
            css={{
                backgroundColor: "#636566"
            }}
            className="bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
            type="button"
            style={{transition: "all .15s ease"}}
        >
            Metamask disabled
        </button>;
    }

    useDetectMetaMask({onDetection: () => dispatch("confirmMetamask")});




    let currentAccount = null;
    const handleLogin = async () => {
        onAction();
        // currentAccount = await generatePrivateKey()
        // localStorage.setItem("identity",currentAccount.toString())
        // await router.replace({pathname:"/dashboard"})
    };

    const handleAccountsChange = (accounts) => {
        console.log(accounts);
        if (accounts.length === 0) {
            alert("ERROR, Please connect to Metamask wallet on your computer");
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
        }
        setAccount(currentAccount);
    };

    if (typeof window !== "undefined") {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChange);
        }
    }

    return (
        <button
            onClick={(handleLogin)}
            css={{
                backgroundColor: "#FF715E"
            }}
            className="bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
            type="button"
            style={{transition: "all .15s ease"}}
        >
            Continue with Metamask
        </button>
    );
};

const useDetectMetaMask = ({onDetection}) => {
    React.useEffect(() => {
        if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
            const response = onDetection();
            console.log("detection response", response);
        }
    }, []);
};

export default Metamask;
