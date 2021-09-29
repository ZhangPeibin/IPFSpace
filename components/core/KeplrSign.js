import * as React from "react";
/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import {useCallback, useEffect, useState} from "react";
import {toUtf8Bytes} from "ethers/lib/utils";
import {BigNumber, utils} from "ethers";
import {CircularProgress} from "@material-ui/core";
import {PrivateKey} from "@textile/hub";
import {initKeplr} from "../../common/iscn/keplr";
import {withSnackbar} from "notistack";

const EMAIL = css`
    borderColor: "#FF715E";
    focus: {
        borderColor: "#FF715E";
    };
    active: {
        borderColor: "#FF715E";
    } 
`

const KeplrSign = () => {
    const [loading,setLoading] = useState(false)
    const router = useRouter();

    const generateId = async (idToken) => {
        const hash = utils.keccak256(toUtf8Bytes(idToken));
        if (hash === null) {
            throw new Error('No account is provided. Please provide an account to this application.');
        }
        // The following line converts the hash in hex to an array of 32 integers.
        // @ts-ignore
        const array = hash
            // @ts-ignore
            .replace('0x', '')
            // @ts-ignore
            .match(/.{2}/g)
            .map((hexNoPrefix) => BigNumber.from('0x' + hexNoPrefix).toNumber())

        if (array.length !== 32) {
            throw new Error('Hash of signature is not the correct size! Something went wrong!');
        }

        const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array))
        localStorage.setItem('seed',JSON.stringify(array));
        localStorage.setItem("identity", identity.toString())
        localStorage.setItem("isAuthByKeplr","1")
        setLoading(false)
        await router.replace({pathname: "/dashboard"})
    }

    const onPrivateKey = async () => {
        setLoading(true)
        if (window.keplr) {
            const value = await initKeplr();
            if(value){
                const address = value[1]
                await generateId(address);
            }else{
                showMessage("Please install Keplr first")
            }
        } else {
            showMessage("Please install Keplr first")
        }
    }

    const showMessage = (message) => {
        this.props.enqueueSnackbar(message,
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
    }

    // @ts-ignore
    return (
        <div>
            <div className="text-center mt-4">
                <button
                    onClick={onPrivateKey}
                    className="bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="button"
                    style={{transition: "all .15s ease",backgroundColor: "#FF715E"}}
                >
                    {loading && <CircularProgress size={18} style={{color:"#faebd7",marginRight:"12px"}} />}
                    {loading?"Connecting with Magic and IDX ..." :" Continue with Keplr Wallet"}
                </button>
            </div>
        </div>
        );
}

export default withSnackbar(KeplrSign);
