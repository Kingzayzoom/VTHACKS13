import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Comps/Home/navigationSection/navigation.jsx';
import Hero from './Comps/Home/heroSection/heroSection.jsx';
import Application from './Comps/Home/applicationProcess/applicationProcess.jsx';
import Footer from './Comps/Home/footer/footer.jsx';
import Dash from './Comps/Dashboard/mainDash.jsx';
import LogIn from './Comps/LogIn/logIn.jsx';
import ScrollToTop from './Comps/ScrollToTop.jsx';
import HousingListings from './Comps/Dashboard/HousingListings.jsx'; // New component

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
                <Route path="/dashboard" element={
                    <>
                        <Dash />                {/* Existing dashboard content */}
                        <HousingListings />     {/* Housing listings pulled from backend */}
                    </>
                } />
                <Route path="/application" element={<h2>Application Page</h2>} />
                <Route path="/residents" element={<h2>Residents Page</h2>} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </Router>
    );
}

export default App;
