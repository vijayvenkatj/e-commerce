import Link from "next/link";
import Image from "next/image";
import ikea from "../icons/ikea.svg";
import cart from "../icons/cart.svg";
import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
export function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch<AppDispatch>()
  const { items, isloading, error } = useSelector((state: any) => state.cart);
  useEffect(() => {
    const totalItems = items.reduce((total: any, item: any) => total + Number(item.quantity), 0);
    setCount(totalItems);
  }, [cartItems]);

  async function handleLogout(){
    const res = await axios.put('/api/user/logout')
    if(res.request.responseURL){
      window.location.href = res.request.responseURL; 
    }
    else{
      console.log("Error with redirection")
    }
    
  }

  return (
    <nav className="h-16 w-full sticky bg-white flex flex-col justify-between p-4 shadow-lg">
      <div className="h-full w-full flex justify-between items-center px-2">
        <Link href="/">
          <Image src={ikea} alt="Ikea Logo" height={64} width={84} />
        </Link>
        <div>
          <ul className="flex gap-4 items-center p-2">
            <li className="flex items-center ml-10 text-black ">
              <Link href="/cart" className="flex items-center">
                <div className="hidden sm:flex mr-5">
                  Cart
                </div>
                <div className="gap-1 flex justify-around">
                  <Image src={cart} height={26} alt="Cart Icon" />
                  {count>0?<button className="bg-black text-white rounded-full text-xs w-4 h-4 flex text-center justify-center">
                  {count}
                  </button>:<></>}
                </div>
                
              </Link>
            </li>
            <li className="flex items-center ml-0 text-black">
              <button className="bg-white p-1 rounded text-black hover:font-semibold" onClick={handleLogout}>
                  Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
