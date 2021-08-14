import {Web3Storage} from "web3.storage";
import * as Store from "./store";

export const web3AccessToken = (user)=>{
    return user.web3
}

export const web3Client =(token)=>{
    return new Web3Storage({token:token})
}

export const storeWithProgress =async (token, file, context) => {
    // show the root cid as soon as it's ready

    let resultCid;
    const onRootCidReady = cid => {
        console.log('uploading files with cid:', cid)
        resultCid = cid;
    }


    if (Store.checkCancelled(`${file.lastModified}-${file.name}`)) {
        return;
    }

    // when each chunk is stored, update the percentage complete and display
    const totalSize = file.size
    let uploaded = 0

    const onStoredChunk = size => {
        uploaded += size
        context.setState({
            fileLoading: {
                ...context.state.fileLoading,
                [`${file.lastModified}-${file.name}`]: {
                    name: file.name,
                    loaded: uploaded,
                    total: totalSize,
                },
            },
        });
        console.log(`Uploading... ${uploaded} +">>>"+${totalSize}`)
    }

    // makeStorageClient returns an authorized Web3.Storage client instance
    const client = web3Client(token)

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    const rootCid = await client.put([file], {onRootCidReady, onStoredChunk})
    const res = await client.get(rootCid)
    const files = await res.files()
    return files[0];
}