import { NextResponse } from "next/server";
import prisma from '@/lib/prismaInstance';

export async function POST(req, res) {
  const body = await req.json()
  try {

    const product = await prisma.Products.create({
      data: body
    })
    console.log(product);
    console.log(body, 'add product');
    return NextResponse.json({ status: 201 })
  } catch (error) {
    return NextResponse.json({ status: 401, error: error })
  }
}