import prisma from '@/lib/prismaInstance';

export async function POST(req, res) {
  console.log('dans post ');
  try {
    const event = await req.json()
    console.log(event);
    await prisma.Event.create(
      {
        data: event
      }
    )

    return new Response(JSON.stringify({
      status: 201,
      msg: 'event created'
    }))
  } catch (error) {
    console.log("erreur dans la création d'un event", error);
  }

}