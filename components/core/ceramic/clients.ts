import {EthereumAuthProvider, ThreeIdConnect} from "@3id/connect";
import { DID } from 'dids'
import type { AuthAccount } from '@ceramicstudio/multiauth'

import type { AppNetwork } from './config'
import { Core } from './core'
import {Ed25519Provider} from "key-did-provider-ed25519";
import KeyDidResolver from "key-did-resolver";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

export class WebClient extends Core {
  _threeId: ThreeIdConnect

  constructor(network: AppNetwork) {
    super(network)
    this._threeId = new ThreeIdConnect(this._config.connectNetwork)
  }

  get threeId(): ThreeIdConnect {
    return this._threeId
  }

  async connectByJsDID(seed:Uint8Array): Promise<DID>{
    const provider = new Ed25519Provider(seed)
    const resolver = { ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(this._ceramic) }
    const did = new DID({ resolver })
    this._ceramic.did = did
    this._ceramic.did.setProvider(provider)
    await this._ceramic.did.authenticate()
    return did
  }

  async authenticate(authProvider: EthereumAuthProvider, attachToCeramic = false): Promise<DID> {
    const did = await this.connect(authProvider)
    await did.authenticate()
    if (attachToCeramic) {
      this.ceramic.did = did
    }
    return did
  }

  async connect(authProvider: EthereumAuthProvider): Promise<DID> {
    await this._threeId.connect(authProvider)
    return new DID({ provider: this._threeId.getDidProvider(), resolver: this.resolver })
  }


  async authenticateByAddress(address: String,provider, attachToCeramic = false): Promise<DID> {
    // @ts-ignore
    const authProvider = new EthereumAuthProvider(provider, address)
    const did = await this.connect(authProvider)
    await did.authenticate()
    if (attachToCeramic) {
      this.ceramic.did = did
    }
    return did
  }
}
