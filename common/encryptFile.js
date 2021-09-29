//加密解密文件组件
import { PrivateKey } from '@textile/hub'
import axios from "axios";

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
  
//将文件转为字节数组后才能加密
async function getAsByteArray(file) {
    return new Promise((resolve,reject)=>{
        let reader = new FileReader(); // 没有参数
        reader.onload= ()=>resolve(reader.result)
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
    })
}

//key:钥匙
//file:文件对象
export const encryptFile = async (file,key) => {
    const id = identity(key)
    const byteArray = await getAsByteArray(file);
    const cipherFile = await id.public.encrypt(byteArray)
    return cipherFile;
}

//key:钥匙
//file:文件对象
export const decryptFile = async (file,key) => {
    const id = identity(key)
    const byteArray = await getAsByteArray(file);
    const decryptFile = await id.public.decrypt(byteArray)
    return decryptFile;
}

//加密文本
export const decryptText = async (text,key) => {
    const id = identity(key)
    const msg = new TextEncoder().encode(text)
    const ciphertext = await id.public.encrypt(msg)
    return ciphertext
}

//根据url路径 加密文件
export const decryptFileFromUrl = async (fileUrl,key) => {
   //下载
   let url = fileUrl;
   axios({
       method: "get",
       url,
       responseType: "blob",
   }).then((res) => {
       console.log("res===", res);
       let type = res.headers["content-type"]; //请求头中文件类型
       //let name = JSON.parse(res.headers["content-disposition"]); //请求头中文件名
       //console.log("res===", res, type, name);
       console.log("type:=====",type)
       const blob = new Blob([res.data]);
   if ("download" in document.createElement("a")) {
       // 非IE下载
       const elink = document.createElement("a");
   
       elink.download = name;
   
       elink.style.display = "none";
   
       elink.href = URL.createObjectURL(blob);
   
       document.body.appendChild(elink);
   
       elink.click();
   
       URL.revokeObjectURL(elink.href); // 释放URL 对象
   
       document.body.removeChild(elink);
   } else {
       // IE10+下载
       navigator.msSaveBlob(blob, name);
       }
       }).catch((err) => {
           console.log("下载错误", err);
   
    });
  
   //转换
   return 
}

export const download = () => {

    let url = "https://bafkreicacct74fscuwjpogsbyttb3lozfywku4i4crz25e7enb4s4fz4lm.ipfs.dweb.link/";
    axios({
        method: "get",
        url,
        responseType: "blob",
    }).then((res) => {
        console.log("res===", res);
        let type = res.headers["content-type"]; //请求头中文件类型
        //let name = JSON.parse(res.headers["content-disposition"]); //请求头中文件名
        //console.log("res===", res, type, name);
        console.log("type:=====",type)
        const blob = new Blob([res.data]);
    if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
    
        elink.download = name;
    
        elink.style.display = "none";
    
        elink.href = URL.createObjectURL(blob);
    
        document.body.appendChild(elink);
    
        elink.click();
    
        URL.revokeObjectURL(elink.href); // 释放URL 对象
    
        document.body.removeChild(elink);
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, name);
        }
        }).catch((err) => {
            console.log("下载错误", err);
    
        });
   
};