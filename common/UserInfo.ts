import {Client, createUserAuth,Where, KeyInfo, PrivateKey, ThreadID, UserAuth} from "@textile/hub";
import * as C from "./constants"


/// can also use init
const UserInfoSchema ={
    _id: '',
    identity:"",
    name:"",
    icon:"",
    filAddress:"",
    likeId:"",
    web3:""
}

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

export async function userInfo(client:Client,identity){
    const localThreadId = await getLocalThreadId(client);
    let thread = ThreadID.fromString(localThreadId);
    const query = new Where('identity').eq(identity)
    try {
        const findResult = await client.find(thread,C.DB.USER_COLLECTION,query)
        if(findResult &&findResult.length>0){
            return findResult;
        }
        let config = UserInfoSchema
        config.identity = identity;
        await client.create(thread, C.DB.USER_COLLECTION, [config])
        return [config];
    }catch (e) {
        if(e.toString().indexOf("not found")!==-1){
            await client.newCollectionFromObject(thread, UserInfoSchema,{name:C.DB.USER_COLLECTION})
            let config = UserInfoSchema
            config.identity = identity;
            await client.create(thread, C.DB.USER_COLLECTION, [config])
            return [config]
        }
    }
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

export const getLocalThreadId = async (client:Client)=>{
    let localThreadId = await  localStorage.getItem("threadId")
    console.log("local thread id :"+localThreadId)
    if(!localThreadId || localThreadId == "null"){
        try {
            const thread = await client.getThread(C.DB.THREAD_NAME)
            localThreadId = thread.id;
        }catch (e) {
            console.log(e)
            if(e.toString().indexOf("Thread") !==-1 && e.toString().indexOf("found") !==-1){
                const newDbThread = await client.newDB(undefined, C.DB.THREAD_NAME)
                localThreadId = newDbThread.toString();
            }
        }
        localStorage.setItem("threadId",localThreadId)
    }
    return localThreadId;
}

export const authIndex = async (identity,client:Client) => {
    if(client!=null){
        let localThreadId = await getLocalThreadId(client);

        const threadId = ThreadID.fromString(localThreadId);
        const query = new Where('identity').eq(identity)
        try {
            const findResult = await client.find(threadId,C.DB.FILES_COLLECTION,query)
            if(findResult &&findResult.length>0){
                return findResult;
            }
            let config = init
            config.identity = identity;
            await client.create(threadId, C.DB.FILES_COLLECTION, [config])
            return [config];
        }catch (e) {
            if(e.toString().indexOf("not found")!==-1){
                let config = init
                config.identity = identity;
                await client.newCollectionFromObject(threadId, schema,{name:C.DB.FILES_COLLECTION})
                await client.create(threadId, C.DB.FILES_COLLECTION, [config])
                return [config]
            }
        }
    }
    return [];
};

export const storeUserInfo = async (client: Client ,userInfo)=>{
    const threadId = ThreadID.fromString(await getLocalThreadId(client));
    const query = new Where('identity').eq(localStorage.getItem("identity"))
    const remoteUserConfigs = await client.find(threadId, C.DB.USER_COLLECTION, query)
    if(remoteUserConfigs.length<1){
        console.log("why remote user config is empty?")
        return
    }
    let user = remoteUserConfigs[0];
    // @ts-ignore
    user.web3 = userInfo.web3;
    await client.save(threadId, C.DB.USER_COLLECTION, [user])
}


export const storeFile = async (client: Client ,identity,fileJson)=>{
    console.log(fileJson)
    const threadId = ThreadID.fromString(await getLocalThreadId(client));
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
    const threadId =  ThreadID.fromString(await getLocalThreadId(client));
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
    const threadId = ThreadID.fromString(await getLocalThreadId(client));
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


export const addISCNIdToFile = async (cid,ISCNId, client: Client, identity)=> {
    const threadId = ThreadID.fromString(await getLocalThreadId(client));
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
        if(cid === file.cid){
            file['iscnId'] = ISCNId
            copyFiles.push(file)
        }else{
            copyFiles.push(file)
        }
    })
    // @ts-ignore
    remoteUserConfig.files = copyFiles;
    await client.save(threadId, C.DB.FILES_COLLECTION, [remoteUserConfig])
    return  remoteUserConfig;
}

export const addisMintToFile = async (cid,isMint,itemId, client: Client, identity)=> {
    const threadId = ThreadID.fromString(await getLocalThreadId(client));
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
        if(cid === file.cid){
            file['isMint'] = isMint
            file['itemId'] = itemId
            copyFiles.push(file)
        }else{
            copyFiles.push(file)
        }
    })
    // @ts-ignore
    remoteUserConfig.files = copyFiles;
    await client.save(threadId, C.DB.FILES_COLLECTION, [remoteUserConfig])
    return  remoteUserConfig;
}