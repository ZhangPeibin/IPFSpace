/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Avatar, TextareaAutosize, TextField} from "@material-ui/core";
import EditableTagGroup from "./EditableTagGroup";
import { withSnackbar } from 'notistack';
import {transferAuth} from "../../common/iscn/constant/iscn.type";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function EditISCN(props) {

    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState('paper');
    const [title, setTitle] = React.useState(props.cidToISCNFilename?props.cidToISCNFilename:"");
    const [author, setAuthor] = React.useState("");
    const [aurl, setAurl] = React.useState("");
    const [aintro, setAintro] = React.useState("");
    const [likerID, setLikerID] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [license, setLicense] = React.useState("");
    const [description,setDescription] = React.useState("");
    let tags = []

    const handleDescription = (event) =>{
        setDescription(event.target.value)
    }

    const handleTagChanged = (v) =>{
        tags = v
        console.log(tags)
    }

    const handleClose = () => {
        props.handleClose();
    };


    const handleOk = async () => {
        if (!title) {
            props.enqueueSnackbar("The 'Title' cannot be empty",
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                })
            return
        }

        if (!description) {
            props.enqueueSnackbar("The 'Description' cannot be empty",
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                })
            return
        }

        if (!author) {
            props.enqueueSnackbar("The 'author' cannot be empty",
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                })
            return
        }

        const address = props.keplrAddress
        const cid = props.cidToISCN

        const authJson = {
            "name":author,
            "url": aurl?[aurl]:[],
            "wallet":[],
            "likerId":likerID,
        }
        const auths = [authJson]
        const authsResult = transferAuth(auths)
        const payload = {
            type: "ddshare-data",
            name: title,
            description: description,
            tagsString: tags.join(','),
            url: url,
            license: license,
            ipfsHash: cid,
            fileSHA256: cid,
            cosmosWallet: address,
            likerIds: [likerID],
            descriptions: [aintro],
            authorNames:[author],
            authorUrls:authsResult,
            authorWallets:[[]]
        }
        props.editISCNBack(payload)
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
                <DialogTitle id="scroll-dialog-title"
                             style={{color:"#FF715E"}}
                >Add metadata to your ISCN</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        style={{width: "480px",}}
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >

                        <div style={{display: "table-cell", textAlign: "left"}}>
                            <div>
                                <TextField
                                    style={{
                                        marginTop: "18px",}}
                                    required
                                    value={title}
                                    id="outlined-required"
                                    label=" Title "
                                    defaultValue={"24234"}
                                    size="small"
                                    onChange={(v)=>{
                                        setTitle(v.target.value)
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    style={{marginTop: "18px"}}
                                    value={author}
                                    size="small"
                                    id="outlined-required"
                                    label=" Author"
                                    onChange={(v)=>{
                                        setAuthor(v.target.value)
                                    }}
                                    variant="outlined"
                                />
                            </div>

                            <div>
                                <TextField
                                    style={{marginTop: "18px"}}
                                    value={aurl}
                                    size="small"
                                    id="outlined-required"
                                    label=" Author URL"
                                    onChange={(v)=>{
                                        setAurl(v.target.value)
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    style={{marginTop: "18px"}}
                                    value={aintro}
                                    size="small"
                                    id="outlined-required"
                                    label=" Author Intro"
                                    onChange={(v)=>{
                                        setAintro(v.target.value)
                                    }}
                                    variant="outlined"
                                />
                            </div>

                            <div>
                                <TextField
                                    style={{marginTop: "18px"}}
                                    value={likerID}
                                    size="small"
                                    id="outlined-required"
                                    label=" Author LikerID"
                                    onChange={(v)=>{
                                        setLikerID(v.target.value)
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    style={{marginTop: "18px"}}
                                    value={url}
                                    size="small"
                                    id="outlined-required"
                                    label=" WebSite URL"
                                    onChange={(v)=>{
                                        setUrl(v.target.value)
                                    }}
                                    variant="outlined"
                                />
                            </div>

                            <div>
                                <TextField
                                    style={{marginTop: "18px"}}
                                    value={license}
                                    id="outlined-required"
                                    label=" License"
                                    size="small"
                                    onChange={(v)=>{
                                        setLicense(v.target.value)
                                    }}
                                    variant="outlined"
                                />
                            </div>

                            <div  style={{marginTop: "18px"}}>
                                <h>Tags</h>
                            </div>
                            <div>
                                <EditableTagGroup tagChanged={handleTagChanged}/>
                            </div>
                            <div>
                                <TextField
                                    onChange={handleDescription}
                                    style={{marginTop: "18px"}}
                                    required
                                    size="small"
                                    id="outlined-multiline-static"
                                    label=" Description"
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
                    {
                        props.iscnLoading && <Spin indicator={antIcon} />
                    }
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

export default withSnackbar(EditISCN)