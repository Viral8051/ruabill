export type InvoiceItem = {
    itemPerticular : string,
    itemPieces: number,
    itemPrice: number,
    total: number
}
export type Invoice  = {
    invoiceInfo : {
        invoiceNo: string, 
        invoiceDate: string, 
        invoiceTransport: string,
        invoiceChallan: string, 
        invoiceLr: string, 
        invoiceSendFrom: string, 
        invoiceSendTo: string,
        invoiceSupplyDate: string,
    },
    invoiceClient : {
        billedTo: {
            clientName : string,
            clientCity: string,
            clientPincode: string,
            clientState: string,
            clientGst: string,
        },
        shippedTo: {
            clientName : string,
            clientCity: string,
            clientPincode: string,
            clientState: string,
            clientGst: string,
        }
    },
    invoiceItems : InvoiceItem[]
}


export type InvoiceState = {
    invoices: Invoice[];
}

export const  initialState : InvoiceState = {
    invoices:[]
}
export function invoiceReducer(state : InvoiceState , action: any){
    if (action.type === "SAVE_INVOICE") {
        return{
            ...state,
            invoices: [...state.invoices, action.payload]
        }
    };
    if (action.type === "SET_INVOICES") {
        return {
            ...state,
            invoices: action.payload
        }
    }
    if(action.type === "DELETE"){
        return {
            ...state,
            invoices : state.invoices.filter(
                (inv) => inv.invoiceInfo.invoiceNo !== action.payload
            ),
        };
    }
    return state;
}