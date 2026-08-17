export type Client = {
    _id?: string,
    clientName: string,
    clientAdress: string,
    clientCity: string,
    clientPincode: string,
    clientState: string,
    clientGst: string,
}

export type ClientState = {
    clients: Client[];
}

export const initialState: ClientState = {
    clients: []
}

export function clientReducer(state: ClientState, action: any) {
    if (action.type === "SET_CLIENTS") {
        return {
            ...state,
            clients: action.payload
        }
    }
    if (action.type === "ADD_CLIENT") {
        return {
            ...state,
            clients: [...state.clients, action.payload]
        }
    }
    if (action.type === "DELETE_CLIENT") {
        return {
            ...state,
            clients: state.clients.filter(
                (c) => c._id !== action.payload
            ),
        };
    }
    return state;
}
