import prisma from "@/lib/prismaInstance.ts";

const jwt = require("jsonwebtoken");

// check si le token est expiré (vallidité du token pas mise en place pour le moment)
export async function POST(req, res) {
  console.log('dans get user info');
  const token = await req.json().token


  const decodedToken = jwt.decode(token)
  const expirationTime = new Date(decodedToken.exp * 1000); // Convertir en millisecondes
  const currentTime = new Date();
  if (currentTime < expirationTime) {
    console.log("Le JWT n'a pas encore expiré.");

  } else {
    return new Response(JSON.stringify(
      {
        status: 401,
        msg: 'token expired'
      }
    ))

  }



}

