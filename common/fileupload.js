import * as Store from "./store";
import {storeWithProgress} from "./web3";

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


export const upload = async ({ file, context }) => {
    let formData = new FormData();

    // NOTE(jim): You must provide a file from an type="file" input field.
    if (!file) {
        return null;
    }

    formData.append("file", file);

    if (Store.checkCancelled(`${file.lastModified}-${file.name}`)) {
        return;
    }

    const _privateUploadMethod = (path, file) =>
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
            XHR.send(file);
        });

    // todo add web3.storage .
    let res = await _privateUploadMethod(`https://api.nft.storage/upload`, file);

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


export const _nativeDownload = (url,fileName) => {
    var anchor = document.createElement('a');
    anchor.setAttribute("download",fileName);
    anchor.setAttribute("href", url);
    anchor.setAttribute("target","_blank")
    anchor.click();
};