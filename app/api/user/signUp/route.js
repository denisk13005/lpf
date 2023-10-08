import prisma from '@/lib/prismaInstance';
import bcrypt from 'bcrypt';
const jwt = require("jsonwebtoken");




export async function POST(req, res) {
  const userInfos = await req.formData();
  const name = await userInfos.get('name')
  const email = await userInfos.get('email')
  const password = await userInfos.get('password')
  let picture = ""
  for (const entry of Array.from(userInfos.entries())) {
    const [key, value] = entry

    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value
      picture = Buffer.from(await blob.arrayBuffer());

    }



  }
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  try {
    if (user) {
      console.log('mauvais identifiants ! veuillez changer vos identifiants');
    }
    else {
      const hashPassword = await bcrypt.hash(password, 10)


      const newUser = await prisma.User.create(
        {
          data: {
            name: name,
            email: email,
            password: hashPassword,
            picture: picture.toString('base64')
          }
        }
      )
      const token = jwt.sign(
        { userId: newUser.id }, //on signe le token avec l'id de l'utilisateur pour ne pas qu'un autre utilisateur puisse modifier un produit (seul celui avec l'id peut modifier ses produits)
        process.env.JWT_SECRET, //on définit un sel pour le token
        { expiresIn: "168h" } //on définit une durée de validité du token
      )
      console.log(token);
      console.log(newUser);
      const Account = await prisma.Token.create({
        data: {
          userId: newUser.id,
          access_token: token
        }
      })
      // console.log(Account);
      return new Response(
        JSON.stringify({
          status: 201,
          newUser,
          Account
        })
      );
    }
  } catch (error) {
    console.log('error in signup', error);
  }
}
