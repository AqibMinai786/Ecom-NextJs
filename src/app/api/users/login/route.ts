import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists", user.password);
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        console.log("validPassword ", validPassword )
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
        // now only server can manipulate(change) cookies; user can see it only on browser but can not change
            httpOnly: true, 
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

// 1️⃣Security: httpOnly Prevents XSS Attacks

// response.cookies.set("token", token, {
//   httpOnly: true,
// });
// httpOnly: true means JavaScript on the client-side cannot access the cookie.

// This prevents Cross-Site Scripting (XSS) attacks, where malicious scripts try to steal tokens.

// If you store the token in localStorage or sessionStorage, it is accessible via JavaScript, making it vulnerable to XSS attacks.

// 2️⃣ Automatic Token Handling in Requests
// When using cookies, the browser automatically sends the cookie with every request to the server.

// This makes it easier to authenticate users without manually attaching a token in each API request (like with Authorization headers).

// 3️⃣ Persistent Authentication
// Cookies persist across sessions, meaning users stay logged in even after refreshing the page.

// If you use localStorage, the token is accessible but not automatically sent in requests.

// If you use sessionStorage, the token disappears when the user closes the browser.

// 4️⃣ Easier Logout Handling
// When logging out, you can invalidate the cookie by setting its expiration date to the past:


// response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
// This clears the token from the browser automatically, preventing unauthorized access.

// 5️⃣ Avoiding Token Manipulation
// If you store the token in localStorage, a user can manually change it.

// With cookies (httpOnly), users can see them in the browser but cannot modify them.

// 📌 Summary
// ✔ Using cookies makes authentication more secure and automatic.
// ✔ httpOnly: true protects the token from being stolen via XSS attacks.
// ✔ Users remain logged in across sessions because cookies persist.
// ✔ Tokens are auto-sent in every request, avoiding manual headers.

// This is why many authentication systems prefer secure cookies over localStorage for storing tokens.