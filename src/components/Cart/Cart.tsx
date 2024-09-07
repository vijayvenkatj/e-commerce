import Bag from '../icons/emptybag.png'
import Image from 'next/image'
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useState,useEffect } from "react";
import { AppDispatch } from "@/redux/store";
import { fetchCart } from "@/redux/cart/cartActions";
import { useDispatch,useSelector } from "react-redux";
import { NonEmptyCart } from './NonEmptyCart';

export function Cart() {
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
      totalQuantity>0?<NonEmptyCart />:
      <div className="px-20 p-10 relative flex sm:justify-between justify-around items-center min-w-full">
        <div>
          <h1 className='font-extrabold text-4xl mb-4'>Your shopping bag is empty</h1>
          <h1 className='text-gray-600 mb-12'>Looks like you have not added any items to your shopping bag yet.</h1>
          <Link href='/'>
          <Button className='w-full h-14'>Go back to Home</Button>
          </Link>
          
        </div>
        <Image src={Bag} alt="InsertBagImage" />
      </div>
    );
  }
  