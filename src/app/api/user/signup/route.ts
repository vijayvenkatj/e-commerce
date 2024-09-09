import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
    const JWT_SECRET = process.env.JWT_SECRET || '';
    const { email, password } = await request.json();
    const existingUser = await prisma.users.findUnique({
        where: {
            email: email
        },
    });

    if (existingUser) { 
        return NextResponse.json({ message: 'User already exists.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.users.create({
        data:{
            email,
            password: hashedPassword
        }
    })
    const token = jwt.sign({ id: user.id, email: user.email } , JWT_SECRET , {expiresIn: '1h'});
    const response = NextResponse.redirect(new URL('/', request.url),302);
    response.cookies.set("token", token, {
        httpOnly: true,  
        sameSite: "lax",
        secure: process.env.NODE_ENV === 'production',  
        path: '/',  
        maxAge: 60 * 60,
    });

    return response
}
