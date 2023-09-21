import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismaInstance.ts";

export async function POST(NextRequest) {
  try {
    const userLpfAccount = await NextRequest.json()
    // trouve le token relié à l'userId dans Account

    const userAccount = await prisma.token.findMany({
      where: {
        userId: userLpfAccount.userId.toString()
      }

    })
    return NextResponse.json({ userAccount: userAccount, status: 200 })
  }
  catch (error) {
    return NextResponse.json({ message: error, status: 400 })
  }
}
