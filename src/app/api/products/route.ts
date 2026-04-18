import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/store';
import type { ApiResponse, Product } from '@/types';

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category');

  const result: Product[] =
    category && category !== 'All'
      ? products.filter((p) => p.category === category)
      : products;

  return NextResponse.json<ApiResponse<Product[]>>({
    success: true,
    data: result,
  });
}