"use client"
import React, { useState } from 'react';
import cart from "../icons/cart.svg"
import Image from 'next/image';
import { AppDispatch } from '@/redux/store';
import { Skeleton } from '@mui/material';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { fetchCart, updateCartItem } from '@/redux/cart/cartActions';

export const ItemCard: any = ({ id,image,title,description }: any) => {

  const dispatch = useDispatch<AppDispatch>()
  const [loading,setLoading] = useState(true);
  const {toast} = useToast()

  const handleClick = () => {
    AddtoCart(id);
  };

  
  async function AddtoCart(id:number) {
      const res = await dispatch(updateCartItem(id))
      if (res.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchCart());
      }
      toast({
        description: "Item added to Cart successfully",
      })
      console.log(res)
  }
  return (
    <div className="max-w-sm rounded overflow-hidden bg-white">
      {loading && (
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height="100%"
        />
      )}
      <img
        className="w-full"
        src={image}
        alt="insertImage"
        onLoad={() => setLoading(false)}
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="flex px-6 pt-4 pb-2">
      <button
        className="flex items-center justify-center gap-3 bg-gray-200 sm:bg-black hover:underline text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
        onClick={handleClick}
        >
        <div className='flex sm:hidden'>
        <Image
          src={cart}
          width={24}
          height={24}
          alt="Cart icon"
        />
        </div>
        
        <span className="hidden sm:flex text-base font-medium">Add to Cart</span>
      </button>

        
      </div>
    </div>
  );
};


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