import { NextRequest,NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

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