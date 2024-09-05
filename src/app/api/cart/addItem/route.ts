import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";

export async function POST(request:NextRequest){
    const Item:cartItem = await request.json()
    const res = await prisma.cart.create({
        data:{
            product:Item.product,
            image: Item.image,
            quantity: parseInt(Item.quantity),
            price: parseInt(Item.price)
        }
    })
    const data = res;
    return NextResponse.json(data)
}



interface cartItem{
    id: number,
    product: string,
    image: string,
    quantity: string,
    price: string
}