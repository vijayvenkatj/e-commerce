import Link from "next/link";
import Image from "next/image";
import ikea from "../icons/ikea.svg";
import cart from "../icons/cart.svg";
import profile from "../icons/profile.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCart } from "@/redux/cart/cartActions";

export function Navbar() {
  return (
    <nav className="h-16 w-full sticky bg-white flex flex-col justify-between p-4 shadow-lg">
      <div className="h-full w-full flex justify-between items-center px-2">
        <Link href="/">
          <Image src={ikea} alt="Ikea Logo" height={64} width={84} />
        </Link>
        {/* <div className="hidden sm:flex flex-grow justify-center p-1 text-2xl text-black">
          Discounts up to 30%!!
        </div> */}
        <div>
          <ul className="flex gap-4 items-center p-2">
            <li className="flex items-center ml-10 text-black ">
              <Link href="/cart" className="flex items-center">
                <div className="hidden sm:flex mr-5">
                  <Image src={cart} height={26} alt="Cart Icon" />
                </div>
                <div className="hover:border-b-2">Cart</div>
                {/* <button>{items.totalQuantity}</button> */}
              </Link>
            </li>
            <li className="flex items-center ml-10 text-black">
              <Link href="/login" className="flex items-center">
                <div className="hidden sm:flex mr-5">
                  <Image src={profile} height={26} alt="Profile Icon" />
                </div>
                <div className="hover:border-b-2">
                Login
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
