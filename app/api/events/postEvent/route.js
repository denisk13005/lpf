import { NextResponse } from 'next/server';
const multer = require('multer');
const path = require('path');

import prisma from '@/lib/prismaInstance';

export async function POST(req) {
  const formData = await req.formData()
  let description = await formData.get('description')
  let name = await formData.get('name')
  let userId = await formData.get('userId')
  let date = await formData.get('date')
  let picture = ""
  console.log(formData, 'formData');
  for (const entry of Array.from(formData.entries())) {
    const [key, value] = entry

    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value
      picture = Buffer.from(await blob.arrayBuffer());

    }



  }
  console.log(description, date, name, userId, picture);




  try {
    await prisma.Event.create(
      {
        data: {
          description: description,
          name: name,
          userId: userId,
          date: new Date(date),
          picture: picture.toString('base64')


        }
      }
    )

    return new Response(JSON.stringify({
      status: 201,
      msg: 'event created'
    }))
  } catch (error) {
    console.log("erreur dans la création d'un event", error);
  }

  return NextResponse.json({ msg: 'ok' })


}