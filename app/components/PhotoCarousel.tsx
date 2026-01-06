"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

interface PhotoCarouselProps {
    images?: string[];
    speed?: number;
    title?: string;
}

const defaultImages = [
    "/photos/photo-1.jpg",
    "/photos/photo-2.jpg",
    "/photos/photo-3.jpg",
    "/photos/photo-4.jpg",
    "/photos/photo-5.jpg",
    "/photos/photo-6.jpg",
];

export default function PhotoCarousel({
    images = defaultImages,
    speed = 50,
    title = "Our Moments",
}: PhotoCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimationControls();
    const [isPaused, setIsPaused] = useState(false);
    const [imagesExist, setImagesExist] = useState<boolean[]>([]);

    const duplicatedImages = [...images, ...images];
    const imageWidth = 320;
    const imageGap = 24;
    const totalWidth = images.length * (imageWidth + imageGap);

    useEffect(() => {
        const checkImages = async () => {
            const checks = await Promise.all(
                images.map(async (src) => {
                    try {
                        const res = await fetch(src, { method: "HEAD" });
                        return res.ok;
                    } catch {
                        return false;
                    }
                })
            );
            setImagesExist(checks);
        };
        checkImages();
    }, [images]);

    useEffect(() => {
        const duration = totalWidth / speed;

        const startAnimation = () => {
            controls.start({
                x: -totalWidth,
                transition: {
                    duration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                },
            });
        };

        if (!isPaused) {
            startAnimation();
        } else {
            controls.stop();
        }
    }, [controls, totalWidth, speed, isPaused]);

    const getPlaceholderGradient = (index: number) => {
        const gradients = [
            "linear-gradient(135deg, #E8D5D3 0%, #C9A962 100%)",
            "linear-gradient(135deg, #F5F0E8 0%, #B76E79 100%)",
            "linear-gradient(135deg, #C9A962 0%, #E8D5D3 100%)",
            "linear-gradient(135deg, #B76E79 0%, #F5F0E8 100%)",
            "linear-gradient(135deg, #4A3728 0%, #C9A962 100%)",
            "linear-gradient(135deg, #E8D5D3 0%, #4A3728 100%)",
        ];
        return gradients[index % gradients.length];
    };

    return (
        <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
            <motion.div
                className="text-center mb-12 px-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2
                    className="text-3xl md:text-4xl mb-4"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}
                >
                    {title}
                </h2>
                <div className="flex justify-center items-center gap-3">
                    <div className="h-px w-12" style={{ backgroundColor: "#C9A962" }} />
                    <span style={{ color: "#B76E79" }}>♥</span>
                    <div className="h-px w-12" style={{ backgroundColor: "#C9A962" }} />
                </div>
            </motion.div>

            <div
                ref={containerRef}
                className="relative cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <div
                    className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to right, #F5F0E8 0%, transparent 100%)" }}
                />

                <div
                    className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to left, #F5F0E8 0%, transparent 100%)" }}
                />

                <motion.div className="flex gap-6" animate={controls} style={{ width: "fit-content" }}>
                    {duplicatedImages.map((src, index) => {
                        const originalIndex = index % images.length;
                        const imageExists = imagesExist[originalIndex];

                        return (
                            <div
                                key={`${src}-${index}`}
                                className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
                                style={{ width: imageWidth, height: 240 }}
                            >
                                {imageExists ? (
                                    <Image
                                        src={src}
                                        alt={`Wedding moment ${originalIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="320px"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center"
                                        style={{ background: getPlaceholderGradient(originalIndex) }}
                                    >
                                        <div className="text-center text-white/80">
                                            <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto mb-2 opacity-60">
                                                <rect x="4" y="8" width="40" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                                                <circle cx="16" cy="20" r="4" fill="currentColor" />
                                                <path d="M4 32 L16 24 L24 30 L36 20 L44 28 L44 36 C44 38.2 42.2 40 40 40 L8 40 C5.8 40 4 38.2 4 36 Z" fill="currentColor" opacity="0.5" />
                                            </svg>
                                            <p className="text-sm" style={{ fontFamily: "'Lora', serif" }}>
                                                Photo {originalIndex + 1}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            <motion.p
                className="text-center mt-8 text-sm"
                style={{ color: "#6B6B6B", fontFamily: "'Lora', serif" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                Hover to pause
            </motion.p>
        </section>
    );
}
