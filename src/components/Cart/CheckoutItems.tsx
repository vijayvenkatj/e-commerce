import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateCartItem,fetchCart } from "@/redux/cart/cartActions";
import { useEffect, useState } from "react";

export function CheckoutItems({ key,item }: any) {

  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState(item.quantity*item.price);

  useEffect(()=>{
    const newTotal = quantity*item.price
    setTotal(newTotal)
    console.log(newTotal)
  },[quantity])

  const dispatch = useDispatch<AppDispatch>()

  async function handleIncrement() {
    const res = await dispatch(updateCartItem({id:item.id,func:"add"}))
      if (res.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchCart());
        setQuantity(quantity+1)
      }
  }
  async function handleDecrement() {
    console.log("decre")
    const res = await dispatch(updateCartItem({id:item.id,func:"remove"}))
      if (res.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchCart());
        setQuantity(quantity-1)
      }
  }
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img src={item.image} alt={item.product} className="h-16 w-16 mr-5" />
        <div>
          <h3 className="font-semibold">{item.product}</h3>
          <div className="mt-1"><button onClick={handleDecrement} className="p-1 text-white bg-black rounded-l-lg">-</button><span className="p-3">{quantity}</span><button onClick={handleIncrement} className="p-1 text-white bg-black rounded-r-lg">+</button></div>
        </div>
      </div>
      <div>
        <span className="font-semibold">{total}</span>
      </div>
    </div>
  );
}
