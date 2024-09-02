"use client"
import React, { useState } from "react";
import { addCartItem } from "../../redux/cart/cartActions";
import { store } from "../../redux/store";

export function AddItem(){
    const [item,setItem] = useState({
        product: '',
        price: '',
        image: '',
        quantity: ''
    })
    const dispatch = store.dispatch


    async function additem(){
        console.log("hi")
        const res = await dispatch(addCartItem(item))
        console.log(res)
    }
    return(
        <div>
            <label htmlFor="product">Product</label>
            <input className="bg-gray-300 m-2 p-2" onChange={(e)=> setItem({...item,product:e.target.value as string}) }></input>
            <label htmlFor="price">Price</label>
            <input className="bg-gray-300 m-2 p-2" onChange={(e)=> setItem({...item,price:e.target.value as string}) }></input>
            <label htmlFor="image">Image</label>
            <input className="bg-gray-300 m-2 p-2" onChange={(e)=> setItem({...item,image:e.target.value as string}) }></input>
            <label htmlFor="quantity">Quantity</label>
            <input className="bg-gray-300 m-2 p-2" onChange={(e)=> setItem({...item,quantity:e.target.value as string}) }></input>
            <button className="flex flex-col justify-center p-4 m-4 rounded bg-gray-500 " onClick={additem}>Add item</button>
        </div>
    );
}


interface cartItem{
    id?: number,
    product: string,
    image: string,
    quantity: string,
    price: string
}
interface cart{
    items: cartItem[],
    isloading: boolean,
    error: string | null
}