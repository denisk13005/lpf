import prisma from "@/lib/prismaInstance.ts";

const jwt = require("jsonwebtoken");


export async function POST(req, res) {
  console.log('dans get user info');
  const userId = await req.json()
  console.log(userId);

      //   const  token = jwt.sign(
      //   { userId: newUser.id }, //on signe le token avec l'id de l'utilisateur pour ne pas qu'un autre utilisateur puisse modifier un produit (seul celui avec l'id peut modifier ses produits)
      //   process.env.JWT_SECRET, //on définit un sel pour le token
      //   { expiresIn: "24h" } //on définit une durée de validité du token
      // )


  // const token = response.token
  // const decodedToken = jwt.decode(token)
  // const expirationTime = new Date(decodedToken.exp * 1000); // Convertir en millisecondes
  // const currentTime = new Date();
  // if (currentTime < expirationTime) {
  //   console.log("Le JWT n'a pas encore expiré.");

  // } else {
  //   return new Response(JSON.stringify(
  //     {
  //       status : 401,
  //       msg:'token expired'
  //     }
  //   ))

  // }
 


}
