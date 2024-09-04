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


// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//   try {
//     // Fetch data from the cart table
//     const res = await prisma.cart.findMany({
//       select: {
//         id: true,
//         product: true,
//         price: true,
//         image: true,
//         quantity: true,
//       },
//     });

//     // Set up the response with CORS headers
//     const response = NextResponse.json(res, { status: 200 });
//     response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000"); // Change to your frontend URL
//     response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     response.headers.set("Access-Control-Allow-Credentials", "true");
    
//     return response;
//   } catch (error) {
//     console.error("Error fetching data:", error);

//     const errorResponse = NextResponse.json(
//       { error: "An error occurred while fetching data" },
//       { status: 500 }
//     );

//     errorResponse.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
//     errorResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     errorResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     errorResponse.headers.set("Access-Control-Allow-Credentials", "true");

//     return errorResponse;
//   }
// }

// // Handle OPTIONS requests for CORS
// export function OPTIONS() {
//   const response = NextResponse.json({}, { status: 204 });
//   response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000"); // Change to your frontend URL
//   response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   response.headers.set("Access-Control-Allow-Credentials", "true");
//   return response;
// }
