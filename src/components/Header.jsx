import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header>
            <Link className="main-button" to="/">
                <img src={`${import.meta.env.BASE_URL}/button.png`} alt="Logo" />
                <h3>Danil Bardakov</h3>
            </Link>
            
            {isMobile ? (
                // Бургер-меню для мобильных устройств
                <>
                    <div className={`burger-menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <div className="burger-line"></div>
                        <div className="burger-line"></div>
                        <div className="burger-line"></div>
                    </div>
                    <nav className={`header-links ${menuOpen ? "mobile-open" : ""}`}>
                        <Link className="header-link" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link className="header-link" to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                        <Link className="header-link" to="/contacts" onClick={() => setMenuOpen(false)}>Contacts</Link>
                    </nav>
                </>
            ) : (
                // Обычная навигация для ПК
                <nav className="header-links desktop">
                    <Link className="header-link" to="/about">About</Link>
                    <Link className="header-link" to="/projects">Projects</Link>
                    <Link className="header-link" to="/contacts">Contacts</Link>
                </nav>
            )}
        </header>
    );
}

export default Header;
