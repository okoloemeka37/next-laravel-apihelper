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
exports.api = void 0;
const apiClient_1 = __importDefault(require("./apiClient"));
let errorHandler = (error) => {
    var _a;
    console.error("API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
};
exports.api = {
    get: (url, params) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield apiClient_1.default.get(url, params);
            return res.data;
        }
        catch (error) {
            errorHandler(error);
            throw error;
        }
    }),
    post: (url, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield apiClient_1.default.post(url, data);
            return res.data;
        }
        catch (error) {
            errorHandler(error);
            throw error;
        }
    }),
    put: (url, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield apiClient_1.default.put(url, data);
            return res.data;
        }
        catch (error) {
            errorHandler(error);
            throw error;
        }
    }),
    delete: (url) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield apiClient_1.default.delete(url);
            return res.data;
        }
        catch (error) {
            errorHandler(error);
            throw error;
        }
        return apiClient_1.default.delete(url).then((res) => res.data).catch(errorHandler);
    }),
    setErrorHandler: (handler) => {
        errorHandler = handler;
    }
};
