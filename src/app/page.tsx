import Image from 'next/image';
import Link from 'next/link';

export default function SplashPage() {
  return (
    <main className="flex flex-col h-screen overflow-hidden">

      {/* Hero photo */}
      <div className="relative flex-shrink-0 rounded-b-[40px] overflow-hidden"
        style={{ height: '62%' }}>
        <Image
          src="/images/Rectangle-989.png"
          alt="Find the best collections"
          fill
          priority
          className="object-cover object-center"
          sizes="390px"
        />
      </div>

      {/* Text and buttons */}
      <div className="flex flex-col justify-between flex-1 px-7 pt-8 pb-10">

        {/* Headline and subtitle */}
        <div>
          <h1 className="text-[36px] font-bold leading-tight tracking-tight text-gray-900">
            Find The<br />Best Collections
          </h1>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Get your dream item easily with FashionHub
            and get other interesting offers
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4">
          {/* Sign Up */}
          <Link
            href="/explore"
            className="flex-1 py-4 rounded-full border border-gray-300 text-center text-sm font-semibold text-gray-800"
          >
            Sign Up
          </Link>

          {/* Sign In */}
          <Link
            href="/explore"
            className="flex-1 py-4 rounded-full bg-orange-500 text-center text-sm font-semibold text-white"
          >
            Sign In
          </Link>
        </div>

      </div>
    </main>
  );
}