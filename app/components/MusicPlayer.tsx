"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
            setShowPrompt(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowPrompt(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <audio ref={audioRef} loop preload="none">
                <source src="/music/wedding-music.mp3" type="audio/mpeg" />
            </audio>

            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
                <AnimatePresence>
                    {showPrompt && !isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                            style={{ fontFamily: "'Lora', serif", color: "#4A3728" }}
                        >
                            <span className="text-sm">♪ Play music</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
                    style={{
                        backgroundColor: isPlaying ? "#B76E79" : "#C9A962",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    {isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </motion.button>
            </div>

            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        className="fixed bottom-6 right-24 z-40 flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1 rounded-full"
                                style={{ backgroundColor: "#C9A962" }}
                                animate={{
                                    height: [8, 20, 8],
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
