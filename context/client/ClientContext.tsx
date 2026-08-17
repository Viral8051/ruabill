"use client"
import { createContext, useReducer } from "react";
import { initialState, clientReducer } from "./clientReducer";

export const ClientContext = createContext<any>(null);

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(clientReducer, initialState);
    return (
        <ClientContext.Provider value={{ state, dispatch }}>
            {children}
        </ClientContext.Provider>
    )
}
