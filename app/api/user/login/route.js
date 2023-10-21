import prisma from "@/lib/prismaInstance.ts";

import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

import { NextRequest, NextResponse } from "next/server";


export async function POST(req, res) {

  const userInfos = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: userInfos.email },
  });
  try {
    if (user && (await bcrypt.compare(userInfos.password, user.password))) {
      console.log("here");
      let obj = {
        message: "ok",
        userId: user.id,
        name: user.name,
        picture: user.picture,
        role: user.role
      };
      return new Response(
        JSON.stringify({
          status: 200,
          userInfos: obj,
        })
      );
    } else {
      return NextResponse.json({ message: 'mot de passe ou identifiant incorrect', status: 400 })
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET(NextRequest, NextResponse) {
  const userId = await NextRequest.nextUrl.searchParams.get('userId')

  const user = await prisma.user.findMany({
    where: {
      id: userId
    }
  })



  console.log(user, 'user -----------');
  return new Response(JSON.stringify({ user: user }))
}
