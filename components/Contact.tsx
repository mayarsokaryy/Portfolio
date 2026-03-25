"use client";

import React, { useState } from "react";
import { AnimatedSection, TiltCard } from "./AnimatedSection";
import { motion } from "framer-motion";

/* ── Contact data ────────────────────────────── */
interface ContactCard {
    label: string;
    value: string;
    href: string;
    icon: React.ReactNode;
}

const contactCards: ContactCard[] = [
    {
        label: "Email",
        value: "mayarsokary@gmail.com",
        href: "mailto:mayarsokary@gmail.com",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        value: "mayarsokaryy",
        href: "https://github.com/mayarsokaryy",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        value: "mayar-elsokary",
        href: "https://linkedin.com/in/mayar-elsokary",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
];

const contactLinks = [
    { label: "GitHub", href: "https://github.com/mayarsokaryy" },
    { label: "LinkedIn", href: "https://linkedin.com/in/mayar-elsokary" },
    { label: "Email", href: "mailto:mayarsokary@gmail.com" },
];

/* ── Contact section ──────────────────────────── */
export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setResponseMessage("");

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
            const response = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setResponseMessage(data.message);
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
                setResponseMessage(data.error || "Failed to send message");
            }
        } catch (error) {
            setStatus("error");
            setResponseMessage("Network error. Please try again or email directly.");
        }
    };

    return (
        <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
            <div className="container-wide max-w-4xl">
                {/* Header */}
                <AnimatedSection className="text-center mb-14">
                    <span className="tag mb-3 inline-block">Contact</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        Have a project in mind or just want to say hi? Feel free to reach out — I'm always open to new opportunities and collaborations.
                    </p>
                </AnimatedSection>

                {/* Cards */}
                <div className="grid sm:grid-cols-3 gap-6 mb-14">
                    {contactCards.map((card, i) => (
                        <AnimatedSection key={card.label} delay={i * 0.1}>
                            <TiltCard className="glass rounded-2xl p-6 border border-border/20 hover:border-accent/30 transition-colors duration-300 text-center h-full">
                                <a
                                    href={card.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-3"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                        {card.icon}
                                    </div>
                                    <span className="text-sm font-semibold text-text-primary">{card.label}</span>
                                    <span className="text-text-muted text-sm">{card.value}</span>
                                </a>
                            </TiltCard>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Contact Form */}
                <AnimatedSection delay={0.2} className="mb-14">
                    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-border/20">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border/20 text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border/20 text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-surface border border-border/20 text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                                placeholder="What's this about?"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl bg-surface border border-border/20 text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        {/* Status Messages */}
                        {status === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                            >
                                ✓ {responseMessage}
                            </motion.div>
                        )}
                        {status === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                            >
                                ✗ {responseMessage}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </AnimatedSection>

                {/* Availability banner */}
                <AnimatedSection delay={0.3} className="text-center">
                    <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 border border-border/20">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                        </span>
                        <span className="text-text-secondary text-sm">Available for freelance &amp; full‑time opportunities</span>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

/* ── Footer (named export) ────────────────────── */
export function Footer() {
    return (
        <footer className="border-t border-border/10 py-8">
            <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
                <span>&copy; {new Date().getFullYear()} Mayar Elsokary. All rights reserved.</span>
                <div className="flex gap-6">
                    {contactLinks.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors duration-300"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
