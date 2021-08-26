import * as nearAPI from "near-api-js";
import {connect, WalletConnection} from "near-api-js";
import {ConnectConfig} from "near-api-js/src/connect";


export class NearClient {

    config : ConnectConfig;

    constructor() {
        const { keyStores } = nearAPI;
        const keyStore = new keyStores.BrowserLocalStorageKeyStore();

        this.config = {
            networkId: "testnet",
            keyStore, // optional if not signing transactions
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            // explorerUrl: "https://explorer.testnet.near.org",
        };
    }

    async nearConnect() {
        const near = await connect(this.config);
        const wallet = new WalletConnection(near,null);
        const signIn = () => {
            wallet.requestSignIn(
                "example-contract.testnet", // contract requesting access
                "Example App", // optional
                "http://YOUR-URL.com/success", // optional
                "http://YOUR-URL.com/failure" // optional
            );
        };
        signIn();
    }
}