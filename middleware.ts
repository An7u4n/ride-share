import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/"];
const UNPROTECTED_ROUTES = ["/login", "/register"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    
    if (PROTECTED_ROUTES.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    
    if (UNPROTECTED_ROUTES.includes(req.nextUrl.pathname) && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    
    return NextResponse.next();
}