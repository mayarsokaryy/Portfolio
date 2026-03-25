import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mayar Elsokary — Software Engineer & DevOps Specialist",
    description:
        "Software Engineer specializing in DevOps, containerization, Kubernetes orchestration, and infrastructure automation. Building cloud-native solutions with Docker, Kubernetes, Terraform, and Platform Engineering.",
    keywords: [
        "DevOps",
        "Software Engineer",
        "Kubernetes",
        "Docker",
        "Terraform",
        "Cloud Native",
        "CI/CD",
        "Platform Engineering",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark text-text-primary`}
            >
                {children}
            </body>
        </html>
    );
}
