import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Comps/Home/navigationSection/navigation.jsx';
import Hero from './Comps/Home/heroSection/heroSection.jsx';
import Footer from './Comps/Home/footer/footer.jsx';
import Dash from './Comps/Dashboard/mainDash.jsx';
import LogIn from './Comps/LogIn/logIn.jsx';
import ScrollToTop from './Comps/ScrollToTop.jsx';
import Residents from './Comps/Residents/Residents.jsx';
import Application from './Comps/Application/Application.jsx';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar />
                        <Hero />
                        <Application />
                        <Footer />
                    </>
                } />
                <Route path="/dashboard" element={<Dash />} />
                <Route path="/application" element={<Application />} />
                <Route path="/residents" element={<Residents />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </Router>
    );
}

export default App;