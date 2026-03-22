"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const VideoPreview = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);
  return (
    <div
      ref={container}
      className="lg:h-screen overflow-hidden sticky top-0 w-full"
    >
      <motion.section style={{ y }}>
        <video
          className="w-full lg:h-full h-[60vh] object-cover"
          src="https://framerusercontent.com/assets/Jrokg6alyBgm1Pjbi6TM0iK3Qww.mp4"
          autoPlay
          muted
          loop
          preload="auto"
        // controls
        ></video>

      </motion.section>
    </div>
  );
};

export default VideoPreview;
