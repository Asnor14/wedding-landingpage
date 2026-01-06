"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Confetti from "./Confetti";

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleName?: string;
  weddingDate?: string;
  venue?: string;
  message?: string;
}

export default function InvitationModal({
  isOpen,
  onClose,
  coupleName = "Lucas & Amelia",
  weddingDate = "June 14, 202X",
  venue = "[Venue Name]",
  message = "We can't wait to celebrate love with you.",
}: InvitationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonText, setButtonText] = useState("Celebrate with Us 🎉");

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setShowConfetti(false);
      setButtonText("Celebrate with Us 🎉");
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleCelebrate = () => {
    setShowConfetti(true);
    setButtonText("🎉 Yay!");
    
    setTimeout(() => {
      setShowConfetti(false);
      setButtonText("Celebrate with Us 🎉");
    }, 3000);
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.1, duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <Confetti isActive={showConfetti} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
          >
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <motion.div
              className="relative z-10 w-full max-w-lg"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="invitation-title"
            >
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-2xl"
                variants={letterVariants}
                style={{ background: "linear-gradient(145deg, #FFFEF7 0%, #F5F0E8 100%)" }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 text-[#4A3728]/60 hover:text-[#4A3728] transition-colors p-1"
                  aria-label="Close invitation"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="absolute inset-3 border-2 rounded pointer-events-none" style={{ borderColor: "#C9A96233" }} />

                <div className="p-10 md:p-14 text-center">
                  <div className="mb-6 flex justify-center">
                    <svg width="60" height="30" viewBox="0 0 60 30">
                      <path d="M0 15 Q 15 0, 30 15 Q 45 30, 60 15" fill="none" stroke="#C9A962" strokeWidth="1.5" />
                      <circle cx="30" cy="15" r="3" fill="#B76E79" />
                    </svg>
                  </div>

                  <p
                    className="text-sm tracking-widest uppercase mb-6"
                    style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}
                  >
                    Together with their families
                  </p>

                  <h2
                    id="invitation-title"
                    className="text-4xl md:text-5xl mb-6"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}
                  >
                    {coupleName}
                  </h2>

                  <p className="text-base mb-8" style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}>
                    joyfully invite you<br />to celebrate their wedding
                  </p>

                  <div className="mb-8 flex justify-center items-center gap-3">
                    <div className="h-px w-12" style={{ backgroundColor: "#C9A962" }} />
                    <span style={{ color: "#B76E79" }}>♥</span>
                    <div className="h-px w-12" style={{ backgroundColor: "#C9A962" }} />
                  </div>

                  <p
                    className="text-xl md:text-2xl mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}
                  >
                    {weddingDate}
                  </p>

                  <p
                    className="text-sm tracking-wide uppercase mb-8"
                    style={{ fontFamily: "'Lora', serif", color: "#B76E79" }}
                  >
                    {venue}
                  </p>

                  <p className="text-base italic mb-8" style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}>
                    {message}
                  </p>

                  <motion.button
                    onClick={handleCelebrate}
                    className="px-8 py-3 rounded-full text-white font-medium shadow-lg"
                    style={{
                      backgroundColor: "#B76E79",
                      fontFamily: "'Lora', serif",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(183, 110, 121, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {buttonText}
                  </motion.button>

                  <div className="mt-8 flex justify-center">
                    <svg width="40" height="20" viewBox="0 0 40 20">
                      <path d="M0 10 Q 10 0, 20 10 Q 30 20, 40 10" fill="none" stroke="#C9A962" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
