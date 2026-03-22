"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import SplitText from "gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const Hero = () => {

   function handleTop() {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
           });
    }
  

  return (
  <div className="relative w-full h-screen pb-[2rem]">
    <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none overlay" />
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Image
        src="https://framerusercontent.com/images/ZOcmQpeHuLkFU8U8hajo3Van96s.jpg?width=1920&height=2644"
        alt="hero-bg"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>

    <div className="flex flex-col justify-end w-full h-full px-[1.5rem] lg:px-8 relative z-[15]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[0.8rem] lg:text-[1rem] text-white/60">
            About
          </span>
          <h1
            className="text-[2.5rem] md:text-[4rem] lg:text-[6.5rem] !text-white text-start leading-[1.5] lg:leading-[1.3] uppercase font-[200]"
            id="hero-heading"
          >
            GET TO KNOW <br /> ZUVORA
          </h1>
        </div>

        <div className="hidden lg:block">
        <button
          onClick={handleTop}
          className="lg:block hidden btn btn--light btn--icon-left rotate-[-90deg]"
        />
         </div>
      </div>
    </div>
  </div>
);
};

export default Hero;
