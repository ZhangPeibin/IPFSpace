import {WebClient} from "@components/core/ceramic/clients";
import {APP_NETWORK} from "@components/core/ceramic/config";
import {DID} from "dids";

export class IDXClient {

    _webClient:WebClient

    constructor() {
        this.createWebClient()
    }

    createWebClient(){
        this._webClient = new WebClient(APP_NETWORK)
    }

    async getDID(address: string, provider) :Promise<DID>{
        if(!this._webClient){
            this.createWebClient()
        }

        const did : DID = await this._webClient.authenticateByAddress(address, provider,true)
        return did
    }

    async writeUserInfo() :Promise<DID>{
        return null;
    }

}