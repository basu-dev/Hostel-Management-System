import {Store,Action} from "@ngrx/store"

export const ActionTypes={
    IS_AUTHENTICATED:"[Auth] IsAuthenticated",
    IS_UNAUTHENTICATED:"[Auth] IsUnauthentiated",
    IS_STUDENT:"[Auth] IsStudent",
    IS_STAFF:"[Auth] IsStaff",
    IS_ADMIN:"[Auth] IsAdmin"
}
export class IsAuthenticated implements Action{
    type=ActionTypes.IS_AUTHENTICATED
}
export class IsUnauthentiated implements Action{
    type=ActionTypes.IS_UNAUTHENTICATED
}
export class IsStudent implements Action{
    type=ActionTypes.IS_STUDENT
}export class IsAdmin implements Action{
    type=ActionTypes.IS_ADMIN
}export class IsStaff implements Action{
    type=ActionTypes.IS_STAFF
}
export type AuthActions= IsAuthenticated |
                         IsUnauthentiated |
                         IsStudent |
                         IsStaff |
                         IsAdmin