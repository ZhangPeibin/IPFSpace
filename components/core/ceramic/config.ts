export type ConnectNetwork = 'local' | 'dev-unstable' | 'testnet-clay' | 'mainnet'

export type AppNetwork = ConnectNetwork | 'local-clay'

export type ConfigURLs = {
  ceramic: string
  connectNetwork: ConnectNetwork
  verificationsServer?: string
}


export const APP_NETWORK: AppNetwork =
    (process.env.NEXT_PUBLIC_APP_NETWORK as AppNetwork | undefined) ?? ('testnet-clay' as AppNetwork)



const NETWORK_CONFIGS: Record<AppNetwork, ConfigURLs> = {
  'dev-unstable': {
    ceramic: 'https://ceramic-private-dev.3boxlabs.com',
    connectNetwork: 'dev-unstable',
  },
  local: {
    ceramic: 'http://localhost:7007',
    connectNetwork: 'local',
  },
  'local-clay': {
    ceramic: 'https://ceramic-clay.3boxlabs.com/',
    connectNetwork: 'testnet-clay',
    verificationsServer: 'https://ceramic-clay.3boxlabs.com/',
  },
  'testnet-clay': {
    //http://45.63.127.179:7007/
    ceramic: 'https://ceramic-clay.3boxlabs.com/',
    // ceramic: 'http://anipfs.space:7007/',
    connectNetwork: 'testnet-clay',
    verificationsServer: 'http://anipfs.space:7007/',
  },
  mainnet: {
    ceramic: 'https://ceramic-private.3boxlabs.com',
    connectNetwork: 'mainnet',
    verificationsServer: 'https://verifications.3boxlabs.com',
  },
}

export function getConfig(network: AppNetwork): ConfigURLs {
  const exists = NETWORK_CONFIGS[network]
  if (exists == null) {
    throw new Error(`Unsupported Ceramic network: ${network}`)
  }
  return exists
}
