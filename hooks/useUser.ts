"use client";
import { useContext } from "react";
import { UserContext } from "@/context/user/userContext";
import { User } from "@/context/user/userReducer";

export function useUser(){
    const {state,dispatch} = useContext(UserContext);

    function addUser(user:User){
        dispatch(
            {type:"SAVE_USER",payload:user}
        )
    }

    return{
        users: state.users,
        addUser
    }
}