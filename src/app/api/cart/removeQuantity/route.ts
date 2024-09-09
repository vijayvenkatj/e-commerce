import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken'
export async function POST(request: NextRequest) {
    try {
        const { id }: { id: any } = await request.json();

        const token = request.cookies.get('token')?.value || '';
        let decoded;
        try {
            decoded = jwt.decode(token) as { id: number; email: string };
        }
        catch (error) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const userId: any = decoded.id;

        
        const existingCartItem = await prisma.userCart.findUnique({
            where:{
                userId_cartId: {
                    userId,
                    cartId: id,
                },
            },
            select:{
                quantity: true
            }
        });
        
        if (!existingCartItem) {
            const updatedCartItem = await prisma.userCart.create({
                data: { 
                    userId,
                    cartId:id,
                    quantity: 0
                },
            });
            return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
        }
        
        const newQuantity = existingCartItem.quantity - 1;
        
        const updatedCartItem = await prisma.userCart.update({
            where: { userId_cartId: {
                userId,
                cartId: id,
            }, },
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