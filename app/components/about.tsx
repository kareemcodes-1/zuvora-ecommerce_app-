"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import { useEffect, useRef } from "react";
import SplitText from "gsap/SplitText";
import TextOpacity from "../../lib/text-opacity";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const About = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const aboutSubText = useRef<HTMLParagraphElement | null>(null);
  const aboutDesc = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {

    if(aboutSubText.current){
      let split = new SplitText(aboutSubText.current, { 
        type: 'chars, words',
    });

    gsap.from(split.words, {
      y: 100,
      duration: .8,
      stagger: 0.025,
      scrollTrigger: {
        trigger: aboutSubText.current,
        start: "-50px 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    });
    }

    if (aboutDesc.current) {
      let split = new SplitText(aboutDesc.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line',
        autoSplit: true
      });

      gsap.from(split.lines, {
        yPercent: 100,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutDesc.current,
          start: "top 80%", // starts when top of element is 80% down the viewport
          end: "bottom 20%",
          toggleActions: "play none none reverse", // play once when scrolling into view
        }
      });
    }

  }, []);

  return (
  <section
    ref={ref}
    className="bg-[#000000] py-[3rem] lg:px-[2rem] px-[1rem] relative z-[90] min-h-screen w-full"
  >
    <div className="flex flex-col h-full justify-between gap-[3rem] lg:gap-0">
      
      {/* Subtext */}
      <div className="mt-[2rem] overflow-hidden">
        <p
          ref={aboutSubText}
          className="text-[0.85rem] lg:text-[1rem] text-white text-start telegraf font-[200]"
        >
          We don't just sell clothes. we create art.
        </p>
      </div>

      {/* Text Opacity Animation */}
      <TextOpacity />

      {/* Description */}
      <div className="flex items-end lg:ml-auto lg:justify-end">
        <p
          ref={aboutDesc}
          className="text-white w-full lg:w-[500px] text-[0.8rem] lg:text-[1rem] mt-0 lg:mt-[6rem] uppercase telegraf font-[200] overflow-hidden leading-[1.8]"
        >
          We design and offer fashion pieces that are as stylish as they are
          functional, while fostering a conversation around self-expression,
          body confidence, and empowerment.
        </p>
      </div>

    </div>
  </section>
);
};

export default About;
