"use client";

import { motion, Variants } from "framer-motion";

interface ButterflyProps {
  isLanded?: boolean;
  className?: string;
}

export default function Butterfly({ isLanded = false, className = "" }: ButterflyProps) {
  const wingVariants: Variants = {
    flutter: {
      scaleX: [1, 0.7, 1],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    landed: {
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.svg
      width="60"
      height="50"
      viewBox="0 0 60 50"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
      <motion.g
        variants={wingVariants}
        animate={isLanded ? "landed" : "flutter"}
        style={{ originX: 1, originY: 0.5 }}
      >
        <path
          d="M30 25 C 20 10, 5 5, 2 20 C 0 30, 10 40, 20 35 C 25 33, 28 28, 30 25"
          fill="url(#wingGradientLeft)"
          stroke="#B76E79"
          strokeWidth="0.5"
        />
        <circle cx="12" cy="20" r="3" fill="rgba(255,255,255,0.3)" />
        <circle cx="18" cy="28" r="2" fill="rgba(255,255,255,0.2)" />
      </motion.g>

      <motion.g
        variants={wingVariants}
        animate={isLanded ? "landed" : "flutter"}
        style={{ originX: 0, originY: 0.5 }}
      >
        <path
          d="M30 25 C 40 10, 55 5, 58 20 C 60 30, 50 40, 40 35 C 35 33, 32 28, 30 25"
          fill="url(#wingGradientRight)"
          stroke="#B76E79"
          strokeWidth="0.5"
        />
        <circle cx="48" cy="20" r="3" fill="rgba(255,255,255,0.3)" />
        <circle cx="42" cy="28" r="2" fill="rgba(255,255,255,0.2)" />
      </motion.g>

      <ellipse cx="30" cy="25" rx="2" ry="8" fill="#4A3728" />

      <path d="M29 17 Q 27 12, 25 10" fill="none" stroke="#4A3728" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M31 17 Q 33 12, 35 10" fill="none" stroke="#4A3728" strokeWidth="0.8" strokeLinecap="round" />

      <defs>
        <linearGradient id="wingGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8D5D3" />
          <stop offset="50%" stopColor="#C9A962" />
          <stop offset="100%" stopColor="#B76E79" />
        </linearGradient>
        <linearGradient id="wingGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8D5D3" />
          <stop offset="50%" stopColor="#C9A962" />
          <stop offset="100%" stopColor="#B76E79" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
