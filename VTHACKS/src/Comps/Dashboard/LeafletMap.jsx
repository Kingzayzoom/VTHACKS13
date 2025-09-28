import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

export default function LeafletMap() {
    const [userLocation, setUserLocation] = useState([37.2296, -80.4139]); // default VT

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setUserLocation([pos.coords.latitude, pos.coords.longitude]);
            });
        }
    }, []);

    const userIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png", // can replace with custom
        iconSize: [32, 32],
    });

    return (
        <MapContainer
            center={userLocation}
            zoom={14}
            style={{ width: "100%", height: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={userLocation} icon={userIcon}>
                <Popup>You are here</Popup>
            </Marker>
        </MapContainer>
    );
}
