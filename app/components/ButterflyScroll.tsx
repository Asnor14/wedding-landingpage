"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Butterfly from "./Butterfly";

interface ButterflyScrollProps {
    envelopeInView: boolean;
}

export default function ButterflyScroll({ envelopeInView }: ButterflyScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLanded, setIsLanded] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    const posX = useMotionValue(0);
    const posY = useMotionValue(0);
    const rotation = useMotionValue(0);
    const scale = useMotionValue(1);

    useEffect(() => {
        const updateSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            posX.set(window.innerWidth / 2);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [posX]);

    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const scrollYPercent = useTransform(smoothProgress, [0, 0.7, 1], [0.15, 0.55, 0.70]);
    const scrollXOffset = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 15, -10, 12, 0]);
    const scrollRotate = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [-5, 8, -3, 6, 0]);

    const calculateLandingPosition = useCallback(() => {
        const titleElement = document.getElementById("youre-invited-title");
        if (titleElement) {
            const rect = titleElement.getBoundingClientRect();
            return {
                x: rect.right + 10,
                y: rect.top + rect.height / 2 - 25,
            };
        }
        return null;
    }, []);

    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
    };

    useEffect(() => {
        if (windowSize.width === 0) return;

        let animationFrame: number;
        const centerX = windowSize.width / 2;

        const updatePosition = () => {
            if (isLanded) {
                const targetPos = calculateLandingPosition();
                if (targetPos) {
                    posX.set(lerp(posX.get(), targetPos.x, 0.08));
                    posY.set(lerp(posY.get(), targetPos.y, 0.08));
                    rotation.set(lerp(rotation.get(), 5, 0.08));
                    scale.set(lerp(scale.get(), 0.9, 0.08));
                }
            } else {
                const targetY = scrollYPercent.get() * windowSize.height;
                posX.set(lerp(posX.get(), centerX + scrollXOffset.get(), 0.1));
                posY.set(lerp(posY.get(), targetY, 0.1));
                rotation.set(lerp(rotation.get(), scrollRotate.get(), 0.1));
                scale.set(lerp(scale.get(), 1, 0.1));
            }

            animationFrame = requestAnimationFrame(updatePosition);
        };

        updatePosition();

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isLanded, windowSize, calculateLandingPosition, posX, posY, rotation, scale, scrollXOffset, scrollYPercent, scrollRotate]);

    useEffect(() => {
        if (envelopeInView && !isLanded) {
            const timer = setTimeout(() => setIsLanded(true), 200);
            return () => clearTimeout(timer);
        } else if (!envelopeInView && isLanded) {
            setIsLanded(false);
        }
    }, [envelopeInView, isLanded]);

    if (windowSize.width === 0) return null;

    return (
        <motion.div
            ref={containerRef}
            className="pointer-events-none fixed z-50"
            style={{
                left: posX,
                top: posY,
                rotate: rotation,
                scale: scale,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <Butterfly isLanded={false} />
        </motion.div>
    );
}
