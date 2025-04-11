export declare const api: {
    get: (url: string, params?: any) => Promise<any>;
    post: (url: string, data?: any) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    delete: (url: string) => Promise<any>;
    setErrorHandler: (handler: (error: any) => void) => void;
    setAuthToken: (token: string, storageType?: string) => void;
};
