/** @jsx jsx */
import {jsx, css} from "@emotion/react";
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditableTagGroup from "./EditableTagGroup";
import {withSnackbar} from 'notistack';
import {transferAuth} from "../../common/iscn/constant/iscn.type";
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import Select from "react-select";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


const customStyles = {
    option: (base, state) => ({
        ...base,
        background: "#fff",
        color: "#333",
        borderRadius: state.isFocused ? "0" : 0,
        "&:hover": {
            background: "#eee",
        }
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    }),
    control: (base, state) => ({
        ...base,
        padding: 2
    })
};
const options = [
    {value: 'MIT License', label: 'MIT License'},
    {value: 'Creative Commons Zero v1.0 Universal', label: 'Creative Commons Zero v1.0 Universal'},
    {value: 'Microsoft Public License', label: 'Microsoft Public License'},
    {value: 'GNU Lesser General Public License v2.1', label: 'GNU Lesser General Public License v2.1'},
    {value: 'GNU General Public License v2.0', label: 'GNU General Public License v2.0'},
    {value: 'The Unlicense',label:"The Unlicense"}
]

function EditISCN(props) {

    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState('paper');
    const [title, setTitle] = React.useState(props.cidToISCNFilename ? props.cidToISCNFilename : "");
    const [author, setAuthor] = React.useState("");
    const [aurl, setAurl] = React.useState("");
    const [aintro, setAintro] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [license, setLicense] = React.useState("");
    const [description, setDescription] = React.useState("");
    let tags = []

    const handleDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleTagChanged = (v) => {
        tags = v
        console.log(tags)
    }

    const handleClose = () => {
        props.handleClose();
    };

    const onChange = selectedOption =>{
        console.log(selectedOption)
        setLicense(selectedOption.value)
    }


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

        if (!license) {
            props.enqueueSnackbar("The 'license' cannot be empty",
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
            "name": author,
            "url": aurl ? [aurl] : [],
            "wallet": [],
            "likerId":address,
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
            likerIds: [address],
            descriptions: [aintro],
            authorNames: [author],
            authorUrls: authsResult,
            authorWallets: [[]]
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
                             style={{color: "#FF715E"}}
                >Add metadata to your ISCN</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        style={{width: "480px",}}
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <h6>Title</h6>
                        <input type="text" name="item_title" id="item_title" className="form-control" value={title}
                               onChange={(v) => {
                                   setTitle(v.target.value)
                               }}/>
                        <h6>Author</h6>
                        <input
                            placeholder="egg: 0x.eth"
                            type="text" name="item_desc" id="item_desc" className="form-control" value={author}
                               onChange={(v) => {
                                   setAuthor(v.target.value)
                               }}/>
                        <h6>Author URL</h6>
                        <input
                            placeholder="egg: www.author.com"
                            type="text" name="item_desc" id="item_desc" className="form-control" value={aurl}
                               onChange={(v) => {
                                   setAurl(v.target.value)
                               }}/>

                        <h6>Author Introduce</h6>
                        <input
                            placeholder="egg: author is full stack ...."
                            type="text" name="item_desc" id="item_desc" className="form-control" value={aintro}
                               onChange={(v) => {
                                   setAintro(v.target.value)
                               }}/>

                        <h6>WebSite</h6>
                        <input
                            placeholder="egg: www.dataIntro.website"
                            type="text" name="item_desc" id="item_desc" className="form-control" value={url}
                               onChange={(v) => {
                                   setUrl(v.target.value)
                               }}/>

                        <h6>License</h6>
                        <div className='dropdownSelect one'>
                            <Select
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={customStyles}
                                onChange={onChange}
                                menuContainerStyle={{'zIndex': 999}} options={options}/></div>

                        <div style={{marginTop: "18px"}}>
                            <h>Tags</h>
                        </div>
                        <div>
                            <EditableTagGroup tagChanged={handleTagChanged}/>
                        </div>
                        <div className="spacer-single"></div>

                        <h6>Description</h6>
                        <textarea
                            placeholder="egg: description about this data"
                            onChange={handleDescription} data-autoresize name="item_desc" id="item_desc"
                                  className="form-control" value={description}></textarea>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        props.iscnLoading && <Spin indicator={antIcon}/>
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