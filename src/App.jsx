import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react"; // <--- Добавлен импорт
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
        });
    }, []); // <--- Пустой массив зависимостей (вызывается один раз)

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contacts" element={<Contacts />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
