import {COSMOS_DENOM, DEFAULT_GAS_PRICE_NUMBER} from './constant/index';
import network from "@common/iscn/constant/network";
import {configToKeplrCoin} from "@common/iscn/index";


export async function initKeplr(){
    if (window.keplr && window.keplr.experimentalSuggestChain) {
        try {
            await window.keplr.experimentalSuggestChain({
                chainId: network.id,
                chainName: network.name,
                rpc: network.rpcURL,
                rest: network.apiURL,
                stakeCurrency: configToKeplrCoin(network.stakingDenom),
                walletUrlForStaking: network.stakingWalletURL,
                bip44: {
                    coinType: 118,
                },
                bech32Config: {
                    bech32PrefixAccAddr: network.addressPrefix,
                    bech32PrefixAccPub: `${network.addressPrefix}pub`,
                    bech32PrefixValAddr: `${network.addressPrefix}valoper`,
                    bech32PrefixValPub: `${network.addressPrefix}valoperpub`,
                    bech32PrefixConsAddr: `${network.addressPrefix}valcons`,
                    bech32PrefixConsPub: `${network.addressPrefix}valconspub`,
                },
                currencies: network.coinLookup.map(({viewDenom}) => configToKeplrCoin(viewDenom)),
                feeCurrencies: network.coinLookup.map(({viewDenom}) => configToKeplrCoin(viewDenom)),
                coinType: 118,
                gasPriceStep: {
                    low: DEFAULT_GAS_PRICE_NUMBER,
                    average: DEFAULT_GAS_PRICE_NUMBER,
                    high: DEFAULT_GAS_PRICE_NUMBER,
                },
            });
            await window.keplr.enable(network.id);
            const offlineSigner = window.getOfflineSigner(network.id);
            const accounts = await offlineSigner.getAccounts();
            return [offlineSigner,accounts[0].address];
        } catch (error) {
            console.error(error);
        }
    }
    return null;
}

