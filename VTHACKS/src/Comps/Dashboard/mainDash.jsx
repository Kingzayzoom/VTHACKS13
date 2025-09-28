import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './mainDash.css';
import ChatBot from './chatBot.jsx';
import LeafletMap from './leafletMap.jsx';
import IMAGE1 from '../../assets/house1.jpeg';
import IMAGE2 from '../../assets/house2.jpeg';
import IMAGE3 from '../../assets/house3.jpeg';

export default function MainDash() {
    const navigate = useNavigate();

    // Temporary static data (replace with backend fetch later)
    const [houses, setHouses] = useState([
        {
            id: 1,
            price: "$950,000",
            details: "5 bds | 3 ba | 3,066 sqft",
            address: "9216 Presidential Dr, Alexandria, VA",
            image: IMAGE1,
        },
        {
            id: 2,
            price: "$790,000",
            details: "5 bds | 3 ba | 2,802 sqft",
            address: "3101 Cunningham Dr, Alexandria, VA",
            image: IMAGE2,
        },
        {
            id: 3,
            price: "$581,000",
            details: "4 bds | 2 ba | 1,248 sqft",
            address: "4821 Lawrence St, Alexandria, VA",
            image: IMAGE3,
        },

    ]);

    //FETCH DATA HER
    useEffect(() => {
        // fetch("/api/houses")
        //   .then(res => res.json())
        //   .then(data => setHouses(data));
    }, []);

    return (
        <section className="dash">
            <ChatBot />

            <nav className="main-nav">
                <ul className="linksContainer">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => navigate("/application")}>Application</li>
                    <li onClick={() => navigate("/residents")}>Residents</li>
                </ul>
            </nav>

            <div className="filter-bar">
                <button>For Sale</button>
                <button>Price</button>
                <button>Beds & Baths</button>
                <button>Home Type</button>
                <button>More</button>
                <button className="save-search">Save Search</button>
            </div>

            <div className="overarchingContainer">
                <div className="map">
                    <LeafletMap />
                </div>

                <div className="options">
                    <div className="options-header">
                        <h2>Homes in Blacksburg</h2>
                        <span className="results-count">{houses.length} results</span>
                        <div className="sort">Sort: <span>Homes for You</span></div>
                    </div>

                    <div className="houseGrid">
                        {houses.map((house) => (
                            <div key={house.id} className="houseCard">
                                <img src={house.image} alt={`House ${house.id}`} />
                                <div className="houseInfo">
                                    <h3>{house.price}</h3>
                                    <p>{house.details}</p>
                                    <p>{house.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
