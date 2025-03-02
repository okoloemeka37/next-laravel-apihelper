import apiClient from "./apiClient";


export const api={
    'get':async(url:string,params?:any)=>{
        return apiClient.get(url,{params}).then((res)=>res.data)
    },
    'post':async(url:string,data?:any)=>{
        return apiClient.post(url,data).then((res)=>res.data)
    },
    'put':async(url:string,data?:any)=>{
        return apiClient.put(url,data).then((res)=>res.data)
    },
    'delete':async(url:string)=>{
        return apiClient.delete(url).then((res)=>res.data)
    }

}