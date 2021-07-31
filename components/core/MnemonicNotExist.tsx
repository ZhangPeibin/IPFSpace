import * as React from "react";
import { useRouter } from 'next/router';

/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import {Divider} from "@components/widget/Divider";
import * as R from "@common/requests"

const MnemoincNotExist = ({mnemoin}) => {
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
        >
            <div className="text-gray-500 text-center mb-3 font-bold">
                <small>For the first time, start setting up now!</small>
            </div>

            <div
                style={{
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
                    {mnemoin || state.mnemonic}
                </p>
            </div>

            <button
                onClick={regenerateMnemonic}
                className="mt-2 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="button"
                style={{transition: "all .15s ease", backgroundColor: "#FF715E"}}
            >
                Regenerate one
            </button>

            <button
                onClick={next}
                className="mt-2 bg-orange-600 text-white active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="button"
                style={{transition: "all .15s ease",
                    display:state.mnemonic==null?"none":"block",
                    backgroundColor: "#FF715E"
                }}
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

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const response = await fetch("/api/token/mnemonic");
    const mnemoin = await response.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            mnemoin,
        },
    }
}

export default MnemoincNotExist;