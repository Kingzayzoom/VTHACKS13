import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import "./mainDash.css";
import ChatBot from "./chatBot.jsx";
import LeafletMap from "./LeafletMap.jsx";
import VTLOGO from "../../assets/Vtech.png";

import listings from "../../assets/blacksburg_listings.json";

import IMAGE1 from "../../assets/house1.jpeg";
import IMAGE2 from "../../assets/house2.jpeg";
import IMAGE3 from "../../assets/house3.jpeg";

export default function MainDash() {
    const navigate = useNavigate();

    const stockImages = [IMAGE1, IMAGE2, IMAGE3];

    const [houses] = useState(
        listings.map((house, idx) => ({
            ...house,
            image: stockImages[idx % stockImages.length], // cycle through 1,2,3
        }))
    );

    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return houses;
        return houses.filter(
            (h) =>
                h.address.toLowerCase().includes(q) ||
                h.propertyType.toLowerCase().includes(q) ||
                String(h.price).includes(q)
        );
    }, [houses, query]);

    function onSubmit(e) {
        e.preventDefault();
    }

    return (
        <section className="dash">
            <ChatBot />
            <nav className="main-nav">
                <div className="main-nav-inner">
                    <div className="brand" onClick={() => navigate("/")}>
                        <img src={VTLOGO} alt="Virginia Tech" />
                    </div>
                    <ul className="linksContainer">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/application")}>Application</li>
                        <li onClick={() => navigate("/residents")}>Residents</li>
                    </ul>
                </div>
            </nav>

            <div className="filter-bar">
                <form className="search" onSubmit={onSubmit}>
          <span className="search-icon" aria-hidden>
            ⌕
          </span>
                    <input
                        type="text"
                        placeholder="Search address, city, or ZIP"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                        <button
                            type="button"
                            className="clear"
                            onClick={() => setQuery("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </form>
            </div>

            <div className="overarchingContainer">
                <div className="map">
                    <LeafletMap />
                </div>

                <div className="options">
                    <div className="options-header">
                        <h2>Homes in Blacksburg</h2>
                        <span className="results-count">{filtered.length} results</span>
                    </div>

                    <div className="houseGrid">
                        {filtered.map((house) => (
                            <div key={house.id} className="houseCard">
                                <img src={house.image} alt={house.address} />
                                <div className="houseInfo">
                                    <h3>${house.price}</h3>
                                    <p>
                                        {house.bedrooms} bd | {house.bathrooms} ba |{" "}
                                        {house.squareFootage
                                            ? `${house.squareFootage} sqft`
                                            : "Size N/A"}
                                    </p>
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
