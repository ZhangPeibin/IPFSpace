/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AvatarPlaceholder from "./AvatarPlaceholder";
import {Avatar, TextareaAutosize, TextField} from "@material-ui/core";
import {justUpload} from "../../common/fileupload";
import {getURLfromCID} from "../../common/strings";

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

export default function EditProfile(props) {
    const sex = [
        {
            value: 'Men',
            label: 'men',
        },
        {
            value: 'Women',
            label: 'women',
        },
    ];
    const userInfo = props.userInfo

    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState('paper');
    const [currency, setCurrency] = React.useState(userInfo? userInfo.sex:"");
    const [icon, setIcon] = React.useState(userInfo?userInfo.icon:"");
    const [name, setName] = React.useState(userInfo?userInfo.name:"");
    const [location, setLocation] = React.useState(userInfo?userInfo.location:"");
    const [webSite, setWeb] = React.useState(userInfo?userInfo.website:"");
    const [description,setDescription] = React.useState(userInfo?userInfo.description:"");
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleWebSiteChange = (event) => {
        setWeb(event.target.value);
    };

    const handleClose = () => {
        props.handleClose();
    };

    const handleDescription = (event) =>{
        setDescription(event.target.value)
    }

    const handleOk = () => {
        props.handleClose();
        const profile = {
            "name":name,
            "location":location,
            "website":webSite,
            "icon":icon,
            "sex":currency,
            "description":description
        }
        props.editProfile(profile)
    };


    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const _handleUpload = async (e) => {
        const files = e.target.files;
        if (files) {
            const selectFile = files[0]
            if (selectFile) {
                if (selectFile.type.toString().indexOf("image") === -1) {
                    return alert("The file must be image")
                }

                const result = await justUpload(selectFile)
                console.log(result)
                setIcon(getURLfromCID(result.cid))
            }
        }
    };


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Edit Profile</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        style={{width: "480px",}}
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        <div style={{display: "table-cell", textAlign: "left"}}>
                            <input
                                css={STYLES_FILE_HIDDEN}
                                type="file"
                                id="file"
                                onChange={_handleUpload}
                            />

                            <label  htmlFor="file">
                                {
                                    icon ? (
                                        <Avatar style={{width:"64px",height:"64px"}}  src={icon} />
                                    ):(
                                        <AvatarPlaceholder  size={64}/>
                                    )
                                }

                            </label>

                            <div>
                                <TextField
                                    style={{marginTop: "36px"}}
                                    required
                                    value={name}
                                    id="outlined-required"
                                    label="Name "
                                    onChange={handleNameChange}
                                    defaultValue="your name"
                                    variant="outlined"
                                />
                            </div>

                            <div   style={{marginTop: "36px"}}>
                                <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label="Gender"
                                    value={currency}
                                    onChange={handleChange}
                                    variant="outlined"
                                    helperText="Please select your gender"
                                >
                                    {sex.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    style={{marginTop: "36px"}}
                                    id="outlined-required"
                                    label="Location "
                                    value={location}
                                    defaultValue="your location"
                                    variant="outlined"
                                    onChange={handleLocationChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    style={{marginTop: "36px"}}
                                    id="outlined-required"
                                    label="Website "
                                    value={webSite}
                                    onChange={handleWebSiteChange}
                                    defaultValue="your website"
                                    variant="outlined"
                                />
                            </div>

                            <div>
                                <TextField
                                    onChange={handleDescription}
                                    style={{marginTop: "36px"}}
                                    id="outlined-multiline-static"
                                    label="description"
                                    multiline
                                    rows={4}
                                    value={description}
                                    variant="outlined"
                                />
                            </div>
                        </div>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{color: "#3A3B3C"}}>
                        Cancel
                    </Button>
                    <Button onClick={handleOk} style={{color: "#FF715E"}}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}