import {IChainData} from "@components/core/web3/types";
import supportedChains from "@components/core/web3/chains";

export function getChainData(chainId: number): IChainData {
    const chainData = supportedChains.filter(
        (chain: any) => chain.chain_id === chainId
    )[0];

    if (!chainData) {
        throw new Error("ChainId missing or not supported");
    }

    const API_KEY = "a197d00856fc465da5233ec948228a83";

    if (
        chainData.rpc_url.includes("infura.io") &&
        chainData.rpc_url.includes("%API_KEY%") &&
        API_KEY
    ) {
        const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

        return {
            ...chainData,
            rpc_url: rpcUrl
        };
    }

    return chainData;
}

