import {AuthActions} from "./auth.action";
import { ActionTypes } from './auth.action';

export interface State{
    IsAuthenticated:boolean;
    IsAdmin:boolean,
    IsStaff:boolean,
    IsStudent:boolean,
}
const initialState:State ={
    IsAuthenticated:false,
    IsAdmin:false,
    IsStaff:false,
    IsStudent:false
};

export function authReducer(state= initialState,action:AuthActions){
    switch(action.type){
        case(ActionTypes.IS_AUTHENTICATED):
        return{ ...state, IsAuthenticated:true}
        
        case(ActionTypes.IS_UNAUTHENTICATED):
        return {
            ...state, IsAuthenticated:false
        }
        case(ActionTypes.IS_STAFF):
        return {
            ...state, IsStaff:true,IsAuthenticated:true

        }
        case(ActionTypes.IS_STUDENT):
        return {
            ...state, IsAuthenticated:true, isStudent:true
        }
        case(ActionTypes.IS_ADMIN):
        return {
            ...state,IsAuthenticated:true,isAdmin:true
        }

        default:
            return state
    }
}
export const getIsAuthenticated=(state:State)=>state.IsAuthenticated;
export const getIsAdmin=(state:State)=>state.IsAdmin;
export const getIsStaff=(state:State)=>state.IsStaff;
export const getIsStudent = (state:State)=>state.IsStudent;