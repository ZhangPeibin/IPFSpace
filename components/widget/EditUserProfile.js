import React, { Component } from "react";
import { createGlobalStyle } from 'styled-components';
import {justUpload} from "../../common/fileupload";
import {Avatar} from "@material-ui/core";
import AvatarPlaceholder from "./AvatarPlaceholder";
import {css} from "@emotion/react";
import {getURLfromCID} from "../../common/strings";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

export default class EditUserProfile extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        const userInfo = props.userInfo
        this.state = {
            files: [],
            avatarCid:null,
            userInfo:userInfo,
            sex:userInfo? userInfo.sex:"",
            icon:userInfo?userInfo.icon:"",
            name:userInfo?userInfo.name:"",
            location:userInfo?userInfo.location:"",
            webSite:userInfo?userInfo.webSite:"",
            description:userInfo?userInfo.description:"",
        };
    }

    async onChange(e) {
        var files = e.target.files;
        if (files && files.length > 0) {
            const result = await justUpload(files[0])
            this.setState({
                avatarCid:result.cid,
                icon:getURLfromCID(result.cid)
            })
        }
    }

    saveProfile(e){
        const profile = {
            "name":this.state.name,
            "location":this.state.location,
            "website":this.state.webSite,
            "icon":this.state.icon,
            "description":this.state.description
        }
        console.log(profile)
        this.props.editProfile(profile)
    }

    render() {
        return (
            <section className='container' style={{marginTop:72}}>

                <div className="row">
                    <div className="col-lg-7 offset-lg-1 mb-5">
                        <form id="form-create-item" className="form-border" action="#">
                            <div className="field-set">
                                <h5>Upload Avatar file</h5>
                                <label  htmlFor="file">
                                    {
                                        this.state.icon ? (
                                            <Avatar style={{width:"64px",height:"64px"}}  src={this.state.icon} />
                                        ):(
                                            <AvatarPlaceholder  size={64}/>
                                        )
                                    }

                                </label>
                                <input
                                    css={STYLES_FILE_HIDDEN}
                                    type="file"
                                    id="file"
                                    onChange={this.onChange}
                                />

                                <div className="spacer-single"></div>

                                <h5>Name</h5>
                                <input type="text" name="item_title" id="item_title" className="form-control" placeholder={this.state.name?this.state.name:"enter your name here"}
                                       onChange={(e)=>{this.setState({name:e.target.value})}}/>

                                <div className="spacer-10"></div>

                                <h5>Description</h5>
                                <textarea data-autoresize name="item_desc" id="item_desc" className="form-control"
                                          placeholder={this.state.description?this.state.description:"enter your description here"}
                                          onChange={(e)=>{this.setState({description:e.target.value})}}></textarea>

                                <div className="spacer-10"></div>

                                <h5>WebSite</h5>
                                <input type="text" name="item_price" id="item_price" className="form-control" placeholder={this.state.webSite?this.state.webSite:"enter your website here"}
                                       onChange={(e)=>{this.setState({webSite:e.target.value})}}/>

                                <div className="spacer-10"></div>

                                <h5>Location</h5>
                                <input type="text" name="item_royalties" id="item_royalties" className="form-control" placeholder={this.state.location?this.state.location:"enter your location here"}
                                       onChange={(e)=>{this.setState({location:e.target.value})}}/>

                                <div className="spacer-10"></div>

                                <button type="button" className="btn-main" onClick={this.saveProfile}>Save your profile</button>

                            </div>
                        </form>
                    </div>
                </div>

            </section>
        );
    }
}