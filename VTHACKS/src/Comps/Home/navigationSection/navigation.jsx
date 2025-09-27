import './navigation.css';
import { useNavigate } from 'react-router-dom';
import VTECH from '../../../assets/Vtech.png';

export default function Navigation() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="logoContainer" onClick={() => navigate("/")}>
                <div id="VT">
                    <img src={VTECH} alt="VT Logo" />
                </div>
            </div>

            <ul className="linksContainer">
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                <li onClick={() => navigate("/application")}>Application</li>
                <li onClick={() => navigate("/residents")}>Residents</li>
            </ul>

            <div className="buttonsContainer">
                <button
                    className="button button-ghost"
                    onClick={() => navigate("/login")}
                >
                    Sign In
                </button>
                <button
                    className="button button-primary"
                    onClick={() => navigate("/application")}
                >
                    Apply Now
                </button>
            </div>
        </nav>
    );
}
