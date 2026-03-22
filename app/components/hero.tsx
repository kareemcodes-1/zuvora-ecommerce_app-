"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import SplitText from "gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);



const Hero = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const heroHeadings = useRef<(HTMLHeadingElement | null)[]>([]);
  const heroImage = useRef<HTMLImageElement | null>(null);
  const heroLink = useRef<HTMLAnchorElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });



  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    heroHeadings.current.forEach((heading) => {
      if (!heading) return;

      let split = new SplitText(heading, { type: "chars" });

      // Set initial state immediately — before animation runs
      gsap.set(split.chars, { yPercent: 100, opacity: 0 });

      gsap.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.025,
        ease: "power3.out",
        delay: 0.5,
      });
    });

    if (heroImage.current) {
      gsap.fromTo(
        heroImage.current,
        {
          filter: "blur(20px)",
          scale: 1.1,
        },
        {
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }


    gsap.to(container.current, {
      duration: 2,
      filter: "blur(1rem)",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom-=30vh top",
        scrub: 2,

        onUpdate: (self) => {
          const rotation = self.progress * 5;
          const scale = 1 - self.progress * 0.1; // scales from 1 → 0.8

          gsap.set(container.current, {
            rotateZ: rotation,
            scale: scale
          });
        },
        // markers: true, // enable for debug
        onLeave: () => {
          gsap.set(container.current, { autoAlpha: 0 }); // hides after scrolling down
        },
        onEnterBack: () => {
          gsap.set(container.current, { autoAlpha: 1 }); // show again when scrolling back up
        },
      },
    });

    if (!heroLink.current) return;

    gsap.set(heroLink.current, { yPercent: 100, opacity: 0 });

    gsap.to(heroLink.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    });

  }, []);

  return (
    <div
      ref={container}
      className="w-full h-screen sticky top-0"
    >
      <motion.section style={{ y }} className="relative h-full w-full">
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none overlay" />
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/hero.webp"
            alt="hero-bg"
            fill

            quality={100}
            ref={heroImage}
            sizes="100vw"
            className="object-cover object-[60%] lg:object-top"
          />
        </div>

        <div className="flex flex-col justify-end w-full h-full px-[1.5rem] lg:px-8 pb-[2rem] lg:pb-[1rem] relative z-[15]">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[1.5rem] lg:gap-0">
            <div>
              <h1
                className="text-[2.5rem] sm:text-[3rem] md:text-[5rem] lg:text-[6.5rem] !text-white text-start leading-[1.5] lg:leading-[1.3] uppercase font-[200] overflow-hidden whitespace-nowrap"
                ref={(el) => { heroHeadings.current[0] = el; }}
              >
                More Than
              </h1>
              <h1
                className="text-[2.5rem] sm:text-[3rem] md:text-[5rem] lg:text-[6.5rem] !text-white text-start leading-[1.5] lg:leading-[1.3] uppercase font-[200] overflow-hidden whitespace-nowrap"
                ref={(el) => { heroHeadings.current[1] = el; }}
              >
                Just Clothes
              </h1>
            </div>

            <div className="overflow-hidden h-[3.5rem] lg:h-[4.5rem]">
              <Link
                ref={heroLink}
                href={'/collections/mens'}
                className="btn btn--light btn--icon-right cursor-pointer"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Hero;
