import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    clientName: String,
    clientAdress: String,
    clientCity: String,
    clientPincode: String,
    clientState: String,
    clientGst: String,
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
