'use client';

import { useState, useEffect } from 'react';
import { LayoutGrid, UserRound } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import BottomNav from '@/components/BottomNav';
import type { Product } from '@/types';

const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'Other'] as const;
type Category = (typeof CATEGORIES)[number];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const url =
          activeCategory === 'All'
            ? '/api/products'
            : `/api/products?category=${activeCategory}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.success) setProducts(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        {/* square grid icon */}
        <button aria-label="Menu">
          <LayoutGrid size={26} color="#111827" strokeWidth={2} />
        </button>

        {/* Profile icon */}
        <button aria-label="Profile">
          <UserRound size={32} color="#111827" strokeWidth={1.5} />
        </button>
      </div>

      {/* Heading */}
      <div className="px-5 mt-4 mb-5">
        <h1 className="text-[40px] font-bold text-gray-900 leading-tight">
          Explore
        </h1>
        <p className="text-sm text-gray-400 mt-1">Best trendy collection!</p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-5 overflow-x-auto no-scrollbar pb-1 mb-5">
        {CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                shrink-0 px-5 py-2 rounded-full text-sm font-semibold
                transition-colors duration-150
                ${active
                  ? 'bg-orange-500 text-white'
                  : 'bg-transparent text-gray-500'
                }
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product grid */}
      <div className="flex-1 px-5 pb-28">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}