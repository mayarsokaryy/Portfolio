"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

interface TimelineItem {
    id: number;
    type: "work" | "education";
    title: string;
    company: string;
    period: string;
    description: string;
    skills: string[];
}

const timelineData: TimelineItem[] = [
    {
        id: 1,
        type: "work",
        title: "Software Engineer",
        company: "Freelance / Personal Projects",
        period: "2023 — Present",
        description:
            "Building full‑stack web apps with Next.js, React, and cloud‑native DevOps pipelines. Designing polished UIs and scalable architectures for real‑world products.",
        skills: ["Next.js", "React", "TypeScript", "AWS", "Docker"],
    },
    {
        id: 2,
        type: "work",
        title: "DevOps Intern",
        company: "Cloud Solutions Co.",
        period: "2022 — 2023",
        description:
            "Automated CI/CD workflows with GitHub Actions, containerised services with Docker, and managed infrastructure on AWS using Terraform.",
        skills: ["Docker", "Terraform", "GitHub Actions", "Linux"],
    },
    {
        id: 3,
        type: "education",
        title: "BSc Computer Science",
        company: "University",
        period: "2020 — Present",
        description:
            "Studying software engineering, algorithms, networking, and cloud computing. Maintaining a strong academic record while contributing to open‑source projects.",
        skills: ["Algorithms", "Networking", "Cloud", "OS"],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="relative py-28 md:py-36 overflow-hidden">
            <div className="container-wide max-w-4xl">
                {/* Header */}
                <AnimatedSection className="text-center mb-16">
                    <span className="tag mb-3 inline-block">Experience</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Career <span className="gradient-text">Timeline</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        My professional journey across engineering, DevOps, and academics.
                    </p>
                </AnimatedSection>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent-2/50 to-transparent hidden md:block" />

                    <div className="space-y-14">
                        {timelineData.map((item, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <AnimatedSection
                                    key={item.id}
                                    delay={i * 0.15}
                                    className={`relative flex flex-col md:flex-row items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Card */}
                                    <div className="w-full md:w-[calc(50%-2rem)] glass rounded-2xl p-6 border border-border/20 hover:border-accent/30 transition-colors duration-300">
                                        <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
                                            <span>{item.type === "work" ? "💼" : "🎓"}</span>
                                            <span>{item.period}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-text-primary mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-accent text-sm mb-3">{item.company}</p>
                                        <p className="text-text-muted text-sm leading-relaxed mb-4">
                                            {item.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.skills.map((s) => (
                                                <span key={s} className="tag text-xs">{s}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dot */}
                                    <motion.div
                                        className="hidden md:flex w-4 h-4 rounded-full bg-accent border-4 border-dark z-10 shrink-0"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
