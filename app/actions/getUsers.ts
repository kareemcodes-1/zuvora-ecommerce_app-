"use server"

import dbConnect from "@/lib/dbConnect";

export async function getUsers (){
    try {
        await dbConnect();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

