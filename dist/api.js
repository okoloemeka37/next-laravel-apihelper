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
exports.api = {
    'get': (url, params) => __awaiter(void 0, void 0, void 0, function* () {
        return apiClient_1.default.get(url, { params }).then((res) => res.data);
    }),
    'post': (url, data) => __awaiter(void 0, void 0, void 0, function* () {
        return apiClient_1.default.post(url, data).then((res) => res.data);
    }),
    'put': (url, data) => __awaiter(void 0, void 0, void 0, function* () {
        return apiClient_1.default.put(url, data).then((res) => res.data);
    }),
    'delete': (url) => __awaiter(void 0, void 0, void 0, function* () {
        return apiClient_1.default.delete(url).then((res) => res.data);
    })
};
