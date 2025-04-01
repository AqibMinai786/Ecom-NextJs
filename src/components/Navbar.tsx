"use client";  // Required for Next.js (if using app directory)
import { useEffect, useState } from "react";

import Image from "next/image";

import { ShoppingCart } from "lucide-react";


import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import axios from "axios";
import {toast} from "react-hot-toast";

import { RootState } from "@/store/store"; // Adjust this based on your store path
import { useSelector } from "react-redux"; // Importing to access Redux store


export default function Navbar() {

  const userAvatar = "https://randomuser.me/api/portraits/men/75.jpg";

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);



  const [isOpen, setIsOpen] = useState(false); // Step 1: Track menu state

  const pathname = usePathname(); // Get the current route
  const router = useRouter(); // For handling navigation

  const [data, setData] = useState("no user")

  const handleClick = ()=>{
    router.push("/profile/cart");  // Redirect to Cart page
  }

  const handleHome = () =>{
    router.push("/profile")
  }
  

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me')
      setData("Hi, "+ res.data.data.username)

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (pathname) {
      getUserDetails();
    }
  }, [pathname]);
  
  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        toast.success('Logout successful')
        router.push('/login')
        setData("no user")
        
    } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
    }
}

  return (
    <>
      {/* 🔹 Navbar Container */}
      <nav className="bg-gray-800 fixed top-0 left-0 w-full shadow-md z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            
            {/* 🔹 Mobile Menu Button (Hamburger) */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)} // Step 2: Toggle state
              >
                <span className="sr-only">Open main menu</span>

                {/* 🔹 Show Hamburger Icon (☰) when menu is closed */}
                {!isOpen && (
                  <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}

                {/* 🔹 Show Close Icon (✖) when menu is open */}
                {isOpen && (
                  <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* 🔹 Desktop Navigation (Visible on large screens) */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <span>
                    {pathname.startsWith("/profile") && (
                      <button onClick={handleHome} className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"> Home </button> 
                    )
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Mobile Menu (Visible only when `isOpen` is true) */}
        {isOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <span>
                {pathname.startsWith("/profile") && (
                      <button onClick={handleHome} className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"> Home </button> 
                    )

                }
              </span>
            </div>
          </div>
        )}
        <div className="absolute right-8 top-3">

  
        
          {/* User Info */}
          <div className="flex items-center space-x-2">

            <Image 
              src={userAvatar} 
              alt="User Avatar" 
              width={32} 
              height={32} 
              className="rounded-full"
            />
            <span className="text-white text-sm">{data}</span>
            <hr></hr>
            <span>
            {pathname.startsWith("/profile") && (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Logout
              </button>
            )}
            </span>

            <span className="relative">
                    {pathname.startsWith("/profile") && (
                      <button onClick={handleClick} className="relative px-2 py-2 rounded-full bg-gray-500 hover:bg-gray-600">
                        <ShoppingCart className="text-white w-6 h-6" />
                        {totalItems > 0 && (
                          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gray-900 rounded-full">
                            {totalItems}
                          </span>
                        )}
                      </button>
                    )
                    }
            </span>

          </div>

        
        

        </div>


        
        
      </nav>
    </>
  );
}
