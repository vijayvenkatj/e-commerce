import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    try {
        const { id }: { id: number } = await request.json();
        
        if (typeof id !== 'number') {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }
        
        const existingCartItem = await prisma.cart.findUnique({
            where: { id },
            select: { quantity: true },
        });
        
        if (!existingCartItem) {
            return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
        }
        
        const newQuantity = existingCartItem.quantity + 1;
        
        const updatedCartItem = await prisma.cart.update({
            where: { id },
            data: { quantity: newQuantity },
        });
        
        console.log('Cart item updated:', updatedCartItem);
        
        return NextResponse.json(updatedCartItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



interface cartItem{
    id: number,
    product: string,
    image: string,
    quantity: string,
    price: string
}