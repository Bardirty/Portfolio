function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Social Media</h4>
                    <ul>
                        <li><a href="https://github.com/Bardirty" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="https://itch.io/profile/bardirty" target="_blank" rel="noopener noreferrer">Itch.io</a></li>
                        <li><a href="https://linkedin.com/in/danilbardakov" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Danil Bardakov. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;