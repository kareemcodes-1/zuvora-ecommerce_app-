"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    quote:
      "The quality honestly surprised me. The fabric feels premium and the fit is perfect.",
    author: "ALEXANDRA MIRO",
  },
  {
    id: 2,
    quote:
      "I’ve ordered twice already. The pieces look even better in person and the delivery was fast.",
    author: "JAMES CARTER",
  },
  {
    id: 3,
    quote:
      "Minimal design, great materials, and everything fits so well. Easily one of my favorite brands.",
    author: "EMMA WILSON",
  },
  {
    id: 4,
    quote:
      "You can immediately tell the difference in quality. The stitching and fabric are excellent.",
    author: "DANIEL PARKER",
  },
  {
    id: 5,
    quote:
      "Every piece feels thoughtfully designed. Comfortable, stylish, and easy to wear every day.",
    author: "SOPHIA MARTINEZ",
  },
  {
    id: 6,
    quote:
      "I get compliments every time I wear their clothes. Definitely ordering more soon.",
    author: "OLIVER BENNETT",
  },
];

export default function TestimonialSwiper() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const testimonialHeadingRef = useRef(null);

  useEffect(() => {
      if (
        swiper &&
        swiper.params &&
        swiper.params.navigation &&
        prevRef.current &&
        nextRef.current
      ) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }, [swiper]);
    
      useEffect(() => {
        if (!testimonialHeadingRef.current) return;
    
        let split = new SplitText(testimonialHeadingRef.current, { 
        type: 'lines',
        mask: 'lines',
        linesClass: 'line',
        autoSplit: true });
    
        gsap.set(split.chars, { yPercent: 200 });
    
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              gsap.to(split.lines, {
                yPercent: 0,
                duration: 1,
                stagger: 0.030,
                ease: "power3.out",
              });
            } else {
              gsap.set(split.lines, { yPercent: 200 });
            }
          },
          { threshold: 0.2 }
        );
    
        observer.observe(testimonialHeadingRef.current);
    
        return () => observer.disconnect();
      }, []);

  return (
  <div className="relative w-full h-full">
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      speed={900}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      onSwiper={setSwiper}
      navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
      loop={true}
      className="w-full h-full"
    >
      {testimonials.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="w-full h-full flex flex-col items-center justify-center text-center px-[1.5rem] md:px-[4rem] lg:px-20 py-[6rem] lg:py-0">
            <p
              className="text-white text-[1.3rem] md:text-[2rem] lg:text-[3rem] font-light leading-relaxed max-w-4xl"
              ref={testimonialHeadingRef}
            >
              "{item.quote}"
            </p>
            <span className="text-white/70 text-[0.75rem] lg:text-[1rem] tracking-[0.3em] mt-6 lg:mt-8">
              {item.author}
            </span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Navigation */}
    <div className="absolute z-[200000] bottom-[1.5rem] lg:bottom-10 left-0 right-0 lg:left-auto lg:right-10 flex justify-center lg:justify-end">
      <div className="flex gap-[1rem] lg:gap-[1.5rem]">
        <button ref={prevRef} className="btn btn--light btn--icon-left cursor-pointer" />
        <button ref={nextRef} className="btn btn--light btn--icon-right cursor-pointer" />
      </div>
    </div>
  </div>
);
}
