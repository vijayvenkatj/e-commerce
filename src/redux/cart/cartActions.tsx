import { PrismaClient } from "@prisma/client"
import axios from "axios"
import { useDispatch,useSelector } from "react-redux"
import React from "react"
import { addItem } from "./cartSlice"
import { createAsyncThunk, Dispatch, isRejectedWithValue} from "@reduxjs/toolkit"


export const fetchCart = createAsyncThunk('cart/fetchCart',async(thunkAPI)=>{
    try{
        const dispatch = useDispatch()
        const cart = await axios({
            url: "http://localhost:3000/api/cart/all",
            method: "get",
        })
        const cartItems = cart.data;
        return cartItems as cartItem[]
    }
    catch(error){
        console.log("Error fetching cartItems",error)
        return error as string
    }
})

export const addCartItem = createAsyncThunk('cart/addCartItem',async(Item: cartItem,thunkAPI)=>{
    try{
        const cart = await axios({
            url: "http://localhost:3000/api/cart/addItem",
            method: "post",
            data:{
                product: Item.product,
                image: Item.image,
                quantity: Item.quantity,
                price: Item.price
            }
        })
        if(cart){
            return Item;
        }
    }
    catch(error){
        console.log("Error adding cartItems",error)
        return error
    }
})
// export const addCartItem = (Item:cartItem) => async(dispatch: Dispatch ) =>{
//     try{
        
//         const cart = await axios({
//             url: "http://localhost:3000/api/cart/addItem",
//             method: "post",
//             data:{
//                 product: Item.product,
//                 image: Item.image,
//                 quantity: Item.quantity,
//                 price: Item.price
//             }
//         })
//         dispatch(addItem(Item))
//         if(cart){
//             return "Item added successfully..."
//         }
//     }
//     catch(error){
//         console.log("Error adding cartItems",error)
//     }
// }



interface cartItem{
    id?: number,
    product: string,
    image: string,
    quantity: string,
    price: string
}