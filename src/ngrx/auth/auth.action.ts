import {Store,Action} from "@ngrx/store"

export const ActionTypes={
    IS_AUTHENTICATED:"[Auth] IsAuthenticated",
    IS_UNAUTHENTICATED:"[Auth] IsUnauthentiated",
    IS_STUDENT:"[Auth] IsStudent",
    IS_HOSTEL_STAFF:"[Auth] IsHostelStaff",
    IS_MESH_STAFF:"[Auth] IsMeshStaff",
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
}export class IsHostelStaff implements Action{
    type=ActionTypes.IS_HOSTEL_STAFF
}
export class IsMeshStaff implements Action{
    type=ActionTypes.IS_MESH_STAFF
}

export type AuthActions= IsAuthenticated |
                         IsUnauthentiated |
                         IsStudent |
                         IsHostelStaff |
                         IsMeshStaff|
                         IsAdmin