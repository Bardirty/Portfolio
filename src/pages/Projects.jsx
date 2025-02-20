import ParticlesBackground from "../components/ParticlesBackground";

function Projects() {
    return (
        <div className="particles-container">
            <ParticlesBackground />
            <main className="projects-container">
                <h2 data-aos="fade-down">My Best Projects</h2>
                <div className="projects-grid">
                    <ProjectCard 
                        title="Lost Echo" 
                        description={
                            <>
                                A horror game in detective and puzzle genres. Unravel dark secrets in a mysterious town, solving puzzles along the way.
                                <br />
                                <a href="https://bardirty.itch.io/lost-echo" target="_blank" rel="noopener noreferrer">
                                    More details
                                </a>
                            </>
                        }
                        image="lost.PNG" 
                    />
                    <ProjectCard 
                        title="Talemas" 
                        description={
                            <>
                                A Christmas-themed platform game created during Łosoś Game Jam 2024. Jump, collect gifts, and save Christmas in this joyful adventure!
                                <br />
                                <a href="https://bardirty.itch.io/talemas" target="_blank" rel="noopener noreferrer">
                                    More details
                                </a>
                            </>
                        }
                        image="talemas.PNG" 
                    />
                    <ProjectCard 
                        title="Hard Magic Bubbles" 
                        description={
                            <>
                                Fun and engaging game. Discover the perfect Bubble Tea recipe for a special guest. Inspired by "Papa's Louie" games.
                                <br />
                                <a href="https://globalgamejam.org/games/2025/hard-magic-bubbles-8" target="_blank" rel="noopener noreferrer">
                                    More details
                                </a>
                            </>
                        }
                        image="bubble.PNG"
                    />
                    <ProjectCard 
                        title="Space Miner" 
                        description={
                            <>
                                A 3D game-prototype about collecting resources in space. Manage resources and dodge cosmic dangers!
                                <br />
                                <a href="https://github.com/Bardirty/Space-Miner" target="_blank" rel="noopener noreferrer">
                                    More details
                                </a>
                            </>
                        }
                        image="space.PNG"
                    />
                    <ProjectCard 
                        title="TicTacToe 3D" 
                        description={
                            <>
                                A classic TicTacToe game in a 3D environment, made with C++ and OpenGL (GLUT). Compete against a friend in a new dimension!
                                <br />
                                <a href="https://github.com/Bardirty/TicTacToe3D" target="_blank" rel="noopener noreferrer">
                                    More details
                                </a>
                            </>
                        }
                        image="tictactoe.PNG"
                    />
                    <ProjectCard 
                        title="Assembly RTTTL Parser" 
                        description={
                            <>
                                A music player for RTTTL string format, created in Turbo ASM. Convert simple text melodies into real sound on low-level hardware!
                                <br />
                                <a href="https://github.com/Bardirty/RTTTL" target="_blank" rel="noopener noreferrer">
                                    More details
                                </a>
                            </>
                        } 
                        image="rtttl.PNG" 
                    />
                </div>
            </main>
        </div>
    );
}

function ProjectCard({ title, description, image }) {
    return (
        <div className="project-card" data-aos="fade-up">
            <img src={`${import.meta.env.BASE_URL}/${image}`} alt={title} className="project-image" />
            <div className="project-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Projects;
