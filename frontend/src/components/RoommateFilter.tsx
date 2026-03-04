export default function RoommateFilter({ filter, setFilter, onSearch, onClear }: any) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .roommate-filter { font-family: 'DM Sans', sans-serif; }

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

        .filter-select {
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
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6560' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 32px;
          cursor: pointer;
        }

        .filter-select:focus { border-color: #C4714A; background-color: white; }

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

      <div className="roommate-filter">

        {/* Gender */}
        <div className="filter-section">
          <label className="filter-label">Giới tính</label>
          <select
            className="filter-select"
            value={filter.gender || ""}
            onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
          >
            <option value="">Tất cả</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>

        {/* Age */}
        <div className="filter-section">
          <label className="filter-label">Độ tuổi</label>
          <select
            className="filter-select"
            value={filter.ageRange || ""}
            onChange={(e) => setFilter({ ...filter, ageRange: e.target.value })}
          >
            <option value="">Tất cả</option>
            <option value="18-25">18 – 25 tuổi</option>
            <option value="25-30">25 – 30 tuổi</option>
            <option value="30-40">30 – 40 tuổi</option>
            <option value="40-50">40 – 50 tuổi</option>
          </select>
        </div>

        {/* Budget */}
        <div className="filter-section">
          <label className="filter-label">Ngân sách</label>
          <select
            className="filter-select"
            value={filter.budgetRange || ""}
            onChange={(e) => setFilter({ ...filter, budgetRange: e.target.value })}
          >
            <option value="">Tất cả</option>
            <option value="0-2000000">Dưới 2 triệu</option>
            <option value="2000000-4000000">2 – 4 triệu</option>
            <option value="4000000-6000000">4 – 6 triệu</option>
            <option value="6000000-10000000">Trên 6 triệu</option>
          </select>
        </div>

        <div className="filter-divider" />

        {/* Lifestyle toggles */}
        <div className="filter-section">
          <label className="filter-label">Thói quen sống</label>

          {[
            { key: "smoke",     label: "🚬 Hút thuốc" },
            { key: "pet",       label: "🐾 Nuôi thú cưng" },
            { key: "sleepLate", label: "🌙 Ngủ muộn" },
          ].map(({ key, label }) => (
            <label key={key} className="filter-toggle">
              <span className="filter-toggle-label">{label}</span>
              <span className="toggle-switch">
                <input
                  type="checkbox"
                  checked={filter[key] || false}
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