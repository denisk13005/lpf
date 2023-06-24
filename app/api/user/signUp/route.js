import prisma from '@/lib/prismaInstance';
import  bcrypt  from 'bcrypt';



export async function POST(req, res) {
  const userInfos = await req.json();
  console.log(userInfos);
  const user = await prisma.user.findUnique({
    where: { email: userInfos.email },
  });

  try {
    if(user){
      console.log('mauvais identifiants ! veuillez changer vos identifiants');
    }
    else {
      const hashPassword = await bcrypt.hash(userInfos.password,10)

      const newUser = await prisma.User.create(
      {data:  {
          name : userInfos.name,
          email: userInfos.email,
          password: hashPassword
        }}
      )
      return new Response(
        JSON.stringify({
          status: 201,
          newUser,
        })
      );
    }
  } catch (error) {
    console.log('error in signup', error);
  }
}
