import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({
    userId :String,
    userName: String,
    userEmail: String,
    userPassword : String,
    userNumber: Number,
    userType: String,
})

export default mongoose.models.User || mongoose.model('Users', UserSchema)