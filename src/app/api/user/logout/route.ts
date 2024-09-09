import ResponseCache from "next/dist/server/response-cache";
import { NextRequest, NextResponse } from "next/server";

export function PUT(request: NextRequest){
    const response = NextResponse.redirect(new URL('/', request.url), 302);

        response.cookies.set("token", '',{
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });
    return response
}
