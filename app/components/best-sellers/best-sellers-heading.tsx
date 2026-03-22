// best-sellers-heading.tsx (client component)
"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const BestSellersHeading = () => {
  const bestSellersHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!bestSellersHeadingRef.current) return;

    const split = new SplitText(bestSellersHeadingRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
    });

    gsap.set(split.lines, { yPercent: 100 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(split.lines, {
            yPercent: 0,
            duration: 1,
            stagger: 0.025,
            ease: "power3.out",
          });
        } else {
          gsap.set(split.lines, { yPercent: 100 });
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(bestSellersHeadingRef.current);

    return () => observer.disconnect();
  }, []);

  return (
  <h2
    ref={bestSellersHeadingRef}
    className="text-[2.2rem] md:text-[3.5rem] lg:text-[5rem] mb-[1.5rem] uppercase text-center overflow-hidden leading-[1]"
  >
    Best Sellers
  </h2>
);
};

export default BestSellersHeading;