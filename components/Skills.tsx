"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

/* ── Skill data ───────────────────────────────── */
interface Skill {
    name: string;
    level: number; // 0‑100
}

interface SkillGroup {
    title: string;
    icon: string;
    skills: Skill[];
}

const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        icon: "🎨",
        skills: [
            { name: "React / Next.js", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "Tailwind CSS", level: 92 },
            { name: "HTML / CSS", level: 95 },
        ],
    },
    {
        title: "Backend",
        icon: "⚙️",
        skills: [
            { name: "Node.js", level: 82 },
            { name: "Python", level: 78 },
            { name: "REST APIs", level: 88 },
            { name: "MongoDB / SQL", level: 80 },
        ],
    },
    {
        title: "DevOps & Cloud",
        icon: "☁️",
        skills: [
            { name: "Docker / K8s", level: 84 },
            { name: "AWS", level: 80 },
            { name: "CI / CD", level: 86 },
            { name: "Git / GitHub Actions", level: 90 },
        ],
    },
];

const techMarqueeItems = [
    "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
    "Node.js", "Python", "Docker", "Kubernetes", "AWS",
    "Terraform", "MongoDB", "PostgreSQL", "Redis", "GraphQL",
    "Git", "GitHub Actions", "Linux", "Figma", "Vercel",
];

/* ── SkillBar component ───────────────────────── */
function SkillBar({ name, level }: Skill) {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <div ref={ref} className="mb-5 last:mb-0">
            <div className="flex justify-between mb-1.5 text-sm">
                <span className="font-medium text-text-primary">{name}</span>
                <span className="text-text-muted">{level}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </div>
    );
}

/* ── Main component ───────────────────────────── */
export default function Skills() {
    return (
        <section id="skills" className="relative py-28 md:py-36 overflow-hidden">
            <div className="container-wide">
                {/* Header */}
                <AnimatedSection className="text-center mb-14">
                    <span className="tag mb-3 inline-block">Skills</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Tech Stack</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        Technologies I work with on a daily basis to build fast, reliable, and beautiful products.
                    </p>
                </AnimatedSection>

                {/* Skill groups */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {skillGroups.map((group, gi) => (
                        <AnimatedSection
                            key={group.title}
                            delay={gi * 0.15}
                            className="glass rounded-2xl p-7 border border-border/20"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-2xl">{group.icon}</span>
                                <h3 className="text-xl font-bold text-text-primary">{group.title}</h3>
                            </div>
                            {group.skills.map((s) => (
                                <SkillBar key={s.name} {...s} />
                            ))}
                        </AnimatedSection>
                    ))}
                </div>

                {/* Marquee */}
                <div className="relative overflow-hidden">
                    {/* Fade edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark to-transparent z-10" />

                    <div className="flex gap-8 animate-marquee whitespace-nowrap py-4">
                        {[...techMarqueeItems, ...techMarqueeItems].map((t, i) => (
                            <span
                                key={`${t}-${i}`}
                                className="text-text-muted/30 text-lg font-semibold tracking-wide select-none"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
