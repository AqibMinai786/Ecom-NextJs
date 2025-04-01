import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

// data lene k liye mtlb post k andr ya get k andr knhi to data lena hi hai isliye next/server use krenge
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

console.log("MONGO_URI:", process.env.MONGO_URI);

// to connect to db because here functions gets deployed so they do not know they are connected or not 
// so each time connect with db
connect()

// because db is in diff continent
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}