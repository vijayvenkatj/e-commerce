"use client"
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchCart } from "@/redux/cart/cartActions";
import { AppDispatch } from "@/redux/store";
import { CheckoutItems } from "./CheckoutItems";


export function OrderSummary(){
    const dispatch = useDispatch<AppDispatch>()
    const { items, isloading, error } = useSelector((state: any) => state.cart);
    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);   

    return(
        <div className="bg-white flex flex-col shadow-sm relative min-h-screen min-w-full">
            <span className="font-extrabold text-2xl mb-5 ">Order Summary</span>
            {items.map((item: any)=>(
                <CheckoutItems item={item}/>
            ))}
            <div className="flex justify-between">
            <span className="font-semibold text-lg mt-5">Total:</span>
            <span className="font-semibold text-lg mt-6">{items.reduce((total: number,item:any)=>{
                if (Number(item.quantity) > 0) {
                    return total + Number(item.price);
                }
                 return total;
            },0)}</span>
            </div>
            <button className="bg-black text-white mt-4 rounded-lg p-5">Continue to Checkout</button>
            
        </div>
    );
}

interface CartItem {
    id?: number;
    product: string;
    image: string;
    quantity: string;
    price: string;
  }