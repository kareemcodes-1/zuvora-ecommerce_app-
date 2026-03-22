"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCheck } from "lucide-react";

export default function SuccessPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 overflow-hidden relative">

      {/* Background grain texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle radial glow */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-white opacity-[0.03] blur-[120px]" />
      </div>

      {/* Top label */}
      <div
        className={`absolute top-[2rem] left-[2rem] text-[0.75rem] tracking-[0.25rem] uppercase text-white/30 font-[300] transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        Zuvora
      </div>

      {/* Order number top right */}
      <div
        className={`absolute top-[2rem] right-[2rem] text-[0.75rem] tracking-[0.15rem] uppercase text-white/20 font-[300] transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        Order Confirmed
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center text-center max-w-[480px] gap-[2.5rem]">

        {/* Icon */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="w-[72px] h-[72px] rounded-full border border-white/10 flex items-center justify-center bg-white/5">
            <CheckCheck size={28} strokeWidth={1.25} className="text-white/80" />
          </div>
        </div>

        {/* Heading */}
        <div
          className={`flex flex-col gap-[0.5rem] transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-[3.5rem] font-black uppercase leading-[1] tracking-[-0.02em]">
            Thank You.
          </h1>
          <p className="text-[1rem] text-white/40 font-[300] leading-[1.6]">
            Your order has been placed and is being processed. You'll receive a confirmation email shortly.
          </p>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col gap-[1rem] w-full transition-all duration-700 delay-[600ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/shop"
            className="next-btn btn-base btn-light !w-[50%]"
          >
            Continue Shopping
          </Link>
          <Link
            href="/profile"
            className="next-btn btn-base btn-light !bg-white !text-black !w-[50%]"
          >
            View Orders
          </Link>
        </div>
      </div>
    </main>
  );
}