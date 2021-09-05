import * as Store from "./store";
import { PrivateKey } from '@textile/hub'
import {storeWithProgress} from "./web3";
const axios = require('axios');

export const formatUploadedFiles = ({ files }) => {
    let toUpload = [];
    let fileLoading = {};
    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        if (!file) {
            continue;
        }

        toUpload.push(file);
        fileLoading[`${file.lastModified}-${file.name}`] = {
            name: file.name,
            loaded: 0,
            total: file.size,
        };
    }

    if (!toUpload.length) {
        // Events.dispatchMessage({ message: "We could not find any files to upload." });
        return false;
    }

    return { toUpload, fileLoading, numFailed: files.length - toUpload.length };
};
/**
 * Create random identity for testing.
 * @param string The exported string of the user identity. If undefined will write new key to .env.
 */
function identity (string = undefined) {
  if (string) return PrivateKey.fromString(string)
  // Create a new one if this is the first time
  const id = PrivateKey.fromRandom()
  // Write it to the file for use next time
  //存储到locakstorage中
  return id
}

//加密存储
export const web3Upload2 = async ({ file, context,token }) => {
    const identityFromLocal = localStorage.getItem('identity')
    const id = identity(identityFromLocal)
    const encodeFile = new TextEncoder().encode(file)
    const cipherFile = await id.public.encrypt(encodeFile)
    if(token){
        const  web3File = await storeWithProgress(token, cipherFile, context)
        return {
            'cid':web3File.cid,
            "size":web3File.size,
            "type":web3File.type,
            "createTime":web3File.lastModified,
        }
    }else{
        return await upload({cipherFile, context})
    }
}


export const web3Upload = async ({ file, context,token }) => {
    if(token){
        const  web3File = await storeWithProgress(token, file, context)
        return {
            'cid':web3File.cid,
            "size":web3File.size,
            "type":web3File.type,
            "createTime":web3File.lastModified,
        }
    }else{
        return await upload({file, context})
    }
}
//将文件转为字节数组后才能加密
async function getAsByteArray(file) {
    let reader = new FileReader(); // 没有参数
    return new Uint8Array(await reader.readAsArrayBuffer(file))
}

export const uploadEnter = async ({ file, context,token }) => {
    let  response = await upload({file, context})
    if (!response || response.error) {
        if(token){
            const  web3File = await storeWithProgress(token, file, context)
            return {
                'cid':web3File.cid,
                "size":web3File.size,
                "type":web3File.type,
                "createTime":web3File.lastModified,
            }
        }
    }
    return response;
}


export const justUpload = async (file) =>{
    let formData = new FormData();

    // NOTE(jim): You must provide a file from an type="file" input field.
    if (!file) {
        return null;
    }

    formData.append("file", file);

    const _privateUploadMethod = (path, file) =>
        new Promise((resolve, reject) =>  {
            const XHR = new XMLHttpRequest();
            XHR.open("post", path, true);
            XHR.setRequestHeader("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk4YjFDRUJDMDc5Mzk4NWNGNzM2NzNiNDI1MTVlOTQ0NzM4MmM3RGYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNTYzMDc5MzgwNiwibmFtZSI6Inh5In0.OSYuicyoEtJSV_QfpaSk914VU1TIOwmEzVmP05lK6_c");
            XHR.onerror = (event) => {
                console.log(event)
                XHR.abort();
            };

            XHR.onloadend = (event) => {
                console.log("FILE UPLOAD END", event);
                try {
                    return resolve(JSON.parse(event.target.response));
                } catch (e) {
                    return resolve({
                        error: "SERVER_UPLOAD_ERROR",
                    });
                }
            };
            XHR.send(file);
        });

    let res = await _privateUploadMethod(`https://api.nft.storage/upload`, file);

    if (!res?.ok) {
        return !res ? { decorator: "NO_RESPONSE_FROM_SERVER", error: true } : res;
    }
    let item = res['value'];
    return item;
}

export const upload= async ({ file, context }) => {
    let formData = new FormData();

    // NOTE(jim): You must provide a file from an type="file" input field.
    if (!file) {
        return null;
    }
    const identityFromLocal = localStorage.getItem('identity')

    const id = identity(identityFromLocal)
    const byteArray = await getAsByteArray(file);
    const cipherFile = await id.public.encrypt(byteArray)
    formData.append("file", cipherFile);

    if (Store.checkCancelled(`${file.lastModified}-${file.name}`)) {
        return;
    }

    const _privateUploadMethod = (path, cipherFile,file) =>
        new Promise((resolve, reject) =>  {
            const XHR = new XMLHttpRequest();

            window.addEventListener(`cancel-${file.lastModified}-${file.name}`, () => {
                XHR.abort();
            });

            XHR.open("post", path, true);
            XHR.setRequestHeader("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk4YjFDRUJDMDc5Mzk4NWNGNzM2NzNiNDI1MTVlOTQ0NzM4MmM3RGYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNTYzMDc5MzgwNiwibmFtZSI6Inh5In0.OSYuicyoEtJSV_QfpaSk914VU1TIOwmEzVmP05lK6_c");
            XHR.onerror = (event) => {
                console.log(event)
                XHR.abort();
            };

            // NOTE(jim): UPLOADS ONLY.
            XHR.upload.addEventListener(
                "progress",
                (event) => {
                    if (!context) {
                        return;
                    }

                    if (event.lengthComputable) {
                        console.log("FILE UPLOAD PROGRESS", event);
                        context.setState({
                            fileLoading: {
                                ...context.state.fileLoading,
                                [`${file.lastModified}-${file.name}`]: {
                                    name: file.name,
                                    loaded: event.loaded,
                                    total: event.total,
                                },
                            },
                        });
                    }
                },
                false
            );

            window.removeEventListener(`cancel-${file.lastModified}-${file.name}`, () => XHR.abort());

            XHR.onloadend = (event) => {
                console.log("FILE UPLOAD END", event);
                try {
                    return resolve(JSON.parse(event.target.response));
                } catch (e) {
                    return resolve({
                        error: "SERVER_UPLOAD_ERROR",
                    });
                }
            };
            XHR.send(cipherFile);
        });

    // todo add web3.storage .
    let res = await _privateUploadMethod(`https://api.nft.storage/upload`, cipherFile,file);

    if (!res?.ok) {

        if (context) {
            await context.setState({
                fileLoading: {
                    ...context.state.fileLoading,
                    [`${file.lastModified}-${file.name}`]: {
                        name: file.name,
                        failed: true,
                    },
                },
            });
        }

        return !res ? { decorator: "NO_RESPONSE_FROM_SERVER", error: true } : res;
    }
    let item = res['value'];
    return item;
};

export const pinata = async (name,cid,callback)=>{
    const url = `https://api.pinata.cloud/pinning/pinByHash`;
    const body = {
        hashToPin: cid,
        pinataMetadata: {
            name: name,
        }
    };
    return axios
        .post(url, body, {
            headers: {
                pinata_api_key:"22facc1292dfe9b24699",
                pinata_secret_api_key: "6008c35b6a7ad5f3fcc597324b790e178c8f8bf21f969442b0efb3c221b712b2"
            }
        })
        .then(function (response) {
            console.log(response)
            callback(response)
            //handle response here
        })
        .catch(function (error) {
            //handle error here
        });
}