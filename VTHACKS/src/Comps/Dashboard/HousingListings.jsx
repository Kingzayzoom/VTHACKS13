import React, { useEffect, useState } from "react";

function HousingListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/listings") // your Python backend
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading housing listings...</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {listings.map((listing, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            width: "250px",
            borderRadius: "8px"
          }}
        >
          <h3>{listing.address}</h3>
          <p>💲 {listing.price?.toLocaleString()} / month</p>
          <p>{listing.bedrooms} bed • {listing.bathrooms} bath</p>
          {listing.photos?.length > 0 && (
            <img
              src={listing.photos[0]}
              alt="Apartment"
              width="200"
              style={{ borderRadius: "6px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default HousingListings;
