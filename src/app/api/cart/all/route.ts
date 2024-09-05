import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";

export async function GET(){
    const res = await prisma.cart.findMany({
        select:{
            id: true,
            product:true,
            price: true,
            image:true,
            quantity: true
        }
    })
    const data = res;
    return NextResponse.json(data)
}