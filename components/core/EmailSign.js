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

const EMAIL = css`
    borderColor: "#FF715E";
    focus: {
        borderColor: "#FF715E";
    };
    active: {
        borderColor: "#FF715E";
    } 
`

const EmailSign = () => {
    let email = "";
    const [loading,setLoading] = useState(false)
    const router = useRouter();
    let magic;
    useEffect(function (){
        magic = window && new Magic("pk_live_893A36ED60BCFF42"); // ✨
    })
    const login = useCallback(async () => {
        if(magic){
            console.log(email)
            if (await magic.user.isLoggedIn())  {
                await generateId(email)
            } else {
                // Log in the user
                await magic.auth.loginWithMagicLink({ email });
                await generateId(email)
            }
        }
    }, [email]);

    const onInputChange = (target)=>{
        email =  target.currentTarget.value;
    }

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

        setLoading(false)
        const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array))
        localStorage.setItem('seed',JSON.stringify(array));
        console.log(identity.toString())
        localStorage.setItem("identity", identity.toString())
        await router.replace({pathname: "/dashboard"})
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const onPrivateKey = async () => {
        setLoading(true)
        const isEmail = validateEmail(email);
        if(!isEmail){
            alert("Invalid email address !");
            return;
        }
        await login();
    }

    // @ts-ignore
    return (
        <div>
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Email
                </label>
                <input
                    css={EMAIL}
                    onChange={onInputChange}
                    type="email"
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Email"
                    style={{transition: "all .15s ease"}}
                />
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={onPrivateKey}
                    className="bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="button"
                    style={{transition: "all .15s ease",backgroundColor: "#FF715E"}}
                >
                    {loading && <CircularProgress size={18} style={{color:"#faebd7",marginRight:"12px"}} />}
                    {loading?"Connecting with Magic and IDX ..." :" Sign In"}
                </button>
            </div>
        </div>
        );
}

export default EmailSign;