  
import Image from "next/image";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store"; 

export default function Card({ product }: { product: { id: number; title: string; image: string; price: number; description: string } }) {

    const dispatch = useDispatch();

    // Get cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // Check if the item is already in the cart
    const isInCart = cartItems.some(item => item.id === product.id);

    const addRemoveCart = () => {
        if (!isInCart) {
            console.log(`Item added to cart: ${product.title} (ID: ${product.id})`);
            dispatch(addToCart(product));
        } else {
            console.log(`Item removed from cart: ${product.title} (ID: ${product.id})`);
            dispatch(removeFromCart(product.id));
        }
    };

    
    return (
      <div className="max-w-sm mx-auto bg-gray-800 rounded-2xl overflow-hidden m-4 p-2">
        <div className="p-4">
          <div className="relative w-full h-48">
             <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"/>
          </div>
<br />
          <h2 className="text font-semibold text-white break-words">
            {product.title}
          </h2>
          <br />
          <p className="text-gray-400">
            Price: ${product.price}
          </p>
<br />
          <button 
            onClick={addRemoveCart} 
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            {isInCart ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>
    );
}
