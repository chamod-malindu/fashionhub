'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Bookmark } from 'lucide-react';
import SizeSelector from '@/components/SizeSelector';
import ColorSwatch from '@/components/ColorSwatch';
import type { Product } from '@/types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('');
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const json = await res.json();
        if (json.success) {
          setProduct(json.data);
          setSelectedColor(json.data.colors[0]?.name ?? '');
          if (json.data.sizes.includes('L')) setSelectedSize('L');
          else setSelectedSize(json.data.sizes[0] ?? '');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          image: product.image,
          color: selectedColor,
          size: selectedSize,
          price: product.price,
          quantity: 1,
        }),
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-400 text-sm">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-10 h-10 flex items-center justify-center -ml-1"
        >
          <ArrowLeft size={24} color="#111827" strokeWidth={2} />
        </button>
        <span className="text-base font-semibold text-gray-900">Details</span>
        <button aria-label="Save product" className="w-10 h-10 flex items-center justify-center">
          <Bookmark size={22} color="#111827" strokeWidth={1.8} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">

        {/* Product image */}
        <div className="relative mx-5 rounded-[28px] overflow-hidden bg-[#F0EBE3]" style={{ aspectRatio: '1 / 1.1' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 390px) 100vw, 350px"
            priority
          />
          {/* Carousel dot indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block rounded-full transition-all ${
                  i === 0
                    ? 'w-5 h-1.5 bg-gray-700'
                    : 'w-1.5 h-1.5 bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="px-5 mt-5">

          <div className="flex items-start justify-between gap-4">
            <h1 className="text-[22px] font-bold text-gray-900 leading-snug flex-1">
              {product.name}
            </h1>
            <div className="pt-1">
              <ColorSwatch
                colors={product.colors}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </div>
          </div>

          {/* Size label */}
          <p className="mt-5 text-base font-semibold text-gray-900">Size</p>

          {/* Size selector */}
          <div className="mt-3">
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onChange={setSelectedSize}
            />
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white px-5 py-5 border-t border-gray-100">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[26px] font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="flex-1 py-4 rounded-full bg-orange-500 text-white font-semibold text-sm disabled:opacity-70 active:scale-95 transition-transform"
          >
            {added ? '✓ Added!' : adding ? 'Adding...' : 'Add To Cart'}
          </button>
        </div>
      </div>

    </div>
  );
}
