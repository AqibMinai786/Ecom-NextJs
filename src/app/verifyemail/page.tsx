'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

// import { useRouter } from "next/router";

import Link from "next/link";


export default function VerifyEmailPage(){


    const [token, setToken]= useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    // const router = useRouter();

    const verifyUserEmail = async ()=>{
        try {
            // token bhi sath m bhej diya post req ke sath
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
            
                    // agr phle kabhi error aa chuki hai to true hogi so false krdenge
            setError(false)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }
    // jaise hi koi is page par aya hai matlb is component ko mount kra hai waise hi url se token nikal lenge

    useEffect(()=>{
        // agr phle kabhi error aa chuki hai to true hogi so false krdenge
        setError(false)
        // see in mailer we have designed url in a way that token is after = 
        const urlToken = window.location.search.split("=")[1];

        // const {query} = router;
        // const urlToken = query.token;

        setToken(urlToken || "");


    }, [])

    useEffect(()=>{
        setError(false)

        if(token.length>0){
            verifyUserEmail()
        }
    }, [token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                
            </div>
        )}
    </div>
    )
}