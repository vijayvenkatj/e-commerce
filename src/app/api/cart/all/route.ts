import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest){
    const res = await prisma.cart.findMany({
        select:{
            id: true,
            product:true,
            price: true,
            image:true,
        }
    })
    const data = res;
    return NextResponse.json(data)
}