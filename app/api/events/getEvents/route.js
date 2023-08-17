import prisma from "@/lib/prismaInstance.ts";



export async function GET(req, res) {

  const events = await prisma.event.findMany()
  return new Response(JSON.stringify(events))



}
