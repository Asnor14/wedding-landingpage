"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiProps {
    isActive: boolean;
}

export default function Confetti({ isActive }: ConfettiProps) {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        color: string;
        delay: number;
        duration: number;
        size: number;
    }>>([]);

    useEffect(() => {
        if (isActive) {
            const colors = ["#C9A962", "#B76E79", "#E8D5D3", "#F5F0E8", "#FFD700", "#FFC0CB"];
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 2,
                size: 6 + Math.random() * 8,
            }));
            setParticles(newParticles);
        } else {
            setParticles([]);
        }
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-sm"
                    style={{
                        left: `${particle.x}%`,
                        top: -20,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                    }}
                    initial={{ y: -20, rotate: 0, opacity: 1 }}
                    animate={{
                        y: window.innerHeight + 100,
                        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                        opacity: [1, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}
