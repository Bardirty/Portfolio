import { Link } from "react-router-dom";
function Header() {
    return (
        <header>
            <Link className="main-button" to="/">
                <img src="button.png" alt="Logo" />
                <h3>Danil Bardakov</h3>
            </Link>
            <p className="subtitle">Junior Unity Developer</p>
            <nav className="header-links">
                <Link className="header-link" to="/about">About</Link>
                <Link className="header-link" to="/projects">Projects</Link>
                <Link className="header-link" to="/contacts">Contacts</Link>
            </nav>
        </header>
    );
}

export default Header;
