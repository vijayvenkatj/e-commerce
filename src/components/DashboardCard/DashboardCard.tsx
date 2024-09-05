import { fetchCart } from "@/redux/cart/cartActions";
import { ItemCard } from "../itemCard/itemCard";
import { useEffect, useState } from "react";
import { Skeleton } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { Toaster } from "../ui/toaster";

interface CartItem {
  id?: number;
  product: string;
  image: string;
  quantity: string;
  price: string;
}

export function DashboardCard() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, isloading, error } = useSelector((state: RootState) => state.cart);
  console.log(items)

  useEffect(() => {
    dispatch(fetchCart())
  },[dispatch])

  return (
    <div className=" relative min-h-screen flex flex-col p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-grow ">
        {isloading && <div className="col-span-full row-span-full flex items-center justify-center h-full w-full">
            <Skeleton variant="rounded" animation="wave" width="100%" height="100%" />
        </div>}
        {items.map((item: CartItem) => (
          <ItemCard key={item.id} id={item.id} title={item.product} image={item.image} description={item.price + " INR"}/>
        ))}
      </div>
      <Toaster></Toaster>
    </div>
  );
}
