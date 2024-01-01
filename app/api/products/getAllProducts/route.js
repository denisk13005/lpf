import prisma from '@/lib/prismaInstance';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req, res) {
  const products = await prisma.Products.findMany()
  return NextResponse.json(products)
}