import prisma from "@/lib/prismaInstance.ts";

import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");


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
      
      };
      return new Response(
        JSON.stringify({
          status: 200,
          userInfos :obj,
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
