import {PrivateKey} from "@textile/hub";
import * as bip39 from "bip39";
import {pbkdf2Sync} from "crypto";

export const generateMnemonic = async () => {
    var bip39Mnemonic = bip39.generateMnemonic();
    console.log("mnemonic:"+bip39Mnemonic)
    return bip39Mnemonic
};


export const generateIdentityByMnemonic = async (mnemonic) => {
    const seed= await pbkdf2Sync(mnemonic, 'anipfspace', 1024, 32, 'sha512');
    return new PrivateKey(seed, 'ed25519').toString();
};
