import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { userId, cartId }: { userId: number; cartId: number } = await request.json();
        
        const existingCartItem = await prisma.userCart.findUnique({
            where: { userId_cartId: { userId, cartId } },
            select: { quantity: true },
        });
        
        if (!existingCartItem) {
            return NextResponse.json({ error: 'Cart item not found for the user' }, { status: 404 });
        }
        
        const newQuantity = existingCartItem.quantity + 1;
        
        const updatedCartItem = await prisma.userCart.update({
            where: { userId_cartId: { userId, cartId } },
            data: { quantity: newQuantity },
            include: {
                Cart: { 
                    select: {
                        id: true,
                        product: true,
                        image: true,
                        price: true
                    }
                }
            }
        });
        
        console.log('Cart item updated:', updatedCartItem);

        return NextResponse.json(updatedCartItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
