import ParticlesBackground from "../components/ParticlesBackground";

function About() {
    return (
        <div className="particles-container">
            <ParticlesBackground />
            <main className="about-container">
                <h2 data-aos="fade-down">About Me</h2>
                <div className="about-content" data-aos="fade-up" data-aos-delay="200">
                    <p className="about-text">
                        I am a game developer specializing in Unity.  
                        My passion lies in creating immersive experiences with deep storytelling and engaging mechanics.  
                        I strive to blend technology and art to bring ideas to life.
                    </p>
                    <div className="skills-grid">
                        <div className="skill-card">
                            <h3>Unity Engine</h3>
                            <p>2+ years of experience</p>
                        </div>
                        <div className="skill-card">
                            <h3>C# Programming</h3>
                            <p>Intermediate to Advanced</p>
                        </div>
                        <div className="skill-card">
                            <h3>Game Design</h3>
                            <p>Level design, mechanics and storytelling</p>
                        </div>
                        <div className="skill-card">
                            <h3>3D Art & Animation</h3>
                            <p>Blender (basic level)</p>
                        </div>
                        <div className="skill-card">
                            <h3>Web Development</h3>
                            <p>React.js, interactive UI/UX</p>
                        </div>
                        <div className="skill-card">
                            <h3>Experience with Other Programming Languages</h3>
                            <p>Proficient in C/C++ (3 years), with experience in Java, Python, and x86 Assembly.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default About;
