"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedSection, AnimatedCounter, TiltCard } from "./AnimatedSection";

const values = [
    {
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        ),
        title: "Clean Code",
        desc: "Writing maintainable, well‑structured code that scales with the team and project.",
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        title: "Fast Delivery",
        desc: "CI/CD pipelines & automation to ship features quickly without sacrificing quality.",
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
        ),
        title: "Creative Solutions",
        desc: "Blending design thinking with engineering to build intuitive user experiences.",
    },
];

const stats = [
    { label: "Projects", value: 15, suffix: "+" },
    { label: "Years Exp.", value: 2, suffix: "+" },
    { label: "Technologies", value: 20, suffix: "+" },
];

export default function About() {
    return (
        <section id="about" className="relative py-28 md:py-36 overflow-hidden">
            <div className="container-wide">
                {/* Section label */}
                <AnimatedSection className="mb-4">
                    <span className="tag">About Me</span>
                </AnimatedSection>

                {/* Two‑column layout */}
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-20">
                    {/* Left — Photo + Stats */}
                    <AnimatedSection delay={0.1}>
                        <div className="relative">
                            {/* Photo frame */}
                            <div className="relative max-w-sm mx-auto lg:mx-0">
                                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-accent/30 via-transparent to-accent-2/30 blur-xl opacity-50" />
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/40 bg-surface">
                                    <Image
                                        src="/me.png"
                                        alt="Mayar Elsokary"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 90vw, 400px"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                                </div>

                                {/* Floating stat card */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-5 -right-5 glass rounded-2xl px-5 py-3 border border-border/30 shadow-xl"
                                >
                                    <p className="text-2xl font-bold gradient-text-accent">
                                        <AnimatedCounter to={15} />+
                                    </p>
                                    <p className="text-xs text-text-muted">Projects Shipped</p>
                                </motion.div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right — Bio */}
                    <AnimatedSection delay={0.25}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            Crafting digital experiences{" "}
                            <span className="gradient-text">that matter</span>
                        </h2>

                        <div className="space-y-4 text-text-secondary leading-relaxed text-lg">
                            <p>
                                I&apos;m <strong className="text-text-primary">Mayar Sherif Mohamed Moustafa Elsokary</strong>,
                                a software engineer passionate about building high‑performance web applications
                                and automating infrastructure through modern DevOps practices.
                            </p>
                            <p>
                                My workflow blends front‑end craft with back‑end rigor — from pixel‑perfect
                                UIs in <span className="text-accent">React &amp; Next.js</span> to
                                scalable cloud architectures on <span className="text-accent-2">AWS, Docker &amp; Kubernetes</span>.
                            </p>
                            <p>
                                When I&apos;m not coding, you&apos;ll find me exploring new developer tools, contributing
                                to open‑source, or diving into system design challenges.
                            </p>
                        </div>

                        {/* Stats row */}
                        <div className="flex gap-8 mt-8 pt-8 border-t border-border/30">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-3xl md:text-4xl font-bold gradient-text-accent">
                                        <AnimatedCounter to={stat.value} />{stat.suffix}
                                    </p>
                                    <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                {/* Value cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((v, i) => (
                        <AnimatedSection key={v.title} delay={0.1 + i * 0.1}>
                            <TiltCard className="glass rounded-2xl p-7 h-full border border-border/20 hover:border-accent/30 transition-colors duration-300">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5">
                                    {v.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">{v.title}</h3>
                                <p className="text-text-muted text-sm leading-relaxed">{v.desc}</p>
                            </TiltCard>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
