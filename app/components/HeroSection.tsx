"use client";

import { motion, Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface HeroSectionProps {
    coupleName?: string;
    weddingDate?: string;
    invitationText?: string;
    videos?: string[];
}

export default function HeroSection({
    coupleName = "Lucas & Amelia",
    weddingDate = "June 14, 2026",
    invitationText = "Together with their families, joyfully invite you to celebrate their wedding",
    videos = ["/videos/hero-wedding.mp4", "/videos/hero-wedding2.mp4"],
}: HeroSectionProps) {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [nextVideoIndex, setNextVideoIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const currentVideoRef = useRef<HTMLVideoElement>(null);
    const nextVideoRef = useRef<HTMLVideoElement>(null);

    const handleVideoEnded = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        if (nextVideoRef.current) {
            nextVideoRef.current.currentTime = 0;
            nextVideoRef.current.play().catch(() => { });
        }

        setTimeout(() => {
            setCurrentVideoIndex(nextVideoIndex);
            setNextVideoIndex((nextVideoIndex + 1) % videos.length);
            setIsTransitioning(false);
        }, 1000);
    };

    useEffect(() => {
        if (nextVideoRef.current) {
            nextVideoRef.current.load();
        }
    }, [nextVideoIndex]);

    useEffect(() => {
        if (currentVideoRef.current) {
            currentVideoRef.current.play().catch(() => { });
        }
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <motion.video
                    ref={currentVideoRef}
                    key={`current-${currentVideoIndex}`}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnded}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isTransitioning ? 0 : 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <source src={videos[currentVideoIndex]} type="video/mp4" />
                </motion.video>

                <motion.video
                    ref={nextVideoRef}
                    key={`next-${nextVideoIndex}`}
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransitioning ? 1 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <source src={videos[nextVideoIndex]} type="video/mp4" />
                </motion.video>

                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background: `linear-gradient(135deg, #2C1810 0%, #3D2317 20%, #4A3728 40%, #5C4A3A 60%, #6B5A4C 80%, #7A6B5E 100%)`,
                    }}
                />
            </div>

            <div className="hero-overlay absolute inset-0 z-10" />

            <motion.div
                className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-6">
                    <svg width="40" height="20" viewBox="0 0 40 20" className="text-muted-gold">
                        <path d="M0 10 Q 10 0, 20 10 Q 30 20, 40 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="mb-4 max-w-md text-sm tracking-widest uppercase opacity-80"
                    style={{ fontFamily: "'Lora', serif" }}
                >
                    {invitationText}
                </motion.p>

                <motion.h1
                    variants={itemVariants}
                    className="heading-elegant mb-6 text-5xl md:text-7xl lg:text-8xl font-light"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                    }}
                >
                    {coupleName}
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="mb-6 h-px w-24 bg-gradient-to-r from-transparent via-muted-gold to-transparent"
                    style={{ backgroundColor: "#C9A962" }}
                />

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl tracking-wider"
                    style={{ fontFamily: "'Lora', serif", color: "#E8D5D3" }}
                >
                    {weddingDate}
                </motion.p>

                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 text-white/60"
                    >
                        <span className="text-xs tracking-widest uppercase">Scroll</span>
                        <svg width="20" height="30" viewBox="0 0 20 30" className="opacity-60">
                            <rect x="1" y="1" width="18" height="28" rx="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <motion.circle
                                cx="10"
                                cy="10"
                                r="3"
                                fill="currentColor"
                                animate={{ cy: [10, 18, 10] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
