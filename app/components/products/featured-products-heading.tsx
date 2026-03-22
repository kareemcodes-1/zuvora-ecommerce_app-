"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const FeaturedProductsHeading = () => {
  const productHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!productHeadingRef.current) return;

    const split = new SplitText(productHeadingRef.current, {
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

    observer.observe(productHeadingRef.current);

    return () => observer.disconnect();
  }, []);

  return (
  <h1
    ref={productHeadingRef}
    className="text-[2.2rem] md:text-[3.5rem] lg:text-[5rem] telegraf font-[200] overflow-hidden lg:leading-[1] mb-[1.5rem] lg:mb-0"
  >
    Featured Products
  </h1>
);
};

export default FeaturedProductsHeading;