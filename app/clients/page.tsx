"use client";
import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { useClient } from '@/hooks/useClient';
import { Client } from '@/context/client/clientReducer';
import Link from "next/link";

const emptyClient: Client = {
    clientName: '',
    clientAdress: '',
    clientCity: '',
    clientPincode: '',
    clientState: '',
    clientGst: '',
};

const ClientsPage = () => {
    const { clients, addClient, setClients, deleteClient } = useClient();
    const [form, setForm] = useState<Client>(emptyClient);
    const [saving, setSaving] = useState(false);

    const fetchClients = async () => {
        const res = await fetch('/api/clients');
        if (!res.ok) {
            console.error("Failed to fetch clients");
            return;
        }
        const data = await res.json();
        if (data.success) {
            setClients(data.data);
        }
    };

    useEffect(() => {
        fetchClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (field: keyof Client, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!form.clientName.trim()) {
            alert("Client Name is required");
            return;
        }
        try {
            setSaving(true);
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const saved = await res.json();
            if (!res.ok || !saved.success) {
                throw new Error(saved?.message || "Failed to save client");
            }
            addClient(saved.data);
            setForm(emptyClient);
        } catch (err) {
            console.error("error saving client", err);
            alert("Could not save client");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm("Delete this client?")) return;
        try {
            await deleteClient(id);
        } catch (err) {
            console.error(err);
            alert("Could not delete client");
        }
    };

    return (
        <div className="containerMain">
            <div className="w-full m-2 flex justify-center mt-5">
                <div className="w-full px-2 md:w-[80%]">
                    <h2 className='text-center font-bold text-3xl mb-2'>
                        Clients
                        <span>
                            <Link
                                href="/dashboard"
                                className="ml-3 inline-block text-sm font-medium px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        </span>
                    </h2>

                    {/* Add Client Card */}
                    <div className="text-lg shadow-[inset_0_10px_38px_-7px_rgba(136,136,136,0.2)] rounded-3xl p-5 mt-5">
                        <h3 className='text-2xl font-bold text-red-500 pb-3'>Add New Client</h3>
                        <div className="grid md:grid-cols-2 gap-2">
                            <div>
                                <label htmlFor="clientName">Client Name:</label>
                                <input
                                    type="text"
                                    id="clientName"
                                    className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1'
                                    value={form.clientName}
                                    onChange={(e) => handleChange('clientName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="clientAdress">Address:</label>
                                <input
                                    type="text"
                                    id="clientAdress"
                                    className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1'
                                    value={form.clientAdress}
                                    onChange={(e) => handleChange('clientAdress', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="clientCity">City:</label>
                                <input
                                    type="text"
                                    id="clientCity"
                                    className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1'
                                    value={form.clientCity}
                                    onChange={(e) => handleChange('clientCity', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="clientPincode">Pincode:</label>
                                <input
                                    type="text"
                                    id="clientPincode"
                                    className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1'
                                    value={form.clientPincode}
                                    onChange={(e) => handleChange('clientPincode', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="clientState">State:</label>
                                <input
                                    type="text"
                                    id="clientState"
                                    className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1'
                                    value={form.clientState}
                                    onChange={(e) => handleChange('clientState', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="clientGst">GSTIN:</label>
                                <input
                                    type="text"
                                    id="clientGst"
                                    className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1'
                                    value={form.clientGst}
                                    onChange={(e) => handleChange('clientGst', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Button className='uppercase hover:bg-red-500' onClick={handleSave}>
                                {saving ? "Saving..." : "Save Client"}
                            </Button>
                        </div>
                    </div>
                    {/* Add Client Card */}

                    {/* Client Cards List */}
                    <h3 className='text-2xl font-bold text-red-500 pt-8 pb-3'>Saved Clients</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {clients.map((c: Client) => (
                            <div
                                key={c._id}
                                className="text-base shadow-[inset_0_10px_38px_-7px_rgba(136,136,136,0.2)] rounded-2xl p-4 relative"
                            >
                                <button
                                    onClick={() => handleDelete(c._id)}
                                    className="absolute top-2 right-3 text-red-500 text-sm hover:text-red-700"
                                    title="Delete client"
                                >
                                    ✕
                                </button>
                                <p className='font-bold text-lg'>{c.clientName}</p>
                                <p>{c.clientAdress}</p>
                                <p>{c.clientCity}, {c.clientState} - {c.clientPincode}</p>
                                <p className='opacity-70'>GSTIN: {c.clientGst || '-'}</p>
                            </div>
                        ))}
                        {clients.length === 0 && (
                            <p className='opacity-60'>No clients saved yet.</p>
                        )}
                    </div>
                    {/* Client Cards List */}
                </div>
            </div>
        </div>
    );
};

export default ClientsPage;
