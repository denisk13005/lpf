// import prisma from "@/lib/prisma/prisma.js";

// import bcrypt from "bcrypt";
// const jwt = require("jsonwebtoken");

export async function POST(req, res) {
  const userInfos = await req.json();
  // const user = await prisma.user.findUnique({
  //   where: { email: userInfos.email },
  // });
  // try {
  //   if (user && (await bcrypt.compare(userInfos.password, user.password))) {
  //     console.log("here");
  //     let obj = {
  //       message: "ok",
  //       userId: user.id,
  //       name: user.name,
  //       picture: user.picture,
  //       token: jwt.sign(
  //         { userId: user.id }, //on signe le token avec l'id de l'utilisateur pour ne pas qu'un autre utilisateur puisse modifier un produit (seul celui avec l'id peut modifier ses produits)
  //         process.env.JWT_SECRET, //on définit un sel pour le token
  //         { expiresIn: "24h" } //on définit une durée de validité du token
  //       ),
  //     };
      return new Response(
        JSON.stringify({
          status: 200,
          userInfos,
        })
      );
  //   } else {
  //     const unauthorizedResponse = new Response("Requête non autorisée", {
  //       status: 401,
  //       statusText: "Unauthorized",
  //       headers: {
  //         "Content-Type": "text/plain",
  //       },
  //     });
  //     return unauthorizedResponse;
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
}
