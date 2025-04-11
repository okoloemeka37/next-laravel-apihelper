import apiClient from "./apiClient";
import { setAuthToken } from "./apiClient"; 
let errorHandler: (error: any) => void = (error) => {
  console.error("API Error:", error.response?.data || error.message);
};

export const api = {
  get: async (url: string, params?: any) => {
    try{
      const res = await apiClient.get(url,params );
      return res.data;
    }catch(error){
      errorHandler(error);
      throw error
    }
  
  },
  post: async (url: string, data?: any) => {
    try{
      const res = await apiClient.post(url,data);
      return res.data;
    }catch(error){
      errorHandler(error);
      throw error
    }
   
  },
  put: async (url: string, data?: any) => {
    try{
      const res = await apiClient.put(url, data);
      return res.data;
    }catch(error){
      errorHandler(error);
      throw error
    }
  
  },
  delete: async (url: string) => {
    try{
      const res = await apiClient.delete(url);
      return res.data;
    }catch(error){
      errorHandler(error);
      throw error
    }
   
  },
  setErrorHandler: (handler: (error: any) => void) => {
    errorHandler = handler;
  },
  setAuthToken,
};
