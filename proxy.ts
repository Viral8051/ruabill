import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export function proxy(req:NextRequest){
    const token  = req.cookies.get("token")?.value;

    if(!token){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as{
            role:string;
        }

        if(
            req.nextUrl.pathname.startsWith("/newuser") &&
            decoded.role !== "superadmin"
        ){
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        return NextResponse.next();
    }
    catch{
        return NextResponse.redirect(new URL("/login", req.url));
    }   
}

export const config = {
    // matcher:["/dashboard/:path*", "/newuser/:path*","/newinvoice/:path*"],
    matcher:["/((?!login|api|_next|favicon.ico).*)"],

}