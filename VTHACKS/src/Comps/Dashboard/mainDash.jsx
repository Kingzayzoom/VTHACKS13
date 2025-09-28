import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import "./mainDash.css";
import ChatBot from "./chatBot.jsx";
import LeafletMap from "./LeafletMap.jsx";
import VTLOGO from '../../assets/Vtech.png';

import IMAGE1 from "../../assets/house1.jpeg";
import IMAGE2 from "../../assets/house2.jpeg";
import IMAGE3 from "../../assets/house3.jpeg";

export default function MainDash() {
    const navigate = useNavigate();

    const [houses] = useState([
        { id: 1, price: "$950,000", details: "5 bds | 3 ba | 3,066 sqft", address: "9216 Presidential Dr, Alexandria, VA", image: IMAGE1 },
        { id: 2, price: "$790,000", details: "5 bds | 3 ba | 2,802 sqft", address: "3101 Cunningham Dr, Alexandria, VA", image: IMAGE2 },
        { id: 3, price: "$581,000", details: "4 bds | 2 ba | 1,248 sqft", address: "4821 Lawrence St, Alexandria, VA", image: IMAGE3 },
        { id: 4, price: "$581,000", details: "4 bds | 2 ba | 1,248 sqft", address: "4821 Lawrence St, Alexandria, VA", image: IMAGE3 },
        { id: 5, price: "$581,000", details: "4 bds | 2 ba | 1,248 sqft", address: "4821 Lawrence St, Alexandria, VA", image: IMAGE3 },
        { id: 6, price: "$581,000", details: "4 bds | 2 ba | 1,248 sqft", address: "4821 Lawrence St, Alexandria, VA", image: IMAGE3 },
        { id: 7, price: "$581,000", details: "4 bds | 2 ba | 1,248 sqft", address: "4821 Lawrence St, Alexandria, VA", image: IMAGE3 },
        { id: 8, price: "$581,000", details: "4 bds | 2 ba | 1,248 sqft", address: "4821 Lawrence St, Alexandria, VA", image: IMAGE3 },
        { id: 9, price: "$581,000", details: "4 bds | 2 ba | 1,248 sqft", address: "4821 Lawrence St, Alexandria, VA", image: IMAGE3 },
        { id: 10, price: "$581,000", details: "4 bds | 2 ba | 1,248 sqft", address: "4821 Lawrence St, Alexandria, VA", image: IMAGE3 },
    ]);

    const [query, setQuery] = useState("");

    useEffect(() => {
        // place for future data fetch
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return houses;
        return houses.filter(
            (h) =>
                h.address.toLowerCase().includes(q) ||
                h.details.toLowerCase().includes(q) ||
                h.price.toLowerCase().includes(q)
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

                    <div className="nav-right">
                    </div>
                </div>
            </nav>

            <div className="filter-bar">
                <form className="search" onSubmit={onSubmit}>
                    <span className="search-icon" aria-hidden>⌕</span>
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

                <div className="filter-buttons">
                    <button>For Sale</button>
                    <button>Price</button>
                    <button>Beds & Baths</button>
                    <button>Home Type</button>
                    <button>More</button>
                </div>

                <button className="save-search">Save Search</button>
            </div>

            <div className="overarchingContainer">
                <div className="map">
                    <LeafletMap />
                </div>

                <div className="options">
                    <div className="options-header">
                        <h2>Homes in Blacksburg</h2>
                        <span className="results-count">{filtered.length} results</span>
                        <div className="sort">
                            Sort: <span>Homes for You</span>
                        </div>
                    </div>

                    <div className="houseGrid">
                        {filtered.map((house) => (
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
