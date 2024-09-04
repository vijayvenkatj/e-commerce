import { EmptyCart } from "@/components/Cart/Cart";
import React from "react";

export default function Home() {
  return (
    <div className="relative min-h-full min-w-full flex justify-center">
    <EmptyCart />
    </div>
  );
}