import {connect} from "@/dbConfig/dbConfig";

import { NextResponse } from "next/server";


connect()
// here we haven't stored token in db so our goal is to only clean token
// This approach is called Bearer token whosoever have token is a valid user. This is token based approach.
// but if we have to create sessions then we put it on db and then delete it from db.
// here we not used this approach.
export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "", 
        { httpOnly: true, expires: new Date(0) 
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
        
    }