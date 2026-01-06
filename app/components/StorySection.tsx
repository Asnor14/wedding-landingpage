"use client";

import { motion, Variants } from "framer-motion";

export default function StorySection() {
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section className="relative min-h-screen py-32 px-6" style={{ backgroundColor: "#F5F0E8" }}>
            <div
                className="absolute top-0 left-0 right-0 h-32"
                style={{ background: "linear-gradient(to bottom, rgba(74, 55, 40, 0.1) 0%, transparent 100%)" }}
            />

            <div className="mx-auto max-w-3xl text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <h2
                        className="heading-elegant mb-8 text-3xl md:text-4xl"
                        style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}
                    >
                        Our Love Story
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="mb-12 flex justify-center"
                >
                    <svg width="100" height="30" viewBox="0 0 100 30">
                        <path d="M0 15 Q 25 0, 50 15 Q 75 30, 100 15" fill="none" stroke="#C9A962" strokeWidth="1.5" />
                        <circle cx="50" cy="15" r="4" fill="#B76E79" />
                    </svg>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="space-y-8"
                >
                    <p className="text-lg leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}>
                        From the moment we met, we knew there was something special between us.
                        What started as a simple hello blossomed into a beautiful journey of
                        love, laughter, and countless precious memories.
                    </p>

                    <p className="text-lg leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}>
                        Through every adventure and every quiet moment, our love has only grown
                        stronger. Now, we are ready to take the next step and begin our forever
                        together.
                    </p>
                </motion.div>

                <motion.blockquote
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="mt-16 border-l-2 pl-6 text-left"
                    style={{ borderColor: "#C9A962" }}
                >
                    <p className="text-xl italic" style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}>
                        &ldquo;Whatever our souls are made of, yours and mine are the same.&rdquo;
                    </p>
                    <cite className="mt-2 block text-sm not-italic" style={{ color: "#6B6B6B" }}>
                        — Emily Brontë
                    </cite>
                </motion.blockquote>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="mt-20 flex justify-center gap-4"
                >
                    {[2020, 2022, 2024, 2026].map((year, index) => (
                        <div key={year} className="flex flex-col items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{
                                    backgroundColor: index === 3 ? "#B76E79" : "#C9A962",
                                    boxShadow: index === 3 ? "0 0 10px rgba(183, 110, 121, 0.5)" : "none",
                                }}
                            />
                            <span className="text-xs" style={{ color: index === 3 ? "#B76E79" : "#6B6B6B" }}>
                                {year}
                            </span>
                        </div>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 text-sm tracking-widest uppercase"
                    style={{ color: "#B76E79" }}
                >
                    Continue scrolling to receive your invitation
                </motion.p>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background: "linear-gradient(to top, rgba(232, 213, 211, 0.5) 0%, transparent 100%)" }}
            />
        </section>
    );
}
