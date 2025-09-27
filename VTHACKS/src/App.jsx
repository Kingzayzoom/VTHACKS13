import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Comps/Home/navigationSection/navigation.jsx';
import Hero from './Comps/Home/heroSection/heroSection.jsx';
import Application from './Comps/Home/applicationProcess/applicationProcess.jsx';
import Footer from './Comps/Home/footer/footer.jsx';
import Dash from './Comps/Dashboard/mainDash.jsx';

function App() {
    return (
        <Router>

            <Routes>
                {/* Home Page */}
                <Route path="/" element={
                    <>
                        <Navbar />
                        <Hero />
                        <Application />
                        <Footer />
                    </>
                } />

                {/* Other Pages */}
                <Route path="/dashboard" element={<Dash />} />
                <Route path="/application" element={<h2>Application Page</h2>} />
                <Route path="/residents" element={<h2>Residents Page</h2>} />
                <Route path="/login" element={<h2>Login Page</h2>} />
            </Routes>
        </Router>
    );
}

export default App;
