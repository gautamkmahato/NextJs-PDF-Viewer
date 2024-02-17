import { request } from 'https';
import { NextResponse } from 'next/server'

export function middleware(request){
    console.log("Middleware running...");
    if(request.nextUrl.pathname !== "/login"){
        return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.json({success: "Successfully middleware running..."});
}

export const config = {
    matcher: ["/userlist/:path*"]
}