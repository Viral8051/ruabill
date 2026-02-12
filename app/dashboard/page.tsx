'use client';
import { Invoice } from "@/context/invoice/invoiceReducer";
import { useInvoice } from "@/hooks/useInvoice";
import { useEffect, useReducer, useState } from "react";
import Button from "../ui/Button";
import InvoiceLayout from "../ui/Invoice";
import { Trash } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";


const Dashboard  = () => {
    // states
    const router = useRouter();
    const { invoices, setInvoices, deleteInvoice} = useInvoice();
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null> (null);
    const [model, setModel] = useState(false);
    const [client, setClient] = useState("");
     
    // states

    const handlePreview =  (invoice : Invoice) => {
        setModel(true);
        setSelectedInvoice(invoice)
    }

    

    // search client
    const searchClient = (value:string) => {
       setClient(value)
    }

    const filteredInvoices = invoices.filter((invoice:any) =>
    invoice.invoiceClient.billedTo.clientName
        .toLowerCase()
        .includes(client.toLowerCase())
    );

    // Soreted bill
    const sortedInvoiceBillNo = [...filteredInvoices].sort (
        (a,b) => Number(b.invoiceInfo.invoiceNo) - Number(a.invoiceInfo.invoiceNo)
    )

    // logout

    const handleLogout = async () => {
        await fetch("/api/logout",{
            method:"POST",
        });

        router.push("/login");
    }

    useEffect(() =>{
        const fetchList  = async () => {
            const res = await fetch("/api/invoices");
            if (!res.ok) {
            console.error("Request failed");
            return;
            }
            const data = await res.json();
            console.log(data)

            setInvoices(data.data);
        }
        fetchList();
    },[])
 return(
    <>
        <section className="dashboard h-svh p-5 relative">
            <div className="container-main shadow-[0px_0px_22px_-15px_rgba(136,136,136,1)] rounded-3xl border-[var(--ternary-color)] p-5">
                <div className="dashboard-head w-full mt-5 text-center">
                    <div className="flex justify-between">
                    <h2 className="text-red-500 text-4xl font-bold">Dashboard</h2>
                    <div className="user-dashboard">
                        <Button onClick={handleLogout}>Logout</Button>
                    </div>
                    </div>
                    <div className="dashboard-head-inner p-3 w-full flex justify-start">
                        <Link href="/newinvoice" className="">
                        <Button className="hover:shadow-[0px_0px_15px_-3px_rgba(255,255,255,0.8)] hover:bg-red-500 ">Add-Invoice</Button>
                        </Link>
                        <input 
                        type="text" 
                        name="search" 
                        className="bg-amber-50 rounded-3xl ml-3 text-black focus-within:outline-0 p-2"
                        placeholder="Search Client Here..."
                        onChange={(e) => searchClient(e.target.value)}
                        />
                    </div>
                </div>
                <div className="dashboard-table relative z-0 w-full shadow-[inset_0_5px_10px_rgba(136,136,136,0.2)] rounded-2xl mt-2 ">
                    <table className="w-full">
                        <colgroup>
                            <col style={{ width: "10%" }} />   
                            <col style={{ width: "30%" }} />  
                            <col style={{ width: "20%" }} />  
                            <col style={{ width: "20%" }} />  
                            <col style={{ width: "20%" }} />  
                        </colgroup>
                        <thead className="">
                            <tr>
                               <th className="py-5 border-b border-[#212222]">Bill No.</th> 
                               <th className="py-5 border-b border-[#212222]">Client Name</th> 
                               <th className="py-5 border-b border-[#212222]">Date</th> 
                               <th className="py-5 border-b border-[#212222]">Ammount</th> 
                               <th className="py-5 border-b border-[#212222]"></th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {invoices.length  === 0 ? (
                                <tr>
                                    <td colSpan={5}>
                                        <p className="text-center py-10">No Invoices</p>
                                    </td>
                                </tr>
                            ):(
                            sortedInvoiceBillNo.map((invoice :Invoice, index :number) => (
                            <tr key={invoice.invoiceInfo.invoiceNo} className="text-center border-spacing-5 border-b border-[#212222] last:border-none">
                                <td className="py-5">{invoice.invoiceInfo.invoiceNo}</td>
                                <td className="py-5">{invoice.invoiceClient.billedTo.clientName}</td>
                                <td className="py-5">{invoice.invoiceInfo.invoiceDate}</td>
                                <td className="py-5">
                                    {invoice.invoiceItems.reduce(
                                        (sum :any, item : any) => sum + item.total, 0
                                    )}
                                </td>
                                <td className="py-5">
                                <div className="flex">
                                <Button onClick={() => handlePreview(invoice)}>View</Button>
                                <Button 
                                className="ml-3 hover:bg-red-500"
                                onClick={() => {
                                    if(confirm("Delete this Invoice?")){
                                    deleteInvoice(invoice.invoiceInfo.invoiceNo);
                                }}}
                                >
                                <Trash className="w-5 h-5"/>
                                </Button>
                                </div>
                                </td>
                            </tr>
                            ))
                            )}
                        </tbody>
                    </table>
                </div>  
                {model && selectedInvoice && (
                <div className="invoice-model fixed inset-0 z-10 overflow-auto  bg-[#000000e8]">
                    <div className="min-h-screen flex justify-center py-10">
                    <InvoiceLayout invoice={selectedInvoice}/>
                    </div>
                    <div className="model-close">
                        <button 
                        className="fixed top-5 right-5 px-4 py-2 border-2 rounded-full hover:bg-red-500"
                        onClick={() => setModel(false)}
                        >
                        X
                        </button>
                    </div>
                </div>
                )}
            </div>
        </section>
    </>
 )
}

export default Dashboard