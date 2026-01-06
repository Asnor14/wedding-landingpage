"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import InvitationModal from "./InvitationModal";

interface InvitationEnvelopeSectionProps {
    onInViewChange?: (inView: boolean) => void;
}

export default function InvitationEnvelopeSection({ onInViewChange }: InvitationEnvelopeSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.3 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (onInViewChange) {
            onInViewChange(isInView);
        }
    }, [isInView, onInViewChange]);

    const envelopeVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    return (
        <>
            <section
                ref={sectionRef}
                id="invitation-envelope"
                className="relative flex min-h-screen items-center justify-center py-20 px-6"
                style={{ backgroundColor: "#E8D5D3" }}
            >
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
                />

                <motion.div
                    className="relative z-10 flex flex-col items-center text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={envelopeVariants}
                >
                    <h2
                        id="youre-invited-title"
                        className="heading-elegant mb-8 text-2xl md:text-3xl"
                        style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}
                    >
                        You&apos;re Invited
                    </h2>

                    <motion.button
                        className="relative cursor-pointer focus:outline-none rounded-lg"
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Open invitation letter"
                    >
                        <motion.div
                            className="absolute -inset-8 rounded-full"
                            animate={isInView ? {
                                boxShadow: [
                                    "0 0 20px rgba(201, 169, 98, 0.2)",
                                    "0 0 40px rgba(201, 169, 98, 0.4)",
                                    "0 0 20px rgba(201, 169, 98, 0.2)",
                                ],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <svg width="200" height="150" viewBox="0 0 200 150" className="relative z-10">
                            <rect x="10" y="40" width="180" height="100" rx="8" fill="#FFFEF7" stroke="#C9A962" strokeWidth="2" />
                            <path d="M10 48 L100 100 L190 48" fill="none" stroke="#C9A962" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M10 40 L100 95 L190 40" fill="#F5F0E8" stroke="#C9A962" strokeWidth="2" strokeLinejoin="round" />
                            <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                <circle cx="100" cy="75" r="12" fill="#B76E79" />
                                <path d="M100 68 C 96 65, 91 68, 91 73 C 91 78, 100 84, 100 84 C 100 84, 109 78, 109 73 C 109 68, 104 65, 100 68" fill="#FFFEF7" />
                            </motion.g>
                            <line x1="30" y1="110" x2="85" y2="110" stroke="#E8D5D3" strokeWidth="2" strokeLinecap="round" />
                            <line x1="30" y1="120" x2="70" y2="120" stroke="#E8D5D3" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </motion.button>

                    <motion.p
                        className="mt-6 text-sm"
                        style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        Click to open
                    </motion.p>

                    <motion.p
                        className="mt-6 text-lg"
                        style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        Save the Date
                    </motion.p>

                    <motion.p
                        className="mt-2 text-2xl md:text-3xl"
                        style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                    >
                        June 14, 2026
                    </motion.p>

                    <motion.p
                        className="mt-6 text-sm tracking-widest uppercase"
                        style={{ color: "#B76E79" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.0 }}
                    >
                        [Venue Name]
                    </motion.p>

                    <motion.div
                        className="mt-12 flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className="h-px w-12" style={{ backgroundColor: "#C9A962" }} />
                        <span style={{ color: "#C9A962" }}>♥</span>
                        <div className="h-px w-12" style={{ backgroundColor: "#C9A962" }} />
                    </motion.div>
                </motion.div>
            </section>

            <InvitationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                coupleName="Lucas & Amelia"
                weddingDate="June 14, 2026"
                venue="[Venue Name]"
                message="We can't wait to celebrate love with you."
            />
        </>
    );
}
