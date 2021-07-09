import * as authActions from './auth.actions'; 
import { User } from '../user.model';

export interface State{
  user:User;
  authError:string;
  loading:boolean;
}

const initialState:State = {
    user:null,
    authError:null,
    loading:false
};

export function authReducer(
  state:State = initialState,
  action:authActions.AuthActions
) {
  // return state
  switch (action.type) {
    case authActions.AUTHENTICATE_SUCCESS:
      const user=new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate,
        );
      return {
        ...state,
        authError:null,
        user:user,
        loading:false
      };
    case authActions.LOGOUT:
      return {
        ...state,
        user:null
      };
    case authActions.LOGIN_START:
    case authActions.SIGNUP_START:
      return {
        ...state,
        authError:null,
        loading:true
      };
    case authActions.CLEAR_ERROR:
      return{
        ...state,
        authError:null
      };
    case authActions.AUTHENTICATE_FAIL:
      return {
          ...state,
          user:null,
          authError:action.payload,
          loading:false
        };
    default:
      return state;
  }
}
