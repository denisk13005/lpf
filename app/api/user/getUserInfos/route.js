import prisma from "@/lib/prismaInstance.ts";
const jwt = require("jsonwebtoken");


export async function POST(req, res) {
  console.log('dans get user info');
  const response = await req.json()

  const token = response.token
  const userWithToken = token && await prisma.account.findUnique(
    {
      where : {access_token : token}
    })

  const tokenValid = await jwt.verify(token, process.env.JWT_SECRET)
  const userId = userWithToken.userId
  if(tokenValid){

    const user = await prisma.user.findUnique({
      where :{id : userId}
    })
    return new Response(JSON.stringify(
      {
        user
      }
    ))
  }
  try {
    
  } catch (error) {
    
  }
}
