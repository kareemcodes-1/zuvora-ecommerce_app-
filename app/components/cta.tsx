'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

function CTA() {

  const ctaHeadings = useRef<(HTMLHeadingElement | null)[]>([]);

useEffect(() => {
  const observers: IntersectionObserver[] = [];

  ctaHeadings.current.forEach((heading) => {
    if (!heading) return;

    const split = new SplitText(heading, {
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

    observer.observe(heading);
    observers.push(observer);
  });

  return () => observers.forEach((o) => o.disconnect());
}, []);

  return (
<section className="w-full aspect-square md:aspect-[4/3] lg:aspect-[16/9] relative overflow-hidden">
    {/* Background Image */}
    <Image
      src="https://framerusercontent.com/images/b8cGuFasel4Uods6c35OnyOY.jpg?width=1920&height=2880"
      alt="cta-background"
      fill
      quality={75}
      priority
      className="object-cover object-center"
    />

    {/* Overlays */}
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

    {/* CTA Content */}
    <div className="absolute bottom-0 left-0 z-20 p-[1.5rem] md:p-[3rem] lg:p-16 w-full">
      
      {/* Eyebrow */}
      <p className="text-white/60 uppercase tracking-[0.25em] text-[0.75rem] md:text-[0.85rem] lg:text-[1rem] font-[200] mb-3 lg:mb-4">
        New Arrivals
      </p>

      {/* Headline */}
      <div>
        <h1
          className="text-white font-[200] uppercase leading-[1.5] lg:leading-[1.3] text-[2.8rem] md:text-[4.5rem] lg:text-[6rem] overflow-hidden"
          ref={(el) => { ctaHeadings.current[0] = el; }}
        >
          Wear What
        </h1>
        <h1
          className="text-white font-black uppercase leading-[1.5] lg:leading-[1.3] mb-6 lg:mb-8 text-[2.8rem] md:text-[4.5rem] lg:text-[6rem] overflow-hidden"
          ref={(el) => { ctaHeadings.current[1] = el; }}
        >
          Moves You.
        </h1>
      </div>

      {/* CTA Button */}
      <Link href={'/collections/mens'} className="btn btn--light btn--icon-right cursor-pointer w-full lg:w-auto mb-[1.5rem] lg:mb-[2rem]" 
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 2.5em)', 
          height: 'clamp(3rem, 5vw, 5rem)' 
        }}
      >
        SHOP NOW
      </Link>

    </div>
  </section>
);
}

export default CTA;