"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Api_Base_Url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
const apiClient = axios_1.default.create({
    baseURL: Api_Base_Url,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});
//Add Authorization token authomaticaly
apiClient.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
//handle errors
apiClient.interceptors.response.use((response) => response, (error) => {
    var _a;
    console.log("API Error", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
    return Promise.reject(error);
});
exports.default = apiClient;
