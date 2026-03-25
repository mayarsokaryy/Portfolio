"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export default function Navigation() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const cb = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", cb, { passive: true });
        return () => window.removeEventListener("scroll", cb);
    }, []);

    return (
        <>
            {/* Progress bar */}
            <motion.div className="scroll-progress" style={{ scaleX }} />

            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-lg shadow-black/10" : "bg-transparent"
                    }`}
            >
                <nav className="container-wide flex items-center justify-between h-16 md:h-18">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        className="text-xl font-bold tracking-tight select-none"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="gradient-text-accent">M</span>
                        <span className="text-text-primary">.</span>
                    </motion.a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="relative px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors duration-300 group"
                            >
                                {item.label}
                                <span className="absolute bottom-1 left-4 right-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="ml-4 btn-primary !py-2 !px-5 text-sm"
                        >
                            <span>Let&apos;s Talk</span>
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative w-8 h-8 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col gap-1.5">
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                className="block w-6 h-[2px] bg-text-primary origin-center"
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                className="block w-6 h-[2px] bg-text-primary"
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="block w-6 h-[2px] bg-text-primary origin-center"
                            />
                        </div>
                    </button>
                </nav>

                {/* Mobile dropdown */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                            className="md:hidden overflow-hidden border-t border-border/30"
                        >
                            <div className="glass p-4 flex flex-col gap-1">
                                {navItems.map((item, i) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="px-4 py-3 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
