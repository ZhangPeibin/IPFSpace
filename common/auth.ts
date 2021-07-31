import {Client, createUserAuth,Where, KeyInfo, PrivateKey, ThreadID, UserAuth} from "@textile/hub";
import * as C from "./constants"



const schema = {
    identity: "",
    _id: '',
    files:[
        {
            filename:"",
            size: 0,
            cid:"",
            createTime:"",
            type:""
        }
    ]
}

const init = {
    identity: "",
    _id: '',
    files:[
    ]
}


async function authByTextile (keyInfo: KeyInfo) {
    // Create an expiration and create a signature. 60s or less is recommended.
    const expiration = new Date(Date.now() + 24* 24 * 60 * 60 * 1000)
    // Generate a new UserAuth
    const userAuth: UserAuth = await createUserAuth(keyInfo.key, keyInfo.secret ?? '', expiration)
    return userAuth
}


export const auth = async (userIdentity) => {
    if(userIdentity==null){
        return null;
    }

    const keyInfo : KeyInfo= {
        key: "bhtmaiyqclqj6pw5lmyskkdy7iq",
        secret:"bbfg3irdoe4ibswuszofgfr5gnn6nunjgxxjrdxq"
    };

    const userAuth = await authByTextile(keyInfo);
    const client = await Client.withUserAuth(userAuth);
    await  client.getToken(PrivateKey.fromString(userIdentity))
    return client
};

export const authIndex = async (identity,dbClient:Client) => {
    if(dbClient!=null){
        let localThreadId = localStorage.getItem("threadId")
        if(!localThreadId){
            try {
                const thread = await dbClient.getThread(C.DB.THREAD_NAME)
                localThreadId = thread.id;
            }catch (e) {
                if(e.toString().indexOf("Thread") !==-1 && e.toString().indexOf("found") !==-1){
                    const newDbThread = await dbClient.newDB(undefined, C.DB.THREAD_NAME)
                    localThreadId = newDbThread.toString();
                }
            }
            localStorage.setItem("threadId",localThreadId)
        }

        const threadId = ThreadID.fromString(localThreadId);
        const query = new Where('identity').eq(identity)
        try {
            const findResult = await dbClient.find(threadId,C.DB.FILES_COLLECTION,query)
            if(findResult &&findResult.length>0){
                return findResult;
            }
            let config = init
            config.identity = identity;
            await dbClient.create(threadId, C.DB.FILES_COLLECTION, [config])
            return [config];
        }catch (e) {
            if(e.toString().indexOf("not found")!==-1){
                let config = init
                config.identity = identity;
                await dbClient.newCollectionFromObject(threadId, schema,{name:C.DB.FILES_COLLECTION})
                await dbClient.create(threadId, C.DB.FILES_COLLECTION, [config])
                return [config]
            }
        }
    }
    return [];
};


export const storeFile = async (client: Client ,identity,fileJson)=>{
    console.log(fileJson)
    const thread = await client.getThread(C.DB.THREAD_NAME)
    const threadId = ThreadID.fromString(thread.id);
    const query = new Where('identity').eq(identity)
    const remoteUserConfigs = await client.find(threadId, C.DB.FILES_COLLECTION, query)
    if(remoteUserConfigs.length<1){
        console.log("why remote user config is empty?")
        return
    }
    const remoteUserConfig = remoteUserConfigs[0];
    // @ts-ignore
    remoteUserConfig.files.push(fileJson)
    await client.save(threadId, C.DB.FILES_COLLECTION, [remoteUserConfig])
}

export const storeFileMeteData = async (client: Client, identity, userConfig)=>{
    console.log(userConfig)
    const thread = await client.getThread(C.DB.THREAD_NAME)
    const threadId = ThreadID.fromString(thread.id);
    const query = new Where('identity').eq(userConfig.identity)
    const remoteUserConfig = await client.find(threadId, C.DB.FILES_COLLECTION, query)
    if(remoteUserConfig.length<1){
        console.log("why remote user config is empty?")
        return
    }
    const created = await client.save(threadId, C.DB.FILES_COLLECTION, [userConfig])
    console.log("save:"+userConfig)
}

export const deleteFile = async (cids, client: Client, identity)=> {
    const thread = await client.getThread(C.DB.THREAD_NAME)
    const threadId = ThreadID.fromString(thread.id);
    const query = new Where('identity').eq(identity)
    const remoteUserConfigs = await client.find(threadId, C.DB.FILES_COLLECTION, query)
    if(remoteUserConfigs.length<1){
        console.log("why remote user config is empty?")
        return
    }
    const remoteUserConfig = remoteUserConfigs[0];
    // @ts-ignore
    const files = remoteUserConfig.files;
    let copyFiles = []
    files.forEach(function (file) {
        const cid = file.cid;
        if(cids.indexOf(cid) ==-1){
            copyFiles.push(file)
        }
    })
    // @ts-ignore
    remoteUserConfig.files = copyFiles;
    await client.save(threadId, C.DB.FILES_COLLECTION, [remoteUserConfig])
    return  remoteUserConfig;
}