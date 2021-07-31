import * as React from "react";
import { useRouter } from 'next/router';

/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import * as R from "@common/requests";


const MnemoincExist = () => {
    const router = useRouter();

    let mnemonic = "";
    const onInputChange = (target)=>{
        mnemonic =  target.currentTarget.value;
    }

    const onPrivateKey = async () => {
        const identity = await R.onRegenerateIdentityByMnemonic(mnemonic)
        localStorage.setItem("identity",identity)
        await router.replace({pathname:"/dashboard"})
    }

    // @ts-ignore
    return (
        <div>
            <div className="relative w-full mb-3">
                <label
                    className="block  text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Your wallet's recovery phrase
                </label>
                <textarea
                    css={{
                        borderColor: "#FF715E",
                        border:"none",
                        overflow:"hidden",
                        resize:"none",
                        height:"5rem",
                        focus: {
                            borderColor: "#FF715E",
                            outline:"none",
                        },
                        active: {
                            borderColor: "#FF715E",
                            outline:"none",
                        }
                    }}
                    onChange={onInputChange}
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="recovery phrase"
                    style={{transition: "all .15s ease"}}
                />
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={onPrivateKey}
                    css={{
                        backgroundColor: "#FF715E"
                    }}
                    className="bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="button"
                    style={{transition: "all .15s ease"}}
                >
                    Next
                </button>
            </div>
        </div>
        );
}

export default MnemoincExist;