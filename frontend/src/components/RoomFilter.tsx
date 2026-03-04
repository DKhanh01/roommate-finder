export default function RoomFilter({ filter, setFilter, onSearch, onClear }: any) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .room-filter { font-family: 'DM Sans', sans-serif; }

        .filter-section { margin-bottom: 20px; }

        .filter-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6B6560;
          display: block;
          margin-bottom: 8px;
        }

        .filter-input {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid #E8DFD0;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1A18;
          background: #FDFAF6;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .filter-input:focus { border-color: #C4714A; background: white; }
        .filter-input::placeholder { color: #B0A89E; }

        .filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        .filter-divider { height: 1px; background: #F0EBE3; margin: 20px 0; }

        .filter-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #F0EBE3;
          cursor: pointer;
        }

        .filter-toggle:last-child { border-bottom: none; }

        .filter-toggle-label {
          font-size: 14px;
          color: #1C1A18;
          font-weight: 400;
          user-select: none;
        }

        /* Custom toggle switch */
        .toggle-switch {
          position: relative;
          width: 36px;
          height: 20px;
          flex-shrink: 0;
        }

        .toggle-switch input { opacity: 0; width: 0; height: 0; }

        .toggle-track {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: #E8DFD0;
          transition: background 0.2s;
          cursor: pointer;
        }

        .toggle-track::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          top: 3px;
          left: 3px;
          transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(28,26,24,0.2);
        }

        .toggle-switch input:checked + .toggle-track { background: #C4714A; }
        .toggle-switch input:checked + .toggle-track::after { transform: translateX(16px); }

        .btn-search {
          width: 100%;
          padding: 12px;
          background: #1C1A18;
          color: #F5F0E8;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 8px;
        }

        .btn-search:hover { background: #C4714A; }

        .btn-clear {
          width: 100%;
          padding: 12px;
          background: transparent;
          color: #6B6560;
          border: 1.5px solid #E8DFD0;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }

        .btn-clear:hover { border-color: #1C1A18; color: #1C1A18; }
      `}</style>

      <div className="room-filter">

        {/* Location */}
        <div className="filter-section">
          <label className="filter-label">Khu vực</label>
          <input
            className="filter-input"
            placeholder="VD: Hà Nội, TP.HCM..."
            value={filter.location || ""}
            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          />
        </div>

        {/* Price */}
        <div className="filter-section">
          <label className="filter-label">Giá thuê (₫/tháng)</label>
          <div className="filter-grid">
            <input
              className="filter-input"
              type="number"
              placeholder="Tối thiểu"
              value={filter.minPrice || ""}
              onChange={(e) => setFilter({ ...filter, minPrice: Number(e.target.value) })}
            />
            <input
              className="filter-input"
              type="number"
              placeholder="Tối đa"
              value={filter.maxPrice || ""}
              onChange={(e) => setFilter({ ...filter, maxPrice: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="filter-divider" />

        {/* Toggles */}
        <div className="filter-section">
          <label className="filter-label">Tiện ích</label>

          {[
            { key: "furnished", label: "🛋 Nội thất đầy đủ" },
            { key: "aircon",    label: "❄️ Điều hoà" },
            { key: "parking",   label: "🚗 Bãi đỗ xe" },
          ].map(({ key, label }) => (
            <label key={key} className="filter-toggle">
              <span className="filter-toggle-label">{label}</span>
              <span className="toggle-switch">
                <input
                  type="checkbox"
                  checked={filter[key]}
                  onChange={(e) => setFilter({ ...filter, [key]: e.target.checked })}
                />
                <span className="toggle-track" />
              </span>
            </label>
          ))}
        </div>

        <div className="filter-divider" />

        <button className="btn-search" onClick={onSearch}>🔍 &nbsp;Tìm kiếm</button>
        <button className="btn-clear" onClick={onClear}>Xoá bộ lọc</button>

      </div>
    </>
  );
}