import apiClient from "./apiClient";

let errorHandler: (error: any) => void = (error) => {
  console.error("API Error:", error.response?.data || error.message);
};

export const api = {
  get: async (url: string, params?: any) => {
    return apiClient.get(url, { params }).then((res) => res.data).catch(errorHandler);
  },
  post: async (url: string, data?: any) => {
    return apiClient.post(url, data).then((res) => res.data).catch(errorHandler);
  },
  put: async (url: string, data?: any) => {
    return apiClient.put(url, data).then((res) => res.data).catch(errorHandler);
  },
  delete: async (url: string) => {
    return apiClient.delete(url).then((res) => res.data).catch(errorHandler);
  },
  setErrorHandler: (handler: (error: any) => void) => {
    errorHandler = handler;
  }
};
