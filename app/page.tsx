import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact, { Footer } from "@/components/Contact";

export default function Home() {
    return (
        <>
            <Navigation />
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <Experience />
            <div className="section-divider" />
            <Contact />
            <Footer />
        </>
    );
}
