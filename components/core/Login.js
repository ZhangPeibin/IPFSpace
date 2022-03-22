import React from "react";
import EmailSign from "./EmailSign";
import Web3Wallet from "./web3/Web3Wallet";

const Login = (props)=>{
    return (
        <div >
            <div className="box-login">
                <h3 className="mb10">Sign In</h3>
                <p>You can login with web3 wallet or email .<span>All validation is done on the user side</span>.</p>
                <form name="contactForm" id='contact_form' className="form-border" action='#'>

                    <div className="field-set">
                        {/*<button className="btn btn-main btn-fullwidth color-2"> MetaMask</button>*/}
                        <Web3Wallet/>
                    </div>


                    <p style={{marginTop:8}}>Or sign in with email.</p>
                    <EmailSign/>
                    <div className="clearfix"></div>
                    <div className="spacer-single"></div>
                </form>
            </div>
        </div>
    )
}

export default Login;