"use client";

import React, { useEffect, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import Image from "next/image";
import { MagneticWrap } from "./AnimatedSection";

/* ---------- gradient orbs ---------- */
const orbs = [
    { size: 380, x: "72%", y: "12%", color: "var(--color-accent)", delay: 0 },
    { size: 260, x: "8%", y: "55%", color: "var(--color-accent-2)", delay: 0.4 },
    { size: 180, x: "82%", y: "65%", color: "#a855f7", delay: 0.8 },
];

export default function Hero() {
    const { scrollYProgress } = useScroll();
    const springScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
    const bgY = useTransform(springScroll, [0, 0.5], ["0%", "25%"]);
    const opacity = useTransform(springScroll, [0, 0.3], [1, 0]);
    const scale = useTransform(springScroll, [0, 0.3], [1, 0.92]);

    /* letter‑by‑letter animation for the name */
    const nameFirst = "Mayar";
    const nameLast = "Elsokary";

    return (
        <motion.section
            id="hero"
            style={{ opacity, scale }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* ── Background ── */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
                {orbs.map((orb, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{
                            opacity: [0, 0.18, 0.12, 0.18],
                            scale: [0.3, 1.1, 0.95, 1.05],
                        }}
                        transition={{
                            duration: 8,
                            delay: orb.delay,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        className="absolute rounded-full blur-[140px]"
                        style={{
                            width: orb.size,
                            height: orb.size,
                            left: orb.x,
                            top: orb.y,
                            background: orb.color,
                        }}
                    />
                ))}
                <div className="noise absolute inset-0" />
                <div className="dot-grid absolute inset-0 opacity-20" />
            </motion.div>

            {/* ── Content ── */}
            <div className="container-wide relative z-10 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-14 lg:gap-24">
                {/* Left — Text */}
                <div className="flex-1 text-center lg:text-left max-w-2xl">
                    {/* Availability badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-light border border-accent/20 mb-10"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                        </span>
                        <span className="text-sm text-text-secondary font-medium">
                            Available for new opportunities
                        </span>
                    </motion.div>

                    {/* Main heading — letter by letter */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-3">
                        {nameFirst.split("").map((ch, i) => (
                            <motion.span
                                key={`f-${i}`}
                                initial={{ opacity: 0, y: 40, rotateX: 60 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5 + i * 0.04,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="inline-block gradient-text-accent"
                            >
                                {ch}
                            </motion.span>
                        ))}
                        <br className="hidden sm:block" />
                        {nameLast.split("").map((ch, i) => (
                            <motion.span
                                key={`l-${i}`}
                                initial={{ opacity: 0, y: 40, rotateX: 60 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.8 + i * 0.04,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="inline-block"
                            >
                                {ch === " " ? "\u00A0" : ch}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Role */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-2xl text-text-secondary mb-10"
                    >
                        <span className="gradient-text font-semibold">Software Engineer</span>
                        {" "}&amp;{" "}
                        <span className="gradient-text-accent font-semibold">DevOps Specialist</span>
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.5 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start"
                    >
                        <MagneticWrap strength={0.15}>
                            <motion.a
                                href="#projects"
                                className="btn-primary group inline-flex items-center gap-2"
                                whileHover={{ scale: 1.04, y: -3 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <span>View My Work</span>
                                <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.a>
                        </MagneticWrap>

                        <MagneticWrap strength={0.15}>
                            <motion.a
                                href="#contact"
                                className="btn-outline inline-flex items-center gap-2"
                                whileHover={{ scale: 1.04, y: -3 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                Get in Touch
                            </motion.a>
                        </MagneticWrap>
                    </motion.div>
                </div>

                {/* Right — Profile photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex-shrink-0"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px]">
                        {/* Animated gradient ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-3 rounded-full"
                            style={{
                                background:
                                    "conic-gradient(from 0deg, var(--color-accent), var(--color-accent-2), #a855f7, var(--color-accent))",
                                opacity: 0.5,
                            }}
                        />
                        {/* Blur glow */}
                        <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent via-accent-2 to-purple-500 opacity-25 blur-2xl" />
                        {/* Inner frame */}
                        <div className="absolute -inset-1 rounded-full bg-dark" />
                        <div className="relative w-full h-full rounded-full overflow-hidden border border-border/30 bg-surface">
                            <Image
                                src="/me.png"
                                alt="Mayar Elsokary"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 256px, 380px"
                            />
                        </div>
                    </div>

                    {/* Floating badge */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-3 -right-3 glass rounded-2xl px-4 py-2.5 border border-border/30 shadow-xl"
                    >
                        <span className="text-sm font-bold gradient-text">2+ Years Exp.</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted/60 font-medium">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-9 rounded-full border border-text-muted/30 flex items-start justify-center pt-1.5"
                >
                    <motion.div
                        animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.6, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-2.5 rounded-full bg-accent/70"
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
