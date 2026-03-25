"use client";

import React, { useRef } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* ────────────────────────────────────────────────────────
   1. Scroll‑triggered reveal wrapper
   ──────────────────────────────────────────────────────── */
export function AnimatedSection({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={
                inView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {}
            }
            transition={{ duration: 0.7, delay, ease }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────
   2. Stagger container + item
   ──────────────────────────────────────────────────────── */
export function StaggerContainer({
    children,
    className = "",
    stagger = 0.08,
}: {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: stagger } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30, scale: 0.97 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────
   3. Text reveal (word‑by‑word, perspective)
   ──────────────────────────────────────────────────────── */
export function TextReveal({
    text,
    className = "",
    delay = 0,
    as: Tag = "span",
}: {
    text: string;
    className?: string;
    delay?: number;
    as?: "span" | "h1" | "h2" | "p";
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const words = text.split(" ");

    return (
        <Tag ref={ref} className={className} style={{ perspective: "800px" }}>
            <motion.span
                className="inline"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
                }}
            >
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                        <motion.span
                            className="inline-block"
                            variants={{
                                hidden: { y: "110%", rotateX: 50, opacity: 0 },
                                visible: {
                                    y: "0%",
                                    rotateX: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6, ease },
                                },
                            }}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Tag>
    );
}

/* ────────────────────────────────────────────────────────
   4. Tilt card (3‑D mouse‑follow)
   ──────────────────────────────────────────────────────── */
export function TiltCard({
    children,
    className = "",
    max = 8,
}: {
    children: React.ReactNode;
    className?: string;
    max?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
        stiffness: 200,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
        stiffness: 200,
        damping: 20,
    });

    const handleMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────
   5. Animated counter
   ──────────────────────────────────────────────────────── */
export function AnimatedCounter({
    target,
    to,
    duration = 2,
}: {
    target?: number;
    to?: number;
    duration?: number;
}) {
    const value = target ?? to ?? 0;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const motionVal = useMotionValue(0);
    const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });
    const [display, setDisplay] = React.useState(0);

    React.useEffect(() => {
        if (inView) motionVal.set(value);
    }, [inView, value, motionVal]);

    React.useEffect(() => {
        const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
        return unsub;
    }, [spring]);

    return <span ref={ref}>{display}</span>;
}

/* ────────────────────────────────────────────────────────
   6. Magnetic wrap (hover‑pull effect)
   ──────────────────────────────────────────────────────── */
export function MagneticWrap({
    children,
    strength = 0.25,
}: {
    children: React.ReactNode;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15 });
    const sy = useSpring(y, { stiffness: 200, damping: 15 });

    const handleMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: sx, y: sy }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────
   7. Parallax image
   ──────────────────────────────────────────────────────── */
export function ParallaxImage({
    children,
    speed = 0.1,
    className = "",
}: {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
}
