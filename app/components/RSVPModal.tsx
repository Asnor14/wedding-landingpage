"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./Confetti";

interface RSVPModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        attendance: "",
        guestCount: "1",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [errors, setErrors] = useState<{ fullName?: string; attendance?: string }>({});

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
            setIsSuccess(false);
            setShowConfetti(false);
        }
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    const validateForm = () => {
        const newErrors: { fullName?: string; attendance?: string } = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Please enter your name";
        if (!formData.attendance) newErrors.attendance = "Please select your attendance";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setShowConfetti(true);

        setTimeout(() => setShowConfetti(false), 4000);

        setFormData({
            fullName: "",
            email: "",
            attendance: "",
            guestCount: "1",
            message: "",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <>
            <Confetti isActive={showConfetti} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[150] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

                        <motion.div
                            className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <button
                                onClick={onClose}
                                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2"
                                aria-label="Close RSVP"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>

                            <div
                                className="rounded-2xl shadow-2xl overflow-hidden"
                                style={{ background: "linear-gradient(145deg, #FFFEF7 0%, #F5F0E8 100%)" }}
                            >
                                <div className="p-8">
                                    <AnimatePresence mode="wait">
                                        {isSuccess ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="text-center py-8"
                                            >
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                                                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: "#B76E79" }}
                                                >
                                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </motion.div>
                                                <h3
                                                    className="text-2xl mb-3"
                                                    style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}
                                                >
                                                    Thank You!
                                                </h3>
                                                <p style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}>
                                                    Your RSVP has been received.<br />We look forward to celebrating with you!
                                                </p>
                                                <motion.button
                                                    onClick={onClose}
                                                    className="mt-6 px-8 py-3 rounded-full text-white font-medium"
                                                    style={{ backgroundColor: "#C9A962" }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Close
                                                </motion.button>
                                            </motion.div>
                                        ) : (
                                            <motion.form
                                                key="form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="text-center mb-6">
                                                    <h2
                                                        className="text-3xl mb-2"
                                                        style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728" }}
                                                    >
                                                        RSVP
                                                    </h2>
                                                    <p className="text-sm" style={{ fontFamily: "'Lora', serif", color: "#6B6B6B" }}>
                                                        Kindly respond by May 14, 2026
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label
                                                            htmlFor="fullName"
                                                            className="block text-sm mb-1"
                                                            style={{ fontFamily: "'Lora', serif", color: "#4A3728" }}
                                                        >
                                                            Full Name <span className="text-red-400">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="fullName"
                                                            name="fullName"
                                                            value={formData.fullName}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                                                            style={{
                                                                borderColor: errors.fullName ? "#ef4444" : "#E8D5D3",
                                                                backgroundColor: "#FFFEF7",
                                                                fontFamily: "'Lora', serif",
                                                            }}
                                                            placeholder="Your full name"
                                                        />
                                                        {errors.fullName && (
                                                            <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="email"
                                                            className="block text-sm mb-1"
                                                            style={{ fontFamily: "'Lora', serif", color: "#4A3728" }}
                                                        >
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                                                            style={{
                                                                borderColor: "#E8D5D3",
                                                                backgroundColor: "#FFFEF7",
                                                                fontFamily: "'Lora', serif",
                                                            }}
                                                            placeholder="your@email.com"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            className="block text-sm mb-2"
                                                            style={{ fontFamily: "'Lora', serif", color: "#4A3728" }}
                                                        >
                                                            Will you attend? <span className="text-red-400">*</span>
                                                        </label>
                                                        <div className="flex gap-4">
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="attendance"
                                                                    value="attending"
                                                                    checked={formData.attendance === "attending"}
                                                                    onChange={handleChange}
                                                                    className="w-5 h-5 accent-[#B76E79]"
                                                                />
                                                                <span style={{ fontFamily: "'Lora', serif", color: "#4A3728" }}>
                                                                    Joyfully Accept
                                                                </span>
                                                            </label>
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="attendance"
                                                                    value="declining"
                                                                    checked={formData.attendance === "declining"}
                                                                    onChange={handleChange}
                                                                    className="w-5 h-5 accent-[#B76E79]"
                                                                />
                                                                <span style={{ fontFamily: "'Lora', serif", color: "#4A3728" }}>
                                                                    Regretfully Decline
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {errors.attendance && (
                                                            <p className="text-red-400 text-sm mt-1">{errors.attendance}</p>
                                                        )}
                                                    </div>

                                                    <AnimatePresence>
                                                        {formData.attendance === "attending" && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: "auto" }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <label
                                                                    htmlFor="guestCount"
                                                                    className="block text-sm mb-1"
                                                                    style={{ fontFamily: "'Lora', serif", color: "#4A3728" }}
                                                                >
                                                                    Number of Guests
                                                                </label>
                                                                <select
                                                                    id="guestCount"
                                                                    name="guestCount"
                                                                    value={formData.guestCount}
                                                                    onChange={handleChange}
                                                                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                                                                    style={{
                                                                        borderColor: "#E8D5D3",
                                                                        backgroundColor: "#FFFEF7",
                                                                        fontFamily: "'Lora', serif",
                                                                    }}
                                                                >
                                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                                        <option key={num} value={num}>
                                                                            {num} {num === 1 ? "Guest" : "Guests"}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    <div>
                                                        <label
                                                            htmlFor="message"
                                                            className="block text-sm mb-1"
                                                            style={{ fontFamily: "'Lora', serif", color: "#4A3728" }}
                                                        >
                                                            Message (Optional)
                                                        </label>
                                                        <textarea
                                                            id="message"
                                                            name="message"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            rows={3}
                                                            className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none resize-none"
                                                            style={{
                                                                borderColor: "#E8D5D3",
                                                                backgroundColor: "#FFFEF7",
                                                                fontFamily: "'Lora', serif",
                                                            }}
                                                            placeholder="Any dietary requirements or notes..."
                                                        />
                                                    </div>
                                                </div>

                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full mt-6 py-4 rounded-full text-white font-medium text-lg flex items-center justify-center gap-2"
                                                    style={{ backgroundColor: isSubmitting ? "#D4B896" : "#C9A962" }}
                                                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <motion.div
                                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        "Send RSVP"
                                                    )}
                                                </motion.button>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
