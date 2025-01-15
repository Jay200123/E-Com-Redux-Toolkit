import { useGetProductsQuery } from "../../state/api/reducer";
import { addCart, removeCart, clearState, setState, clearCart } from "../../state/slice/cart";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; 

export default function () {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductsQuery();
  
  const cart = useSelector((state) => state.cart);
  const [cartQty, setCartQty] = useState(1);

  console.log(cart);

  const incrementCart = () => {
    setCartQty(cartQty + 1);
  };

  const decrementCart = () => {
    setCartQty(cartQty - 1);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full md:flex-row">
      <h3 className="text-sm font-medium md:text-lg md:font-bold">
        This is a home page
      </h3>
      {data?.details?.map((p) => (
        <div key={p?._id} className="w-[100px] h-[100px] bg-gray-200">
          <p className="text-sm">{p?.product_name}</p>
          <p className="text-sm">{p?.price}</p>
          <button onClick={incrementCart}>+</button>
          <p>{cartQty}</p>
          <button onClick={decrementCart}>-</button>  
          <button onClick={()=>dispatch(addCart({
            product: p,
            quantity: cartQty 
          }))}>Add to cart</button>
        </div>
      ))}
      {cart?.product?.map((p)=>(
        <div key={p?._id} className="w-[100px] h-[100px] bg-gray-200">
          <p className="text-sm">{p?.product_name}</p>
          <p className="text-sm">{p?.price}</p>
          <p>{p?.quantity}</p>
        </div>
      ))} 
      <h3 onClick={()=>dispatch(clearCart())}>test</h3>
    </div>
     
  );
}
