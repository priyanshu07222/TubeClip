import { NextRequest, NextResponse } from "next/server";
import prisma from '@repo/db/client'



export async function POST(req:NextRequest, res: NextResponse){
    // client.user.create({
    //     data:{
    //         name: "heelo"
    //     }
    // })

    const data =  await req.json()
    console.log("data", data)
    await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    })

    return Response.json({ message: 'Hello from Next.js!', data })
}

export async function GET() {
    const data = await prisma.user.findMany()
    console.log(data)

    return Response.json({
        msg: "data fetched",
        data
    })
}