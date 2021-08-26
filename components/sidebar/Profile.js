/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import * as React from "react";
import * as Constants from "../../common/constants";

import {FileTypeGroup} from "../core/FileTypeIcon";
import {P1, P} from "../widget/Typography";
import {ButtonPrimary} from "../widget/Buttons";
import {SidebarWarningMessage} from "../core/WarningMessage";
import * as Strings from "../../common/strings";
import {Alert, CheckBox, Dismiss} from "../../common/svg";
import {LoaderSpinner} from "../widget/Loaders";
import {DataMeterBar} from "../../common/DataMeter";
import * as Events from "../../common/custom-events";


const sidebar = css`
  height: 100%;
  width: 100%;
  padding: 32px 16px;
  background-color: ${Constants.system.backgroundColor};
`;


const howto = css`
  padding: 12px;
  display: block;
  background-color:#faf5f5;
`;

export default class Profile extends React.Component {
    state = {
        token: "",
    };


    _handleChanged = (e) => {
        this.setState({
            token:e.currentTarget.value
        })
    };

    render() {
        return (
            <div css={sidebar}>
                <P1
                    style={{
                        fontFamily: Constants.font.semiBold,
                        fontSize: Constants.typescale.lvl3,
                        marginBottom: 36,
                    }}>
                    How to get <a style={{color: "#FF715E"}} >1T free space </a> ?
                </P1>

                <div css={howto}>
                    <P style={{color: "#1C1D1E", marginBottom: "4px",}}>
                        1 . Go to <a style={{color: "#FF715E"}} target={'_blank'}
                                     href={"https://web3.storage/login"}> web3.storage/login</a> to get started.
                    </P>
                    <P style={{color: "#1C1D1E", marginBottom: "4px",}}>
                        2 . Enter your email address or connect with your github
                    </P>
                    <P style={{marginBottom: "4px", color: "#1C1D1E"}}>
                        3 . Check your email or Authorize by Github
                    </P>
                    <P style={{marginBottom: "4px", color: "#1C1D1E"}}>
                        4 . Click Create an API token.
                    </P>
                    <P style={{marginBottom: "4px", color: "#1C1D1E"}}>
                        4 . Enter a descriptive name for your API token and click Create.
                    </P>
                    <P style={{marginBottom: "4px", color: "#1C1D1E"}}>
                        5 . You can click Copy to copy your new API token to your clipboard.
                    </P>
                    <P style={{marginBottom: "4px", color: "#1C1D1E"}}>
                        5 . Finally, copy the API token in the input box below and click set button
                    </P>
                </div>

                {/*<di  style={{*/}
                {/*    marginTop:32,*/}
                {/*    background:"#FFFFD5"*/}
                {/*}} css={howto}>*/}

                {/*    <P1*/}
                {/*        style={{*/}
                {/*            fontFamily: Constants.font.semiBold,*/}
                {/*            fontSize: Constants.typescale.lvl3,*/}
                {/*            marginBottom: 8,*/}
                {/*        }}*/}
                {/*    >   {"Keep your API token private"}*/}
                {/*    </P1>*/}
                {/*    <P style={{marginBottom:"4px",color:"#1C1D1E"}}>*/}
                {/*        1 . Do not share your API token with anyone else. This key is specific to your account.*/}
                {/*    </P>*/}
                {/*    <P style={{color:"#1C1D1E"}}>*/}
                {/*        2 . Your token only exists in your local area and will not be on the service.*/}
                {/*    </P>*/}
                {/*</di>*/}

                <div>
                    <P1
                        style={{
                            fontFamily: Constants.font.semiBold,
                            fontSize: Constants.typescale.lvl3,
                            marginBottom: 16,
                            marginTop: 32
                        }}
                    >   {" Fill in your API Token  below"}
                    </P1>

                    <input
                        onChange={this._handleChanged}
                        type="password"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Your api toen"
                        style={{
                            transition: "all .15s ease", borderColor: "#FF715E",
                            border: "none",
                        }}
                    />
                    <P style={{color: "#1C1D1E",fontSize:"13px",marginTop:"12px",marginLeft:"8px"}}>
                         Your token only exists in your local area and will not be on the service.
                    </P>

                    <button
                        onClick={()=>this.props.setApiToken(this.state.token)}
                        className="bg-orange-600 text-white mt-4 active:bg-orange-200 text-sm font-bold  px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style={{transition: "all .15s ease", backgroundColor: "#FF715E"}}
                    >
                        Set You Token
                    </button>
                </div>

            </div>
        );
    }
}
