import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
// export const LOGIN = 'LOGIN';
// export const LOGIN = 'LOGIN';

export class AuthenticateSuccess implements Action{
    readonly type=AUTHENTICATE_SUCCESS;
    constructor(public payload:{
        email:string,
        userId:string,
        token:string,
        expirationDate:Date,
        redirect:boolean;
    }){}
}

export class Logout implements Action{
    readonly type=LOGOUT;
}

export class LoginStart implements Action{
    readonly type=LOGIN_START;
    constructor(public payload:{email:string,password:string}){}
}

export class LoginFail implements Action{
    readonly type=AUTHENTICATE_FAIL;
    constructor(public payload:string){}
}

export class SignupStart implements Action{
    readonly type=SIGNUP_START;
    constructor(public payload:{email:string,password:string}){}
}

export class ClearError implements Action{
    readonly type=CLEAR_ERROR;
    // constructor(public payload:{email:string,password:string}){}
}

export class AutoLogin implements Action{
    readonly type=AUTO_LOGIN;
    // constructor(public payload:{email:string,password:string}){}
}

export type AuthActions=
    |AuthenticateSuccess
    |Logout
    |LoginStart
    |LoginFail
    |SignupStart
    |ClearError
    |AutoLogin;