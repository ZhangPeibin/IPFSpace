import {EthereumAuthProvider, ThreeIdConnect} from "@3id/connect";
import { DID } from 'dids'
import type { AuthAccount } from '@ceramicstudio/multiauth'

import type { AppNetwork } from './config'
import { Core } from './core'

export class WebClient extends Core {
  _threeId: ThreeIdConnect

  constructor(network: AppNetwork) {
    super(network)
    this._threeId = new ThreeIdConnect(this._config.connectNetwork)
  }

  get threeId(): ThreeIdConnect {
    return this._threeId
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
