// eslint-disable-next-line import/no-extraneous-dependencies
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {QueryClient, setupBankExtension, BankExtension, Coin} from "@cosmjs/stargate";
import BigNumber from 'bignumber.js';

import config from './constant/network';
import {COSMOS_DENOM} from "./constant/index";
import {esimateISCNTxGasAndFee, formatISCNTxPayload, signISCNTx} from "@common/iscn/sign";
import network from "./constant/network";

let queryClient: QueryClient & BankExtension;



async function initQueryClient() {
    const tendermintClient = await Tendermint34Client.connect(config.rpcURL);
    queryClient = QueryClient.withExtensions(
        tendermintClient,
        setupBankExtension,
    );
    return queryClient;
}

export async function getQueryClient() {
    if (!queryClient) await initQueryClient();
    return queryClient;
}

export function amountToLIKE(likecoin: Coin) {
    if (!likecoin) return -1;
    if (likecoin.denom === COSMOS_DENOM) {
        return (new BigNumber(likecoin.amount)).dividedBy(1e9).toFixed();
    }
    console.error(`${likecoin.denom} is not supported denom`);
    return -1;
}

export function configToKeplrCoin(denom: string) {
    const c = config.coinLookup.find(coin => coin.viewDenom === denom);
    if (!c) return {};
    return {
        coinDenom: c.viewDenom,
        coinMinimalDenom: c.chainDenom,
        coinDecimals: c.chainToViewConversionFactor
            .toString()
            .split('.')[1].length,
        coinGeckoId: c.coinGeckoId,
    };
}

export async function calculateTotalFee(payload,address){
    const [
        balance,
        estimation,
    ] = await Promise.all([
        getAccountBalance(address),
        esimateISCNTxGasAndFee(formatISCNTxPayload(payload)),
    ])
    const { iscnFee, gas: iscnGasEstimation } = estimation;
    const iscnGasNanolike = iscnGasEstimation.fee.amount[0].amount
    const iscnFeeNanolike = iscnFee.amount[0]
    const totalFee = new BigNumber(iscnFeeNanolike)
        .plus(iscnGasNanolike)
        .shiftedBy(-9)
    return [balance,totalFee]
}

export async function getAccountBalance(address: string) {
    const client = await getQueryClient();
    return amountToLIKE(await client.bank.balance(address, COSMOS_DENOM));
}

export function isCosmosTransactionHash(input: string) {
    return /^[0-9a-f]{64}$/i.test(input);
}
