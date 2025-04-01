"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function LoginPage() {
    toast.error("This is a test error message!");

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        if(user.email && user.password){
            try {
                setLoading(true);
                // post req ke sath user bhi bhej diya
                console.log("jjssd")
                const response = await axios.post("/api/users/login", user);
                console.log("jjsd", response)
                console.log("Login success", response.data);
                router.push("/profile");
                
            } catch (error:any) {
                console.log("Login failed :::", error.message);
                alert("Invalid credentials")
                toast.error(error.message);
            }finally {
                setLoading(false);
            }
        }
        else{
            alert("ALL fields required!")
        }
        
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="*"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="*"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit Sign Up page</Link>
        </div>
    )

}