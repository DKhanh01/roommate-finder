"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MoveMap({ lat, lon }: any) {
  const map = useMap();
  useEffect(() => {
    if (typeof lat === "number" && typeof lon === "number") {
      map.setView([lat, lon], 15);
    }
  }, [lat, lon, map]);
  return null;
}

export default function MapPicker({ location, latitude, longitude, onChange }: any) {
  const [searchText, setSearchText] = useState(location || "");

  useEffect(() => { setSearchText(location || ""); }, [location]);

  async function search() {
    if (!searchText) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
    );
    const data = await res.json();
    if (!data.length) return;
    const place = data[0];
    const lat = Number(place.lat);
    const lon = Number(place.lon);
    if (isNaN(lat) || isNaN(lon)) return;
    onChange?.({ location: place.display_name, latitude: lat, longitude: lon });
  }

  return (
    <>
      <style>{`
        .mappicker-wrap { display: flex; flex-direction: column; gap: 10px; }

        .mappicker-search { display: flex; gap: 8px; }

        .mappicker-input {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid #E8DFD0;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1A18;
          background: #FDFAF6;
          outline: none;
          transition: border-color 0.2s;
        }

        .mappicker-input:focus { border-color: #C4714A; background: white; }
        .mappicker-input::placeholder { color: #B0A89E; }

        .mappicker-btn {
          padding: 10px 18px;
          background: #1C1A18;
          color: #F5F0E8;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }

        .mappicker-btn:hover { background: #C4714A; }

        .mappicker-map {
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px solid #E8DFD0;
        }

        .mappicker-map .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(28,26,24,0.15) !important;
          border-radius: 8px !important;
          overflow: hidden;
        }

        .mappicker-map .leaflet-control-zoom-in,
        .mappicker-map .leaflet-control-zoom-out {
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 18px !important;
          font-weight: 400 !important;
          color: #1C1A18 !important;
          background: white !important;
          border: none !important;
          border-bottom: 1px solid #F0EBE3 !important;
          transition: background 0.15s, color 0.15s !important;
        }

        .mappicker-map .leaflet-control-zoom-out {
          border-bottom: none !important;
        }

        .mappicker-map .leaflet-control-zoom-in:hover,
        .mappicker-map .leaflet-control-zoom-out:hover {
          background: #C4714A !important;
          color: white !important;
        }
      `}</style>

      <div className="mappicker-wrap">
        <div className="mappicker-search">
          <input
            className="mappicker-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Nhập địa chỉ để tìm kiếm..."
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <button type="button" className="mappicker-btn" onClick={search}>
            🔍 Tìm
          </button>
        </div>

        <div className="mappicker-map">
          <MapContainer
            center={[
              typeof latitude === "number" ? latitude : 10.8231,
              typeof longitude === "number" ? longitude : 106.6297,
            ]}
            zoom={13}
            style={{ height: 340 }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MoveMap lat={latitude} lon={longitude} />
            {typeof latitude === "number" && typeof longitude === "number" && (
              <Marker position={[latitude, longitude]} />
            )}
          </MapContainer>
        </div>
      </div>
    </>
  );
}