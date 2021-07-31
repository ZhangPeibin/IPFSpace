import * as React from "react";
import { useRouter } from 'next/router';

/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import {Divider} from "@components/widget/Divider";
import * as R from "@common/requests"

const MnemoincNotExist = () => {
    const router = useRouter();

    const [state, setState] = React.useState({
        mnemonic: null,
        loading: false,
    });

    const regenerateMnemonic = async () => {
        await R.onRegenerateMnemonic(state, setState);
    }

    const next = async () =>{
        const mnemonic = state.mnemonic;
        const identity = await R.onRegenerateIdentityByMnemonic(mnemonic)
        localStorage.setItem("identity",identity)
        await router.replace({pathname:"/dashboard"})
    }

    return (
        <div
            css={{
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                justifyContent: "center",
            }}
        >
            <div className="text-gray-500 text-center mb-3 font-bold">
                <small>For the first time, start setting up now!</small>
            </div>

            <div
                css={{
                    display:state.mnemonic==null?"none":"block",
                    backgroundColor:"#fff",
                    marginBottom:"0.3rem",
                    marginTop:"0.4rem",
                    paddingLeft:"0.6rem",
                    paddingRight:"0.4rem",
                    paddingTop:"0.8rem",
                    paddingBottom:"0.8rem",
                    borderRadius: "0.25rem",
                    boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                }}>
                <p>
                    {state.mnemonic}
                </p>
            </div>

            <button
                onClick={regenerateMnemonic}
                css={{
                    backgroundColor: "#FF715E"
                }}
                className="mt-2 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="button"
                style={{transition: "all .15s ease"}}
            >
                Regenerate one
            </button>

            <button
                onClick={next}
                css={{
                    display:state.mnemonic==null?"none":"block",
                    backgroundColor: "#FF715E"
                }}
                className="mt-2 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="button"
                style={{transition: "all .15s ease"}}
            >
                Next
            </button>

            <Divider
                color="#AEAEB2"
                width="45px"
                height="0.5px"
                style={{margin: "0px auto", marginTop: "20px"}}
            />
        </div>
        );
}

export default MnemoincNotExist;