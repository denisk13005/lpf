import prisma from '@/lib/prismaInstance';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const products = await prisma.Products.findMany()
  return NextResponse.json(products)
}