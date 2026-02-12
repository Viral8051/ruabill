"use client";
import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Invoice from '../ui/Invoice';
import { useInvoice } from '@/hooks/useInvoice';

// datatypes
type Invoice = {
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
    invoiceItems : Items[]

}

type Items = {
    itemPerticular : string,
    itemPieces: number,
    itemPrice: number,
    total: number
}
// datatypes
const NewInvoice = () => {
    // states
    const [invoice, setInvoice] = useState<Invoice> ({
    invoiceInfo : {
        invoiceNo: '', 
        invoiceDate: '', 
        invoiceTransport: '',
        invoiceChallan: '', 
        invoiceLr: '', 
        invoiceSendFrom: '', 
        invoiceSendTo: '',
        invoiceSupplyDate: '',
    },
    invoiceClient : {
        billedTo: {
            clientName : '',
            clientCity: '',
            clientPincode: '',
            clientState: '',
            clientGst: '',
        },
        shippedTo: {
            clientName : '',
            clientCity: '',
            clientPincode: '',
            clientState: '',
            clientGst: '',
        }
    },
    invoiceItems : []
    })
    
    const [item, setItems] = useState<Items> ({
    itemPerticular : '',
    itemPieces: 0,
    itemPrice: 0,
    total: 0
    });

    const {addInvoice} = useInvoice();
    // States

    const handleInput = (section: 'invoiceInfo' | 'invoiceClient' | 'invoiceItems',
        subSection:'billedTo' | 'shippedTo' | '',
        field: string, value:string | number ) => { 
        setInvoice(prev => {
            if(section === "invoiceClient" && subSection) {
                return{
                    ...prev,
                    invoiceClient:{
                        ...prev.invoiceClient,
                        [subSection]:{
                            ...prev.invoiceClient[subSection],
                            [field]: value
                        }
                    }
                }
            }

            return {
                ...prev,
                [section] : {
                    ...prev[section],
                    [field]:value
                }
            }
        })
    };
    const handleItems = (field: string , value : number | string) => {
        setItems (prev => ({
            ...prev,
            [field]: value
        }))
    }
    const saveItems = () => {

        const itemWithTotal =  {
             ...item,
             total: item.itemPieces * item.itemPrice
        }

        setInvoice(prev => ({
            ...prev,
            invoiceItems : [...prev.invoiceItems, itemWithTotal]
        }))

        setItems({
            itemPerticular: '',
            itemPieces: 0,
            itemPrice: 0,
            total: 0
        })
    }
    
    const fetchInvoice  = async() => {
        const res = await fetch('/api/invoices');
        if (!res.ok) {
            console.error("Request failed");
            return;
        }

        const data = await res.json();
        console.log(data);
    }
    const handleSaveInvoice = async () => {
        let finalInvoice;
        try{

            const {billedTo, shippedTo} = invoice.invoiceClient;

            const finalShippedTo = {
                clientName : shippedTo.clientName || billedTo.clientName,
                clientCity : shippedTo.clientCity || billedTo.clientCity,
                clientPincode : shippedTo.clientPincode || billedTo.clientPincode,
                clientState  : shippedTo.clientState || billedTo.clientState,
                clientGst : shippedTo.clientGst || billedTo.clientGst
            }

            finalInvoice = {
                ...invoice,
                invoiceClient : {
                    ...invoice.invoiceClient,
                    shippedTo:finalShippedTo
                }
            }

            await fetch('/api/invoices', {
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(finalInvoice)
            })

            addInvoice(finalInvoice);

            // const existingInvoicesJson = localStorage.getItem('invoices');
            // const existingInvoices  = existingInvoicesJson ? JSON.parse(existingInvoicesJson) : [];

            // const newInvoices = [...existingInvoices, finalInvoice];
            // localStorage.setItem('invoices', JSON.stringify(newInvoices));
            setInvoice(prev => ({
                ...prev,
                 invoiceInfo : {
                    invoiceNo: '', 
                    invoiceDate: '', 
                    invoiceTransport: '',
                    invoiceChallan: '', 
                    invoiceLr: '', 
                    invoiceSendFrom: '', 
                    invoiceSendTo: '',
                    invoiceSupplyDate: '',
                },
                invoiceClient : {
                    billedTo: {
                        clientName : '',
                        clientCity: '',
                        clientPincode: '',
                        clientState: '',
                        clientGst: '',
                    },
                    shippedTo: {
                        clientName : '',
                        clientCity: '',
                        clientPincode: '',
                        clientState: '',
                        clientGst: '',
                    }
                },
                invoiceItems : []
            }))
            alert("invoice saved successfully");
        }
        catch(err){
            console.log("error saving invoice" , err);
        }
    }
// // Log when the entire invoice state changes
useEffect(() => {
  fetchInvoice()
}, []); // Watch the entire object
    
  return (
    <>
        <div className="Newinvoice-main">
            <div className="containerMain">
                <div className="NewInvoice-inner w-full m-2 flex justify-center mt-5">
                    <form className='NewInvoice__form mt-5 w-full px-2 md:w-[80%] '>
                        <h2 className='text-center font-bold text-3xl mb-2'>Add Invoice</h2>
                        <div className="text-lg shadow-[inset_0_10px_38px_-7px_rgba(136,136,136,0.2)] rounded-3xl p-5">
                            {/* Invoice Info */}
                            <div className="grid md:grid-cols-2">
                                <div className="Invoice-no">
                                    <label htmlFor="Invoice-no">Invoice No. :</label>
                                    <input 
                                        type="number" 
                                        name="Invoice-Number" 
                                        id="Invoice-no" 
                                        className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1'
                                        value={invoice.invoiceInfo.invoiceNo}
                                        onChange={(e) => handleInput('invoiceInfo', '','invoiceNo', e.target.value)}
                                    />
                                </div>
                                <div className="Invoice-date pt-2">
                                    <label htmlFor="Invoice-date">Invoice Date :</label>
                                    <input 
                                        type='date'
                                        name="Invoice-date" 
                                        id="Invoice-date" 
                                        className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                        value={invoice.invoiceInfo.invoiceDate}
                                        onChange={(e) => handleInput('invoiceInfo','', 'invoiceDate', e.target.value)}
                                    />
                                </div>
                                <div className="Transport-name pt-2">
                                    <label htmlFor="Transport-Name">Transport Name :</label>
                                    <input 
                                        type='text'
                                        name="Transport-Name" 
                                        id="Transport-Name" 
                                        className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                        value={invoice.invoiceInfo.invoiceTransport}
                                        onChange={(e) => handleInput('invoiceInfo','', 'invoiceTransport', e.target.value)}
                                    />
                                </div>
                                <div className="Challan-no pt-2">
                                    <label htmlFor="Lr-no">Challan Number :</label>
                                    <input 
                                        type='text'
                                        name="Challan-no" 
                                        id="Challan-no" 
                                        className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                        value={invoice.invoiceInfo.invoiceChallan}
                                        onChange={(e) => handleInput('invoiceInfo','','invoiceChallan', e.target.value)}
                                    />
                                </div>
                                <div className="Lr-no pt-2">
                                    <label htmlFor="Lr-no">Lr Number :</label>
                                    <input 
                                        type='text'
                                        name="Lr-no" 
                                        id="Lr-no" 
                                        className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                        value={invoice.invoiceInfo.invoiceLr}
                                        onChange={(e) => handleInput('invoiceInfo','', 'invoiceLr', e.target.value)}
                                    />
                                </div>
                                <div className="Good-send pt-2">
                                    <label htmlFor="Good-send">Goods sends From :</label>
                                    <input 
                                        type='text'
                                        name="Good-send" 
                                        id="Good-send" 
                                        className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                        value={invoice.invoiceInfo.invoiceSendFrom}
                                        onChange={(e) => handleInput('invoiceInfo','', 'invoiceSendFrom', e.target.value)}
                                    />
                                </div>
                                <div className="Good-send-to pt-2">
                                    <label htmlFor="Good-send-to">Goods sends To :</label>
                                    <input 
                                        type='text'
                                        name="Good-send-to" 
                                        id="Good-send-to" 
                                        className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                        value={invoice.invoiceInfo.invoiceSendTo}
                                        onChange={(e) => handleInput('invoiceInfo','', 'invoiceSendTo', e.target.value)}
                                    />
                                </div>
                                <div className="Invoice-date-of-supply pt-2">
                                    <label htmlFor="Invoice-date-of-supply">Date of Supply :</label>
                                    <input 
                                        type='date'
                                        name="Invoice-date-of-supply" 
                                        id="Invoice-date-of-supply" 
                                        className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                        value={invoice.invoiceInfo.invoiceSupplyDate}
                                        onChange={(e) => handleInput('invoiceInfo','', 'invoiceSupplyDate', e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Invoice Info */}

                            {/* Invoice Client */}
                            <div className="grid md:grid-cols-2">
                                {/* Invoice Client- Billed To */}
                                <div className="">
                                    <h2 className='py-5 text-2xl font-bold text-red-500'>Detail of Recevier- Billed To</h2>
                                    <div className="Clinet-name">
                                        <label htmlFor="Clinet-name">Client Name:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-name" 
                                            id="Clinet-name" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.billedTo.clientName}
                                            onChange={(e) => handleInput('invoiceClient', 'billedTo', 'clientName', e.target.value)}
                                        />
                                    </div>
                                    <div className="Clinet-city pt-2">
                                        <label htmlFor="Clinet-city">Client City:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-city" 
                                            id="Clinet-city" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.billedTo.clientCity}
                                            onChange={(e) => handleInput('invoiceClient', 'billedTo', 'clientCity', e.target.value)}
                                        />
                                    </div>
                                    <div className="Clinet-pincode pt-2">
                                        <label htmlFor="Clinet-pincode">Client Pincode:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-pincode" 
                                            id="Clinet-pincode" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.billedTo.clientPincode}
                                            onChange={(e) => handleInput('invoiceClient', 'billedTo', 'clientPincode', e.target.value)}
                                        />
                                    </div>
                                    <div className="Clinet-state pt-2">
                                        <label htmlFor="Clinet-state">Client State:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-state" 
                                            id="Clinet-state" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.billedTo.clientState}
                                            onChange={(e) => handleInput('invoiceClient', 'billedTo', 'clientState', e.target.value)}
                                        />
                                    </div>
                                    <div className="Clinet-gst pt-2">
                                        <label htmlFor="Clinet-gst">Client GSTIN:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-gst" 
                                            id="Clinet-gst" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.billedTo.clientGst}
                                            onChange={(e) => handleInput('invoiceClient', 'billedTo', 'clientGst', e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Invoice Client- Billed To */}
                                
                                
                                
                                {/* Invoice Client- Shipped To */}
                                <div className="">
                                    <h2 className='py-5 text-2xl font-bold text-red-500'>Detail of Consignee- Shipped To</h2>
                                    <div className="Clinet-s-name">
                                        <label htmlFor="Clinet-s-name">Client Name:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-s-name" 
                                            id="Clinet-s-name" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.shippedTo.clientName}
                                            onChange={(e) => handleInput('invoiceClient', 'shippedTo', 'clientName', e.target.value)}
                                        />
                                    </div>
                                    <div className="Clinet-s-city pt-2">
                                        <label htmlFor="Clinet-s-city">Client City:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-s-city" 
                                            id="Clinet-s-city" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.shippedTo.clientCity}
                                            onChange={(e) => handleInput('invoiceClient', 'shippedTo', 'clientCity', e.target.value)}
                                        />
                                    </div>
                                    <div className="Clinet-s-pincode pt-2">
                                        <label htmlFor="Clinet-s-pincode">Client Pincode:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-s-pincode" 
                                            id="Clinet-s-pincode" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.shippedTo.clientPincode}
                                            onChange={(e) => handleInput('invoiceClient', 'shippedTo', 'clientPincode', e.target.value)}
                                        />
                                    </div>
                                    <div className="Clinet-s-state pt-2">
                                        <label htmlFor="Clinet-s-state">Client State:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-s-state" 
                                            id="Clinet-s-state" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.shippedTo.clientState}
                                            onChange={(e) => handleInput('invoiceClient', 'shippedTo', 'clientState', e.target.value)}
                                        />
                                    </div>
                                    <div className="Clinet-s-gst pt-2">
                                        <label htmlFor="Clinet-s-gst">Client GSTIN:</label>
                                        <input 
                                            type='text'
                                            name="Clinet-s-gst" 
                                            id="Clinet-s-gst" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={invoice.invoiceClient.shippedTo.clientGst}
                                            onChange={(e) => handleInput('invoiceClient', 'shippedTo', 'clientGst', e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Invoice Client- Shipped To */}
                            </div>
                            {/* Invoice Client */}

                            {/* Invoice Perticular List */}
                            <div className="grid md:grid-cols-2">
                                <div className="">
                                    <h2 className='py-5 text-2xl font-bold text-red-500'>Items Details</h2>
                                    <div className="perticular-name">
                                        <label htmlFor="perticulars-name">Perticulars:</label>
                                        <input 
                                            type='text'
                                            name="perticulars-name" 
                                            id="perticulars-name" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={item.itemPerticular}
                                            onChange={(e) => handleItems('itemPerticular' , e.target.value)}
                                        />
                                    </div>
                                    <div className="perticular-piece pt-2">
                                        <label htmlFor="perticular-piece">Pieces</label>
                                        <input 
                                            type='number'
                                            name="perticular-piece" 
                                            id="perticular-piece" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={item.itemPieces}
                                            onChange={(e) => handleItems('itemPieces' , e.target.value)}
                                        />
                                    </div>
                                    <div className="perticular-price pt-2">
                                        <label htmlFor="perticular-price">Price</label>
                                        <input 
                                            type='number'
                                            name="perticular-price" 
                                            id="perticular-price" 
                                            className='bg-white ml-2 rounded-2xl text-black focus-within:outline-0 p-1 '
                                            value={item.itemPrice}
                                            onChange={(e) => handleItems('itemPrice' , e.target.value)}
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <Button className='mr-1 text-sm hover:bg-red-500' onClick={saveItems}>Add</Button>
                                        <Button className='text-sm hover:bg-red-500'>Clear</Button>
                                    </div>
                                </div>

                                <div className="min-h-100">
                                    <h2 className='py-5 text-2xl font-bold text-red-500'>Items List</h2>
                                    <table className='w-full'>
                                        <thead className='text-left border-b border-[#212222]'>
                                            <tr>
                                                <th colSpan={6}>Perticulars</th>
                                                <th colSpan={2}>Pieces</th>
                                                <th colSpan={2}>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice.invoiceItems.map((savedItem, index) => (
                                                <tr key={index}>
                                                    <td colSpan={6} className='pt-1'>{savedItem.itemPerticular}</td>
                                                    <td colSpan={2} className='pt-1'>{savedItem.itemPieces}</td>
                                                    <td colSpan={2} className='pt-1'>{savedItem.itemPrice}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Invoice Perticular List */}
                        </div>

                        {/* form Submit */}
                        <div className="flex justify-center">
                            <Button 
                                className='uppercase mt-5 hover:bg-red-500'
                                onClick={handleSaveInvoice}
                            >
                            Save
                            </Button> 
                        </div>
                        {/* form Submit */}
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default NewInvoice;