import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
    const token = request.cookies.get('token')?.value || '';

    let decoded;
    try {
        decoded = jwt.decode(token) as { id: number; email: string };
    }
    catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cartItems = await prisma.cart.findMany({
        select: {
            id: true,
            product: true,
            price: true,
            image: true,
        },
    });

    const userCartItems = await prisma.userCart.findMany({
        where: {
            userId: userId,
        },
        select: {
            cartId: true,
            quantity: true,
        },
    });

    const combinedData = cartItems.map(cartItem => {
        const userCartItem = userCartItems.find(uc => uc.cartId === cartItem.id);
        return {
            ...cartItem,
            quantity: userCartItem ? userCartItem.quantity : 0, 
        };
    });

    return NextResponse.json(combinedData);
}
