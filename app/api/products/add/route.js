// import { NextResponse } from "next/server";
// import prisma from '@/lib/prismaInstance';

// export async function POST(req, res) {
//   const body = await req.json()
//   try {

//     const product = await prisma.Products.create({
//       data: body
//     })
//     console.log(product);
//     console.log(body, 'add product');
//     return NextResponse.json({ status: 201 })
//   } catch (error) {
//     return NextResponse.json({ status: 401, error: error })
//   }
// }
import { NextResponse } from 'next/server';
const multer = require('multer');
const path = require('path');

import prisma from '@/lib/prismaInstance';

export async function POST(req) {
  const formData = await req.formData()
  console.log(formData, 'form data');
  let description = await formData.get('description')
  let title = await formData.get('title')
  let size = await formData.get('size')
  let price = await formData.get('price')
  let category = await formData.get('category')
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
  console.log(description, title, price, size, picture);



  try {
    await prisma.Products.create(
      {
        data: {
          description: description,
          title: title,
          price: parseInt(price),
          size: size,
          category: category,
          picture: picture.toString('base64')


        }
      }
    )

    return new Response(JSON.stringify({
      status: 201,
      msg: 'product created'
    }))
  } catch (error) {
    console.log("erreur dans la création d'un produit", error);
  }

  return NextResponse.json({ msg: 'ok' })


}