"use client"
import { useContext } from "react";
import { InvoiceContext } from "@/context/invoice/InvoiceContext";
import { Invoice } from "@/context/invoice/invoiceReducer";

export function  useInvoice() {
    const{state, dispatch} = useContext(InvoiceContext);

    function addInvoice (invoice: Invoice) {
        dispatch({type: "SAVE_INVOICE", payload: invoice})
    }

    function setInvoices  (invoices: Invoice[]){
        dispatch({type: "SET_INVOICES", payload: invoices});
    }

    async function deleteInvoice(invoiceNo : string){
        const res = await fetch(`/api/invoices/${invoiceNo}`,{
            method : "DELETE",
        });
        if(!res.ok){
            throw new Error("Failed to delete Invoice");
        }
        dispatch({type: "DELETE", payload: invoiceNo});
    }
    return{
        invoices: state.invoices,
        addInvoice,
        setInvoices,
        deleteInvoice,
    }
}