// LeafletMap.jsx
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useEffect, useMemo, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import quadrantsUrl from "../../assets/Service_Quadrants.geojson?url";
import listings from "../../assets/blacksburg_listings.json"; // 👈 import housing data

const BLACKSBURG = [37.2296, -80.4139];
const RADIUS_METERS = 5000;

export default function LeafletMap() {
    const [userLocation, setUserLocation] = useState(BLACKSBURG);
    const [data, setData] = useState(null); // FeatureCollection
    const geoRef = useRef();

    // load the GeoJSON
    useEffect(() => {
        fetch(quadrantsUrl)
            .then((r) => r.json())
            .then(setData)
            .catch((e) => console.error("GeoJSON load failed:", e));
    }, []);

    // geolocate
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setUserLocation([pos.coords.latitude, pos.coords.longitude]);
            });
        }
    }, []);

    // radius check
    const inside = useMemo(() => {
        const toRad = (x) => (x * Math.PI) / 180;
        const [lat1, lon1] = BLACKSBURG;
        const [lat2, lon2] = userLocation;
        const R = 6371000;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
        const d = 2 * R * Math.asin(Math.sqrt(a));
        return d <= RADIUS_METERS;
    }, [userLocation]);

    // User icon
    const userIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -28],
    });

    // House icon (different style for listings)
    const houseIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -24],
    });

    // Quadrant styling
    const style = () => ({
        color: "#111827",
        weight: 2,
        fillColor: "#861F41",
        fillOpacity: 0.25,
    });

    const onEach = (feature, layer) => {
        const p = feature.properties || {};
        layer.bindPopup(
            `<strong>${p.Quadrant ?? "Quadrant"}</strong><br/>
       Trash: ${p.Trash ?? "–"}<br/>
       Recycle: ${p.Recycle ?? "–"}`
        );
        layer.on({
            mouseover: (e) => e.target.setStyle({ weight: 3, fillOpacity: 0.35 }),
            mouseout: (e) => geoRef.current?.resetStyle(e.target),
        });
    };

    return (
        <MapContainer
            center={BLACKSBURG}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Quadrants */}
            {data && (
                <GeoJSON ref={geoRef} data={data} style={style} onEachFeature={onEach} />
            )}

            {/* User marker */}
            <Marker position={userLocation} icon={userIcon}>
                <Popup>
                    {inside
                        ? "You're within 5 km of Blacksburg"
                        : "You're outside the 5 km radius"}
                </Popup>
            </Marker>

            {/* Housing listings markers */}
            {listings.map((house) => (
                <Marker
                    key={house.id}
                    position={[house.latitude, house.longitude]}
                    icon={houseIcon}
                >
                    <Popup>
                        <strong>{house.address}</strong>
                        <br />💲 {house.price.toLocaleString()} / month
                        <br />
                        {house.bedrooms} bd • {house.bathrooms} ba
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
