import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";

export const getProviderOptions = async () => {
    const torus = (await import("@toruslabs/torus-embed")).default;
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "a197d00856fc465da5233ec948228a83"
            }
        },
        torus: {
            package: torus
        },
        fortmatic: {
            package: Fortmatic,
            options: {
                key: "pk_live_13EAC545EA21584E"
            }
        },
        // authereum: {
        //     package: Authereum,
        //     options: {
        //         networkName: 'mainnet',
        //         apiKey: 'y7edbh5uw4eTpLg8JAk7tHdzfMOT6wlB'
        //     }
        // },
    };
    return providerOptions;
};
