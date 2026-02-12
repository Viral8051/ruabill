import dbConnect from "@/lib/mongoDb";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();
        const users = await Users.find({});
        return NextResponse.json({success: true, data: users});
        
    } catch (error) {
        console.error("API ERROR:", error)
        return NextResponse.json(
            {success: false, message:"Internal server error"},
            {status: 500}
        );
    }
}

export async function POST(req:Request){
    await dbConnect();
    const body = await req.json();
    const user = await Users.create(body);
    return NextResponse.json(
        {success:true, data:user}
    )
}