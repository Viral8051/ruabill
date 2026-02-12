"use client"
import { createContext, useReducer } from "react";
import { initialState, invoiceReducer } from "./invoiceReducer";


export const InvoiceContext = createContext<any>(null);

export function InvoiceProvider({children} : {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(invoiceReducer,initialState);
    return(
        <InvoiceContext.Provider value={{state,dispatch}}>
            {children}
        </InvoiceContext.Provider>
    )
}