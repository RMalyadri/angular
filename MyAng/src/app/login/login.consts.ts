export interface ILogin {
    userId:string;
    password:string;
}

export interface ILoginResponse {
   error:errorInfo;
}

export interface errorInfo {
    status:number;
    message:string;
}

export interface LoginAuthResponse {
    accessToken:string;
    tokenType:string;
}