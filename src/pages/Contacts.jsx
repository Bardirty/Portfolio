import ParticlesBackground from "../components/ParticlesBackground";

function Contacts() {
    return (
        <div className="particles-container">
            <ParticlesBackground />
            <main className="contacts-container">
                <h2 data-aos="fade-down">Contacts</h2>
                <div className="contacts-content" data-aos="fade-up" data-aos-delay="200">
                    <p className="contacts-text">
                        Contact me via Telegram: <a href="https://t.me/Bardirty" target="_blank" rel="noopener noreferrer">@Bardirty</a>
                    </p>
                    <p className="contacts-text">
                        Or send me an email: <a href="mailto:danil.bardakov2006@gmail.com">danil.bardakov2006@gmail.com</a>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Contacts;
