import { store } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import Ecomcart from '../icons/ecomcart.jpg'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCart } from "@/redux/cart/cartActions";
import { OrderSummary } from "./OrderSummary";



export function NonEmptyCart() {
    const [totalQuantity,setTotalQuantity] = useState(0)
    const dispatch = useDispatch<AppDispatch>()
    const { items, isloading, error } = useSelector((state: any) => state.cart);

     useEffect(() => {
     dispatch(fetchCart());
     }, [dispatch]);

    useEffect(() => {
      const newTotalQuantity = items.reduce((total: any, item: any) => {
        if (Number(item.quantity) > 0) {
          return total + Number(item.quantity);
        }
        return total;
      }, 0);
      setTotalQuantity(newTotalQuantity);
    }, [items]);
    
    return (
      <div className="p-10 relative flex justify-between min-w-full">
        <Image src={Ecomcart} alt="Insert Image here" width={730} height={330} className="hidden sm:flex rounded-lg"/>
        <div className="w-[640px] mt-5">
          <OrderSummary />
        </div>
        
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
  
  