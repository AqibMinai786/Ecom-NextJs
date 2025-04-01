"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "@/store/cartSlice";
import { RootState } from "@/store/store"; // Adjust based on your store path

export default function Cart() {

    const router = useRouter();

    const dispatch = useDispatch();


    // Get cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleClick = () => {
        router.push("/profile");
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price*item.quantity), 0);


    return (
        <div className="p-4">
            <h2 className="text-xl text-white text-center font-serif">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-300 mt-2 text-center">Your cart is empty.</p>
            ) : (
                <ul className="mt-4 p-2 m-2">
                    {cartItems.map((item) => (
                        <li key={item.id} className="border-b border-gray-600 py-2 flex items-center gap-4">
                            <Image 
                              src={item.image} 
                              alt={item.title} 
                              width={64}  // Set width instead of using className="w-16"
                              height={64} // Set height instead of using className="h-16"
                              className="object-cover rounded"
                            />
                            <div>
                                <h3 className="text-white">{item.title}</h3>
                                <br />
                                <p className="text-gray-300">Price: ${item.price}</p>
                            </div>

                             {/* 🔹 Quantity Controls */}
                            <div className="flex ml-auto items-center mt-2 p-2 m-2 ">
                                    <button 
                                        onClick={() => dispatch(decreaseQuantity(item.id))}
                                        className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-700"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2 text-white">{item.quantity}</span>
                                    <button 
                                        onClick={() => dispatch(increaseQuantity(item.id))}
                                        className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-700"
                                    >
                                        +
                                    </button>
                            </div>

                        </li>
                    ))}
                </ul>
            )}

            <button onClick={handleClick} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                Add items
            </button>

            <ul className="mt-4 p-2 m-2">
              <li className="border-b border-gray-600 py-2 flex justify-between"> 
              <h3 className="font-bold text-xl font-serif">Order Total:
                 
              </h3>
              <span className="ml-2 text-xl">${total.toFixed(2)}</span>
              </li>
            </ul>

 
        </div>
    );    
    
}
