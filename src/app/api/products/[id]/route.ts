import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/store';
import type { ApiResponse, Product } from '@/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: `Product "${id}" not found` },
      { status: 404 }
    );
  }

  return NextResponse.json<ApiResponse<Product>>({
    success: true,
    data: product,
  });
}