import axios,{AxiosRequestConfig} from "axios";
import { error } from "console";

const Api_Base_Url=process.env.NEXT_PUBLIC_API_BASE_URL|| "http://localhost:8000/api";

const apiClient=axios.create({
baseURL:Api_Base_Url,
headers:{
    "Content-Type":"application/json",
    Accept:"application/json",
}
});

//Add Authorization token authomaticaly
apiClient.interceptors.request.use((config)=>{
    const token=typeof window !=="undefined"? localStorage.getItem("authToken"):null
    if(token){
        config.headers.Authorization= `Bearer ${token}`
    }
    return config;
})

//handle errors
apiClient.interceptors.response.use(
    (response)=>response,
    (error)=>{
        console.log("API Error",error.response?.data||error.message)
        return Promise.reject(error)
    }
)

export default apiClient;   