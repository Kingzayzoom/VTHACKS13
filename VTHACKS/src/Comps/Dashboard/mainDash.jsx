import { useNavigate } from "react-router-dom";
import './mainDash.css';
import VTECH from '../../assets/Vtech.png'

export default function MainDash() {
    const navigate = useNavigate();

    return (
        <section className="dash" style={{ backgroundImage: `url(${VTECH})` }}>
            <nav className="main-nav">
                <ul className="linksContainer">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => navigate("/application")}>Application</li>
                    <li onClick={() => navigate("/residents")}>Residents</li>
                </ul>
            </nav>

            <div className="overarchingContainer">


            </div>
        </section>
    );
}
