"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthToken = void 0;
const axios_1 = __importDefault(require("axios"));
const Api_Base_Url = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";
const apiClient = axios_1.default.create({
    baseURL: Api_Base_Url,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000
});
// Variable to store manually set token
let authToken = null;
// Function to manually set the token
const setAuthToken = (token) => {
    authToken = token; // Store in variable
    if (typeof window !== "undefined") {
        localStorage.setItem("authToken", token); // Store in localStorage
    }
};
exports.setAuthToken = setAuthToken;
//middleware handle response
apiClient.interceptors.response.use((response) => {
    console.log("Response Received:", response);
    return response;
}, (error) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.error("API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
    // retry logic after 500 error(server error)
    if (error.response && ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) >= 500) {
        console.warn("Retrying request...");
        return apiClient.request(error.config);
    }
    return Promise.reject(error);
}));
// Middleware: Set Authentication Token
apiClient.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Sent:", config);
    return config;
});
// Custom error handling
const handleApiError = (error) => {
    if (error.response) {
        const { status } = error.response;
        if (status === 401) {
            console.error("Unauthorized: Token might be expired.");
        }
        else if (status === 403) {
            console.error("Forbidden: You don’t have permission.");
        }
        else if (status === 404) {
            console.error("Not Found: The requested resource does not exist.");
        }
        else if (status >= 500) {
            console.error("Server Error");
        }
        else {
            console.error("API Error:", error.response.data);
        }
    }
    else {
        console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
};
apiClient.interceptors.response.use((response) => response, (error) => __awaiter(void 0, void 0, void 0, function* () {
    const { config, response } = error;
    if (!config || !response)
        return handleApiError(error);
    config.__retryCount = config.__retryCount || 0;
    const maxRetries = 3;
    if (response.status >= 500 && config.__retryCount < maxRetries) {
        config.__retryCount++;
        return new Promise((resolve) => setTimeout(() => resolve(apiClient(config)), 1000 * config.__retryCount));
    }
    return handleApiError(error);
}));
exports.default = apiClient;
