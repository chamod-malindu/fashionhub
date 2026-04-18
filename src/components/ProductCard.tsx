'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

async function quickAddToCart(product: Product) {
  await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: product.id,
      name: product.name,
      image: product.image,
      color: product.colors[0]?.name ?? 'Default',
      size: 'L',
      price: product.price,
      quantity: 1,
    }),
  });
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Link href={`/products/${product.id}`} className="block">
        {/* Image container */}
        <div className="relative rounded-2xl overflow-hidden bg-[#F0EBE3]"
             style={{ aspectRatio: '0.75' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 390px) 50vw, 195px"
          />

          {/* Cart button — dark circle, bottom right */}
          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await quickAddToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <ShoppingBag size={18} color="white" strokeWidth={2} />
          </button>
        </div>
      </Link>

      {/* Price and name below image */}
      <div className="px-1">
        <p className="text-sm font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 truncate mt-0.5">{product.name}</p>
      </div>
    </div>
  );
}