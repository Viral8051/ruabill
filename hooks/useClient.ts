"use client"
import { useContext } from "react";
import { ClientContext } from "@/context/client/ClientContext";
import { Client } from "@/context/client/clientReducer";

export function useClient() {
    const { state, dispatch } = useContext(ClientContext);

    function addClient(client: Client) {
        dispatch({ type: "ADD_CLIENT", payload: client });
    }

    function setClients(clients: Client[]) {
        dispatch({ type: "SET_CLIENTS", payload: clients });
    }

    async function deleteClient(id: string) {
        const res = await fetch(`/api/clients/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            const data = await res.json().catch(() => null);
            console.error("Delete failed:", res.status, data);
            throw new Error(data?.message || `Failed to delete client (status ${res.status})`);
        }
        dispatch({ type: "DELETE_CLIENT", payload: id });
    }

    return {
        clients: state.clients,
        addClient,
        setClients,
        deleteClient,
    }
}
