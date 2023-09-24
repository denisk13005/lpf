import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismaInstance.ts";

export async function POST(NextRequest) {
  console.log('tata');
  try {
    // const req = await NextRequest.json()
    // const userId = req.userId
    // console.log(userId, '-----------------------------');
    // trouve le token relié à l'userId dans Account

    const userAccount = await prisma.token.findMany()
    console.log(userAccount, 'userAccount');
    return NextResponse.json({ userAccount: userAccount, status: 200 })
  }
  catch (error) {
    return NextResponse.json({ message: error, status: 400 })
  }
}
