import { useNavigate } from "react-router-dom";
import './mainDash.css';
import VTECH from '../../assets/Vtech.png';
import HOUSE from '../../assets/house1.jpeg';
import HOUSE2 from '../../assets/house2.jpeg';
import ChatBot from './chatBot.jsx'


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
                <ChatBot />
                <div className="panoramicHousing">
                    <div className="housingCard">
                        <img
                            src={HOUSE}
                            alt="Housing option"
                            style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                        />
                        <div className="housingCardContent">
                            <h3>Oak Hall</h3>
                            <p>
                                A cozy shared space with easy access to campus. Includes study lounges,
                                laundry facilities, and a community kitchen. Perfect for students looking
                                for a balance of affordability and comfort.
                            </p>
                            <button>View Details</button>
                        </div>
                    </div>
                    <div className="housingCard">
                        <img
                            src={HOUSE}
                            alt="Housing option"
                            style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                        />
                        <div className="housingCardContent">
                            <h3>Oak Hall</h3>
                            <p>
                                A cozy shared space with easy access to campus. Includes study lounges,
                                laundry facilities, and a community kitchen. Perfect for students looking
                                for a balance of affordability and comfort.
                            </p>
                            <button>View Details</button>
                        </div>
                    </div>
                    <div className="housingCard">
                        <img
                            src={HOUSE}
                            alt="Housing option"
                            style={{ width: "50%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                        />
                        <div className="housingCardContent">
                            <h3>Oak Hall</h3>
                            <p>
                                A cozy shared space with easy access to campus. Includes study lounges,
                                laundry facilities, and a community kitchen. Perfect for students looking
                                for a balance of affordability and comfort.
                            </p>
                            <button>View Details</button>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    );
}
