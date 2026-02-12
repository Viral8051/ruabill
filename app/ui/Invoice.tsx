import { Invoice } from '@/context/invoice/invoiceReducer'
import React, {forwardRef} from 'react'

type props  = {
    invoice:Invoice
}

const InvoiceLayout = (({invoice} : props) => {
    const max_rows = 10;
    const emptyRows = max_rows - invoice.invoiceItems.length;

    // gst
    const totalAmount = invoice.invoiceItems.reduce((sum, item) => sum + item.total,0);
    const cgst = Math.round ((totalAmount * 2.5) / 100);
    const sgst = Math.round ((totalAmount * 2.5) / 100);
    const netAmount = totalAmount + cgst +sgst;
  return (
    <>
        <div className="Invoice-Main">
            <div className="containerMain">
                <div className="Invoice-page w-full bg-white text-black" style={{height:"297mm",width: "210mm" }}>
                    <div className="w-full rounded flex flex-col items-center justify-center p-2">
                        {/* Invoice Header */}
                        <div className="flex w-full justify-between">
                            <div className=" Firm-logo w-full flex justify-center items-center flex-1/4">
                                <div className="">
                                    <h2>Logo</h2>
                                </div>
                            </div>
                            <div className="w-full flex-2/4">
                                <div className="Lord-greetings w-full">
                                    <h2 className='text-red-600 text-sm pb-1 text-center'>||| Shree Hinglaj Maa |||</h2>
                                </div>
                                <div className="Firm-Name w-full">
                                    <h1 className='text-center font-semibold text-4xl text-red-600 uppercase'>Rua Textile</h1>
                                </div>
                                <div className="Firm-Adress w-full py-2">
                                    <p className='text-center font-bold text-sm'>Laxmi Nivas, Opp. Raghuvir Mandap Services,<br /> Near Sodha School, Jamnagar, 361001.</p>
                                </div>
                            </div>
                            <div className="Firm-contact w-full flex justify-center items-center flex-1/4">
                                <div className="Firm-number">
                                    <p className='font-bold'>9863111119</p>
                                </div>
                            </div>
                        </div>
                        <div className="Invoice-title bg-blue-300 w-full text-center p-1">
                            <p className='font-bold text-sm uppercase'>Tax Invoice</p>        
                        </div>
                        <div className="Invoice-gst p-1">
                            <p className='uppercase text-sm font-bold'>GSTIN : 24cgqpm8131c1zf</p>
                        </div>
                        {/* Invoice Body starts  */}
                        <div className="Invoice-body w-full">
                            <div className="Invoice-top-details grid grid-cols-2 divide-x-2 border-2 w-full">
                                <div className="Invoice-top-left p-1">
                                        <div className="Invoice-No">
                                            <p className='text-sm font-bold'>Invoice : {invoice.invoiceInfo.invoiceNo}</p>
                                        </div>               
                                        <div className="Transport">
                                            <p className='text-sm font-bold'>Transport : {invoice.invoiceInfo.invoiceTransport}</p>
                                        </div>                  
                                        <div className="Lr-Number">
                                            <p className='text-sm font-bold'>LR No :{invoice.invoiceInfo.invoiceLr}</p>
                                        </div>         
                                        <div className="Goods-sends-from">
                                            <p className='text-sm font-bold'>Goods Send From: {invoice.invoiceInfo.invoiceSendFrom}</p>
                                        </div>
                                </div>  
                                <div className="Invoice-top-right p-1">
                                    <div className="Invoice-date">
                                            <p className='text-sm font-bold'>Invoice Date : {invoice.invoiceInfo.invoiceDate}</p>
                                        </div>               
                                        <div className="Challan-no">
                                            <p className='text-sm font-bold'>Challan No : {invoice.invoiceInfo.invoiceChallan}</p>
                                        </div>                  
                                        <div className="Date-supply">
                                            <p className='text-sm font-bold'>Date of Supply: {invoice.invoiceInfo.invoiceSupplyDate}</p>
                                        </div>         
                                        <div className="Goods-sends-to">
                                            <p className='text-sm font-bold'>Goods Send To: {invoice.invoiceInfo.invoiceSendTo}</p>
                                        </div>
                                </div>
                            </div>
                            {/* Invoice Client Details */}
                            <div className="Invoice-client-details grid grid-cols-2 divide-x-2 border-2 border-t-0 w-full">
                                <div className="Invoic-client-left p-1">
                                    <div className="Detail-reciever text-center font-bold">
                                        <h2 className='bg-blue-300'>Detail of Receiver : Billed To</h2>
                                        <h2 className='bg-red-400 mt-1 pt-1'>{invoice.invoiceClient.billedTo.clientName}</h2>    
                                    </div>
                                    <div className="Recevier-address grid grid-cols-2 font-bold text-sm pt-2">
                                        <div className="Recevier-city">
                                            <p>City: {invoice.invoiceClient.billedTo.clientCity}</p>
                                        </div>
                                        <div className="Recevier-pincode">
                                            <p>Pincode: {invoice.invoiceClient.billedTo.clientPincode}</p>
                                        </div>
                                        <div className="Recevier-state">
                                            <p>State: {invoice.invoiceClient.billedTo.clientState}</p>
                                        </div>
                                    </div>
                                    <div className="Recevier-gst text-sm font-bold pt-2">
                                        <p className='uppercase'>gstin : {invoice.invoiceClient.billedTo.clientGst}</p>
                                    </div>

                                </div>
                                <div className="Invoice-client-Right p-1">
                                    <div className="Detail-consignee text-center font-bold">
                                        <h2 className='bg-blue-300'>Detail of Consignee : Shipped To</h2>
                                        <h2 className='bg-red-400 mt-1 pt-1'>{invoice.invoiceClient.shippedTo.clientName}</h2>    
                                    </div>
                                    <div className="Consignee-address grid grid-cols-2 font-bold text-sm pt-2">
                                        <div className="Consignee-city">
                                            <p>City: {invoice.invoiceClient.shippedTo.clientCity}</p>
                                        </div>
                                        <div className="Consignee-pincode">
                                            <p>Pincode: {invoice.invoiceClient.shippedTo.clientPincode}</p>
                                        </div>
                                        <div className="Consignee-state">
                                            <p>State: {invoice.invoiceClient.shippedTo.clientState}</p>
                                        </div>
                                    </div>
                                    <div className="Consignee-gst text-sm font-bold pt-2">
                                        <p className='uppercase'>gstin : {invoice.invoiceClient.shippedTo.clientGst}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Item Details */}

                            <div className="Invoice-Items w-full border-2 border-t-0">
                                <table className='w-full' style={{ height:"105mm" }}>
                                    <colgroup>
                                        <col style={{ width: "5%" }} />   
                                        <col style={{ width: "45%" }} />  
                                        <col style={{ width: "9.9%" }} />  
                                        <col style={{ width: "12%" }} />  
                                        <col style={{ width: "12%" }} />  
                                        <col style={{ width: "16.1%" }} />
                                    </colgroup>
                                    <thead className='bg-blue-300'>
                                        <tr className='divide-x-2'>
                                            <th>No</th>
                                            <th className='text-left px-1'>Particulars</th>
                                            <th>HSN</th>
                                            <th>Pieces</th>
                                            <th>Rate</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center uppercase text-sm'>
                                        {invoice.invoiceItems.map((item, index) => (
                                        <tr key={index} className='divide-x-2'>
                                            <td /*style={{ height: "100mm" }} */className='align-top'>{index+1}</td>
                                            <td /*style={{ height: "100mm" }} */ className='text-left px-1 align-top'>{item.itemPerticular}</td>
                                            <td /*style={{ height: "100mm" }} */className='align-top'>520811</td>
                                            <td /*style={{ height: "100mm" }} */className='align-top'>{item.itemPieces}</td>
                                            <td /*style={{ height: "100mm" }} */className='align-top'>{item.itemPrice}</td>
                                            <td /*style={{ height: "100mm" }} */className='align-top'>{item.total}</td>
                                        </tr>
                                        ))}
                                        {Array.from({ length: emptyRows }).map((_, index) => (
                                        <tr key={`empty-${index}`} className="divide-x-2">
                                            <td>&nbsp;</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        ))}
                                        <tr className='border-t-2'>
                                            <td colSpan={3} className='border-t-2 border-r-2'>total</td>
                                            <td className='border-t-2 font-bold'>
                                                {invoice.invoiceItems.reduce (
                                                    (sum, item) => sum + item.itemPieces,
                                                    0
                                                )}
                                            </td>
                                            <td className='border-r-2'></td>
                                            <td className='text-center font-bold'>
                                                {totalAmount}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Invoice Other Details  */}
                            <div className="Invoice-other grid grid-cols-5 w-full">
                                <div className="Invoice-other-left col-span-3">
                                    <div className="Invoice-other-amount border-2 border-t-0">
                                        <h2 className='text-sm font-bold text-center border-b-2 p-1'>Total Invoice Amount in Words</h2>
                                        <p className='text-sm font-bold text-center p-1'>One Lakh fifty one thousand Rupees Only</p>
                                    </div>
                                    <div className="Invoice-other-bank border-2 border-t-0">
                                        <h2 className='text-sm font-bold text-center p-1 border-b-2'>Bank Details</h2>
                                        <div className="grid grid-cols-10 text-sm font-bold ">
                                            <div className="Invoice-bank-left col-span-3 ">
                                                <p className='p-1 border-b-2 border-r-2'>Bank Account</p>
                                                <p className='p-1 border-r-2'>Bank IFSC</p>
                                            </div>
                                            <div className="Invoice-bank-right w-full col-span-7">
                                                <p className='p-1 border-b-2'>50200113085929 <span className='pl-6'>HDFC BANK</span></p>
                                                <p className='p-1'>HDFC0001251 <span className='pl-9'>Jamnagar</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Invoice-other-terms font-bold text-sm border-2 border-t-0">
                                        <h2 className='text-center border-b-2'>Terms and Conditions</h2>
                                        <ul className='list-disc p-1 pl-5'>
                                            <li>Goods once sold will not be taken back or exchanged.</li>
                                            <li>Seller is not responsible for any loss or damage of goods in transit.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="Invoice-other-right col-span-2">
                                    <div className="Invoice-other-gst grid grid-cols-10 font-bold text-sm border-r-2 border-b-2">
                                        <div className="col-span-4">
                                            <p className='p-1 text-center border-r-2 border-b-2'>CGST</p>
                                            <p className='p-1 text-center border-r-2'>SGST</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className='p-1 text-center border-r-2 border-b-2'>2.5%</p>
                                            <p className='p-1 text-center border-r-2 '>2.5%</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className='p-1 text-center border-b-2'>{cgst}</p>
                                            <p className='p-1 text-center'>{sgst}</p>
                                        </div>
                                    </div>
                                    <div className="Invoice-other-net grid grid-cols-10 font-bold text-sm border-r-2 border-b-2">
                                        <div className="col-span-6 text-center border-r-2">
                                            <p className='p-1'>Net Amount</p>
                                        </div>
                                        <div className="col-span-4 text-center">
                                            <p className='p-1'>{netAmount}</p>
                                        </div>
                                    </div>
                                    <div className="Invoice-other-sign border-r-2 border-b-2 h-38">
                                        <p className='text-[9px] p-2 text-center'>Certified that the particulars given above are true and correct</p>
                                        <p className='text-center'>For <span className='text-red-500 font-bold'>RUA TEXTILE</span></p>
                                        <p className='pt-18 text-center font-bold'>Authorised signatory</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
})

export default InvoiceLayout