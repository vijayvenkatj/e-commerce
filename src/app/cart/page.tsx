"use client"
import { Cart } from "@/components/Cart/Cart";
import { NonEmptyCart } from "@/components/Cart/NonEmptyCart";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

export default function Home() {

  return (
    <Provider store={store}>
      <div className="relative min-h-full min-w-full flex justify-center">
        <Cart />
      </div>
    </Provider>     
  );
}
