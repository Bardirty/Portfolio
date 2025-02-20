import React from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { Link } from "react-router-dom";
import "../index.css";

function Home() {
    const isMobile = window.innerWidth <= 768;

    return (
        <div className="particles-container">
            <ParticlesBackground />
            <main className="home-container">            
                <section id="home" className="hero">
                    <h1 data-aos="fade-down">Hello, I'm <span>Danil Bardakov</span></h1>
                    <p data-aos="fade-down" data-aos-delay="200">
                        Welcome to my Portfolio!
                    </p>
                    <div 
                        className="hero-buttons" 
                        data-aos="fade-up" 
                        data-aos-delay={isMobile ? "200" : "400"}
                    >
                        <Link to="/projects" className="hero-button">My projects</Link>
                        <Link to="/about" className="hero-button secondary">About me</Link>
                        <Link to="/contacts" className="hero-button secondary">Contacts</Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
