import { store } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import Bag from '../icons/emptybag.png'
import Image from 'next/image'
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCart } from "@/redux/cart/cartActions";



export function NonEmptyCart() {
    // const { items, isloading, error } = useSelector((state: any) => state.cart);
    const [totalQuantity,setTotalQuantity] = useState(0)
    const dispatch = useDispatch<AppDispatch>()
    const { items, isloading, error } = useSelector((state: any) => state.cart);
    console.log(items)

    useEffect(() => {
      dispatch(fetchCart())
    },[dispatch])

    // const itemsincart = () => {
    //     items.map((item: CartItem)=>{ 
    //     if(Number(item.quantity)>0){
    //         console.log(item.quantity)
    //         // setTotalQuantity((prev)=>prev+Number(item.quantity))
    //         setTotalQuantity(1)
    //     }
    //     })
    //     console.log(totalQuantity)
    // }

    useEffect(()=>{
        console.log(items)
        items.map((item: CartItem)=>{ 
          console.log(items)
          if(Number(item.quantity)>0){
              console.log(item.quantity)
              setTotalQuantity((prev)=>prev+Number(item.quantity))
          }
          })
    },[items])
    
    return (
      <div className="px-20 p-10 relative flex justify-between items-center min-w-full">
        <div>
          <h1 className='font-extrabold text-4xl mb-4'>{totalQuantity}</h1>
          <h1 className='text-gray-600 mb-12'>Looks like you have not added any items to your shopping bag yet.</h1>
          <Link href='/'>
          <Button className='w-full h-14'>Go back to Home</Button>
          </Link>
          
        </div>
        <Image src={Bag} alt="InsertBagImage" className='hidden sm:flex' />
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
  
  