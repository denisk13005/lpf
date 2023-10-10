import prisma from '@/lib/prismaInstance';





export async function PUT(req, res) {
  console.log('dans put');
  const data = await req.formData()
  const userId = await data.get('id')
  let picture = await data.get('picture')
  console.log(userId, picture);
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry

    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value
      picture = Buffer.from(await blob.arrayBuffer());

    }



  }
  try {

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        picture: picture.toString('base64')
      },
    })
    console.log(updateUser);
    return new Response(JSON.stringify({
      status: 201,
      msg: 'user update:' + updateUser
    }))
  } catch (error) {
    console.log('error in update user ' + error);
  }
}