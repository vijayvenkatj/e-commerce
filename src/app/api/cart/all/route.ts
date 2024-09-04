// import { NextRequest,NextResponse } from "next/server"
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient();

// export async function GET(){
//     const res = await prisma.cart.findMany({
//         select:{
//             id: true,
//             product:true,
//             price: true,
//             image:true,
//             quantity: true
//         }
//     })
//     const data = res;
//     return NextResponse.json(data)
// }
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Fetch data from the cart table
    const res = await prisma.cart.findMany({
      select: {
        id: true,
        product: true,
        price: true,
        image: true,
        quantity: true,
      },
    });

    // Set up the response with CORS headers
    return NextResponse.json(res, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Change to your specific frontend URL in production
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Change to your specific frontend URL in production
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

// Handle OPTIONS requests
export function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*", // Change to your specific frontend URL in production
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
