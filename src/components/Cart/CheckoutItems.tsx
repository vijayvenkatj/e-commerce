import Image from "next/image";
  export function CheckoutItems({ key,item }: any) {
  
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img src={item.image} alt={item.product} className="h-16 w-16 mr-2" />
          <div>
            <h3 className="font-semibold">{item.product}</h3>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
        <div>
          <span className="font-semibold">{item.price*item.quantity}</span>
        </div>
      </div>
    );
  }
  