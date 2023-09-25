import { NextResponse } from "next/server";
import prisma from "@/lib/prismaInstance.ts";




export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id !== null) {
    const event = await prisma.event.findMany({
      where: {
        id: id
      }
    })
    return NextResponse.json(event)

  } else {

    const events = await prisma.event.findMany()
    return NextResponse.json(events)
  }



}
