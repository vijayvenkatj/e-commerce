
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not defined.');
    }

    try {
        const { email, password } = await request.json();

        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

   
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        const response = NextResponse.redirect(new URL('/', request.url), 302);

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60,
        });

        return response;
    } catch (error) {
        console.error('Error during sign-in:', error);
        return NextResponse.json({ message: 'An error occurred during sign-in' }, { status: 500 });
    }
}
