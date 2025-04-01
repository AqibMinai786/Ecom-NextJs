"use client";
import axios from "axios";
// import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Card from "@/components/card";




import { useState, useEffect } from "react";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string
  }
  
  


export default function ProfilePage() {

    const router = useRouter();
    
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProd= async () =>{
        try {
           const res = await axios.get('https://fakestoreapi.com/products');
           setProducts(res.data);           
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchProd()
    },[])

//     const handleclick = () =>{
//         router.push("/profile/cart");

// }

    return (
        
        < >

        <div>
            <h6 className="text-white text-3xl font-bold font-serif text-center p-4 m-4 ">Fashionkart</h6>
            <h1 className="text-center text-gray-400 font-serif font-light">"~ Fashion starts here"</h1>
        </div>
        <div className="grid md:grid-cols-3  gap-4 p-4 m-4">

            {products.map((product)=>(
                <Card key={product.id} product={product} />
              
            ))}

        </div>

           
         
        </>
        
    )
}