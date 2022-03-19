import { IChainData } from "./types";

const supportedChains: IChainData[] = [
  {
    name: "Binance Smart Chain",
    short_name: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chain_id: 56,
    network_id: 56,
    rpc_url: "https://bsc-dataseed1.defibit.io/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  },
  {
    name: "Mumbai",
    short_name: "mumbai",
    chain: "Mumbai",
    network: "mumbai",
    chain_id: 80001,
    network_id: 80001,
    rpc_url: "https://rpc-mumbai.matic.today",
    native_currency: {
      symbol: "MATIC",
      name: "MATIC",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  }
];

export default supportedChains;
