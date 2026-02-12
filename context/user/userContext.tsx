"use client";
import React, { createContext, useReducer } from "react";
import {initialState, userReducer} from "./userReducer";

export const UserContext = createContext<any>(null);

export function UserProvider ({children}: {children: React.ReactNode}){
    const [state, dispatch] = useReducer(userReducer, initialState);
    return(
        <UserContext.Provider  value={{state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}