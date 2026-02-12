export type User = {
    userId :String,
    userName: String,
    userEmail: String,
    userPassword : String,
    userNumber: Number,
    userType: String,
}

export type UserState = {
    users: User[];
}

export const initialState : UserState = {
    users: []
}

export function userReducer (state: UserState, action:any){
    if(action.type === "SAVE_USER"){
        return{
            ...state,
            users: [...state.users, action.payload]
        }
    }
    return state
}
