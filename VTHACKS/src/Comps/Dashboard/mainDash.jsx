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

// VT campus “center” (approx). Adjust if you want a different anchor.
const VT_CENTER = { lat: 37.2296, lng: -80.4139 };
// Everything within this radius counts as “on campus”
const CAMPUS_RADIUS_M = 1200;

function haversineMeters(a, b) {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}

export default function MainDash() {
    const navigate = useNavigate();

    const stockImages = [IMAGE1, IMAGE2, IMAGE3];

    const [houses] = useState(
        listings.map((house, idx) => {
            const lat = Number(house.latitude ?? house.lat);
            const lng = Number(house.longitude ?? house.lng);
            const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
            const onCampus = hasCoords
                ? haversineMeters({ lat, lng }, VT_CENTER) <= CAMPUS_RADIUS_M
                : false;

            return {
                ...house,
                image: stockImages[idx % stockImages.length],
                lat,
                lng,
                onCampus,
            };
        })
    );

    const [query, setQuery] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minBeds, setMinBeds] = useState("");
    const [minBaths, setMinBaths] = useState("");
    const [type, setType] = useState("");         // Apartment / Townhouse / etc.
    const [campusFilter, setCampusFilter] = useState(""); // "", "on", "off"

    const propertyTypes = useMemo(
        () => Array.from(new Set(houses.map((h) => h.propertyType))).sort(),
        [houses]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return houses.filter((h) => {
            const matchesQuery =
                !q ||
                h.address?.toLowerCase().includes(q) ||
                h.propertyType?.toLowerCase().includes(q) ||
                String(h.price).includes(q);

            const matchesType = !type || h.propertyType === type;

            const matchesPrice =
                (!minPrice || h.price >= Number(minPrice)) &&
                (!maxPrice || h.price <= Number(maxPrice));

            const matchesBeds = !minBeds || h.bedrooms >= Number(minBeds);
            const matchesBaths = !minBaths || h.bathrooms >= Number(minBaths);

            const matchesCampus =
                !campusFilter ||
                (campusFilter === "on" ? h.onCampus === true : h.onCampus === false);

            return (
                matchesQuery &&
                matchesType &&
                matchesPrice &&
                matchesBeds &&
                matchesBaths &&
                matchesCampus
            );
        });
    }, [houses, query, minPrice, maxPrice, minBeds, minBaths, type, campusFilter]);

    function onSubmit(e) {
        e.preventDefault();
    }

    function clearFilters() {
        setMinPrice("");
        setMaxPrice("");
        setMinBeds("");
        setMinBaths("");
        setType("");
        setCampusFilter("");
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
            </div>

            <div className="overarchingContainer">
                <div className="map">
                    <LeafletMap houses={filtered} />
                </div>

                <div className="options">
                    <div className="options-header">
                        <h2>Homes in Blacksburg</h2>
                        <span className="results-count">{filtered.length} results</span>
                        <div className="sort">
              <span onClick={clearFilters} style={{ cursor: "pointer" }}>
                Clear filters
              </span>
                        </div>
                    </div>

                    <div className="side-filters">
                        <h3>Filters</h3>

                        <label>
                            Property Type
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Any</option>
                                {propertyTypes.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Location
                            <select
                                value={campusFilter}
                                onChange={(e) => setCampusFilter(e.target.value)}
                            >
                                <option value="">Any</option>
                                <option value="on">On Campus</option>
                                <option value="off">Off Campus</option>
                            </select>
                        </label>

                        <div className="row">
                            <label>
                                Min Price ($/mo)
                                <input
                                    type="number"
                                    min="0"
                                    inputMode="numeric"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="e.g. 1200"
                                />
                            </label>
                            <label>
                                Max Price ($/mo)
                                <input
                                    type="number"
                                    min="0"
                                    inputMode="numeric"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="e.g. 2000"
                                />
                            </label>
                        </div>

                        <div className="row">
                            <label>
                                Min Beds
                                <input
                                    type="number"
                                    min="0"
                                    inputMode="numeric"
                                    value={minBeds}
                                    onChange={(e) => setMinBeds(e.target.value)}
                                    placeholder="e.g. 2"
                                />
                            </label>
                            <label>
                                Min Baths
                                <input
                                    type="number"
                                    min="0"
                                    inputMode="numeric"
                                    value={minBaths}
                                    onChange={(e) => setMinBaths(e.target.value)}
                                    placeholder="e.g. 1"
                                />
                            </label>
                        </div>

                        <button className="save-search" onClick={clearFilters} type="button">
                            Reset
                        </button>
                    </div>

                    <div className="houseGrid">
                        {filtered.map((house) => (
                            <div key={house.id} className="houseCard">
                                <img src={house.image} alt={house.address} />
                                <div className="houseInfo">
                                    <h3>
                                        ${house.price}{" "}
                                        <small style={{
                                            fontSize: ".72rem",
                                            marginLeft: 8,
                                            padding: "2px 6px",
                                            borderRadius: 999,
                                            border: "1px solid rgba(255,255,255,.25)",
                                            opacity: .9
                                        }}>
                                            {house.onCampus ? "On Campus" : "Off Campus"}
                                        </small>
                                    </h3>
                                    <p>
                                        {house.bedrooms} bd | {house.bathrooms} ba |{" "}
                                        {house.squareFootage ? `${house.squareFootage} sqft` : "Size N/A"}
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
