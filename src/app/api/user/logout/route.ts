import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest){
    const res = NextResponse.redirect(new URL('/login',request.url))
    res.cookies.set('token', '', { maxAge: 0, path: '/' });
    return res
}