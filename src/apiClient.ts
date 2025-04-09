import axios,{AxiosRequestConfig, AxiosResponse} from "axios";
import { error } from "console";
import { config } from "process";

const Api_Base_Url=process.env.NEXT_PUBLIC_API_BASE_URL|| process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const apiClient=axios.create({
baseURL:Api_Base_Url,
headers:{
    "Content-Type":"application/json",
    Accept:"application/json",
},
timeout:10000
});
// Variable to store manually set token
let authToken: string | null = null;

// Function to manually set the token
export const setAuthToken = (token: string,storageType:string) => {
  authToken = token; // Store in variable
  if (storageType === "session") {
    sessionStorage.setItem("authToken", token); // Store in sessionStorage  
  }else if (storageType === "cookie") {
    document.cookie = `authToken=${token}; path=/;`; // Store in cookies
}else if (storageType === "local") {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token); // Store in localStorage
  }

}
 
};

//middleware handle response
apiClient.interceptors.response.use(
  (response:AxiosResponse)=>{
    console.log("Response Received:", response);
    return response
  },
 async (error)=>{
  console.error("API Error:", error.response?.data||error.message);
  // retry logic after 500 error(server error)
  if (error.response && error.response?.status>=500) {
    console.warn("Retrying request...");
    return apiClient.request(error.config)
    
  }
  return Promise.reject(error);
  }
)



// Custom error handling
const handleApiError = (error: any) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.error("Unauthorized: Token might be expired.");
      } else if (status === 403) {
        console.error("Forbidden: You don’t have permission.");
      } else if (status === 404) {
        console.error("Not Found: The requested resource does not exist.");
      } else if (status >= 500) {
        console.error("Server Error");
      } else {
        console.error("API Error:", error.response.data);
      }
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  };
apiClient.interceptors.response.use(
    (response)=>response,
    async (error)=>{   
        const {config,response}=error;
        if(!config|| !response) return handleApiError(error);
        config.__retryCount=config.__retryCount||0;
        const maxRetries=3;

        if (response.status >=500 && config.__retryCount<maxRetries) {
            config.__retryCount++;
            return new Promise((resolve) =>
                setTimeout(() => resolve(apiClient(config)), 1000 * config.__retryCount)
              );

        }
        return handleApiError(error);
     }
)

export default apiClient;   