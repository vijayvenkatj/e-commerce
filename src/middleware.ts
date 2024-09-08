import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const JWT_SECRET = process.env.JWT_SECRET || ''
    const token = request.cookies.get("token")?.value || ''
    if(token){
        const secretKey = new TextEncoder().encode(JWT_SECRET);
        const verification = await jwtVerify(token,secretKey)
        if(verification){
            return NextResponse.next();
        }
        else{
            return NextResponse.redirect(new URL('/signup', request.url))
        }
    }
    else{
        return NextResponse.redirect(new URL('/signup', request.url))
    }

}

export const config = {
    matcher: ['/', '/cart']
  }