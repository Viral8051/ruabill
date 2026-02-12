import { NextResponse } from "next/server";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongoDb";

export async function POST(req: Request){
    try {
    await dbConnect();
     const {email, password} = await req.json();
     const user = await Users.findOne({userEmail: email});


     if(!user){
        return NextResponse.json(
            {message:"User not found"},
            {status: 404}
        );
     }

     const isMatch = await bcrypt.compare(password,user.userPassword);

     if(!isMatch){
        return NextResponse.json(
            {message: "invalid credential"},
            {status: 401}
        )
     }

    //  jwt token
    const token = jwt.sign(
        {userId: user._id, email:user.userEmail, role: user.userType},
        process.env.JWT_SECRET!,
        {expiresIn : "1d"}
    )

    const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 }
    );

    response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
    });
     
    return response

    } catch (error) {
       return NextResponse.json(
        {message: "Server Error"},
        {status: 500}
       ) 
    }
}