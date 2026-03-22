"use client";
import React from "react";
import { motion } from "framer-motion";

const DURATION = 0.50;
const STAGGER = 0.05;

interface FlipTextProps {
  children: string;
}

const FlipText: React.FC<FlipTextProps> = ({ children }) => {
  return (
    <motion.div
      className="relative block overflow-hidden whitespace-nowrap"
      style={{ lineHeight: 0.75 }}
      initial="initial"
      animate="flip"
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              flip: {
                y: ["0%", "-100%", "0%"], // flip up and back
              },
            }}
            transition={{
              duration: DURATION * 2,
              ease: "easeInOut",
              delay: STAGGER * i,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            key={`bottom-${i}`}
            className="inline-block"
            variants={{
              initial: { y: "100%" },
              flip: {
                y: ["100%", "0%", "100%"],
              },
            }}
            transition={{
              duration: DURATION * 2,
              ease: "easeInOut",
              delay: STAGGER * i,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default FlipText;
