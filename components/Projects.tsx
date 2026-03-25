"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AnimatedSection, TiltCard } from "./AnimatedSection";

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;            // e.g. "/projects/project-1.png"
    tags: string[];
    link?: string;
    github?: string;
    featured?: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Portfolio Website",
        description:
            "A premium portfolio site built with Next.js 16, Tailwind CSS and Framer Motion — featuring cinematic scroll animations and a dark glassmorphism design system.",
        image: "/projects/project-1.png",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        github: "https://github.com/mayarsokaryy/Portfolio",
        featured: true,
    },
    {
        id: 2,
        title: "Mastering Git",
        description:
            "An interactive learning repo exploring advanced Git workflows, branching strategies, and CI/CD automation best practices.",
        image: "/projects/project-2.png",
        tags: ["Git", "CI/CD", "DevOps", "Docs"],
        github: "https://github.com/mayarsokaryy/masteringGIT",
    },
    {
        id: 3,
        title: "Cloud Infra Automation",
        description:
            "Infrastructure‑as‑code templates using Terraform and Docker for rapid, reproducible cloud deployments on AWS.",
        image: "/projects/project-3.png",
        tags: ["Terraform", "Docker", "AWS", "IaC"],
        featured: true,
    },
    {
        id: 4,
        title: "Task Management App",
        description:
            "A full‑stack task manager with real‑time sync, role‑based auth, and a responsive dashboard built with React and Node.js.",
        image: "/projects/project-4.png",
        tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    },
];

const categories = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export default function Projects() {
    const [activeTag, setActiveTag] = useState("All");
    const filtered =
        activeTag === "All"
            ? projects
            : projects.filter((p) => p.tags.includes(activeTag));

    return (
        <section id="projects" className="relative py-28 md:py-36 overflow-hidden">
            <div className="container-wide">
                {/* Header */}
                <AnimatedSection className="text-center mb-14">
                    <span className="tag mb-3 inline-block">Projects</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Selected <span className="gradient-text">Work</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        A curated set of projects that showcase my skills in engineering, design, and DevOps.
                    </p>
                </AnimatedSection>

                {/* Filter tags */}
                <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.slice(0, 10).map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTag === tag
                                ? "bg-accent text-white shadow-lg shadow-accent/30"
                                : "bg-white/5 text-text-muted hover:text-text-primary hover:bg-white/10"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </AnimatedSection>

                {/* Project grid */}
                <AnimatePresence mode="popLayout">
                    <motion.div layout className="grid md:grid-cols-2 gap-8">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                            >
                                <TiltCard className="group glass rounded-2xl overflow-hidden border border-border/20 hover:border-accent/30 transition-colors duration-300 h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden bg-surface">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                                            <div className="flex gap-3">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary hover:text-accent transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary hover:text-accent transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Featured badge */}
                                        {project.featured && (
                                            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent/80 backdrop-blur text-xs font-semibold text-white">
                                                Featured
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="tag text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
