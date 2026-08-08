// lib/generateInvoiceNo.ts
import Invoice from "@/models/Invoice";

function getFinancialYear(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1-12

  if (month >= 4) {
    // April onwards -> current/next
    return { start: year % 100, end: (year + 1) % 100 };
  } else {
    // Jan-March -> previous/current
    return { start: (year - 1) % 100, end: year % 100 };
  }
}

export async function generateInvoiceNo(): Promise<string> {
  const { start, end } = getFinancialYear();
  const prefix = `CT-${start}/${end}-`;

  // is FY ka last invoice dhundo (same prefix wale)
  const lastInvoice = await Invoice.findOne({
    "invoiceInfo.invoiceNo": { $regex: `^${prefix}` },
  }).sort({ "invoiceInfo.invoiceNo": -1 });

  let nextSeq = 1;
  if (lastInvoice) {
    const lastNo: string = lastInvoice.invoiceInfo.invoiceNo;
    const lastSeq = parseInt(lastNo.split("-").pop() || "0", 10);
    nextSeq = lastSeq + 1;
  }

  const seqStr = String(nextSeq).padStart(3, "0");
  return `${prefix}${seqStr}`;
}