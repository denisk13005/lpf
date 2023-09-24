import prisma from "@/lib/prismaInstance.ts";

import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

import { NextRequest, NextResponse } from "next/server";


export async function POST(req, res) {
  // req.headers.set("Access-Control-Allow-Origin", "*");
  // req.headers.set("Access-Control-Allow-Methods", "POST");
  // req.headers.set("Access-Control-Allow-Headers", "Content-Type");
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
      const unauthorizedResponse = new Response("Requête non autorisée", {
        status: 401,
        statusText: "Unauthorized",
        headers: {
          "Content-Type": "text/plain",
        },
      });
      return unauthorizedResponse;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET(NextRequest, NextResponse) {
  const userId = await NextRequest.nextUrl.searchParams.get('userId')
  console.log(userId, '-------------');

  const user = await prisma.user.findMany({
    where: {
      id: userId
    }
  })



  console.log(user, '-----------');
  return new Response(JSON.stringify({ user: user }))
}
