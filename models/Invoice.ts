import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema ({
    itemPerticular : String,
    itemPieces: Number,
    itemPrice: Number,
    total: Number
})

const InvoiceSchema  = new mongoose.Schema({
    invoiceInfo : {
        invoiceNo: String, 
        invoiceDate: String, 
        invoiceTransport: String,
        invoiceChallan: String, 
        invoiceLr: String, 
        invoiceSendFrom: String, 
        invoiceSendTo: String,
        invoiceSupplyDate: String,
    },
    invoiceClient : {
        billedTo: {
            clientName : String,
            clientCity: String,
            clientPincode: String,
            clientState: String,
            clientGst: String,
        },
        shippedTo: {
            clientName : String,
            clientCity: String,
            clientPincode: String,
            clientState: String,
            clientGst: String,
        }
    },
    invoiceItems : [ItemSchema],
})


export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);