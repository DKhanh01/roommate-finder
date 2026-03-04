"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import RoomCard from "@/components/RoomCard";
import RoomFilter from "@/components/RoomFilter";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filter, setFilter] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    furnished: false,
    aircon: false,
    parking: false,
  });

  const [appliedFilter, setAppliedFilter] = useState({});

  async function loadRooms() {
    const res = await api.get("/room", {
      params: { ...appliedFilter, page, limit: 20 },
    });
    setRooms(res.data.data);
    setTotalPages(res.data.totalPages);
  }

  function cleanFilter(obj: any) {
    const cleaned: any = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value !== "" && value !== false && value !== null && value !== undefined) {
        cleaned[key] = value;
      }
    });
    return cleaned;
  }

  function handleClearFilter() {
    const defaultFilter = { location: "", minPrice: "", maxPrice: "", furnished: false, aircon: false, parking: false };
    setFilter(defaultFilter);
    setAppliedFilter({});
  }

  useEffect(() => { loadRooms(); }, [appliedFilter, page]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .rooms-page {
          min-height: calc(100vh - 64px);
          background: #F5F0E8;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          gap: 0;
        }

        /* Sidebar filter */
        .filter-sidebar {
          width: 280px;
          flex-shrink: 0;
          background: white;
          border-right: 1px solid #F0EBE3;
          padding: 32px 24px;
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          overflow-y: auto;
        }

        .filter-sidebar-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1C1A18;
          margin-bottom: 24px;
        }

        /* Main content */
        .rooms-main {
          flex: 1;
          padding: 32px 28px;
          overflow-y: auto;
        }

        .rooms-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .rooms-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1C1A18;
        }

        .rooms-count {
          font-size: 14px;
          color: #6B6560;
        }

        /* Grid */
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding-bottom: 32px;
        }

        .page-btn {
          min-width: 36px;
          height: 36px;
          padding: 0 10px;
          border: 1.5px solid #E8DFD0;
          border-radius: 8px;
          background: white;
          color: #1C1A18;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-btn:hover:not(:disabled) {
          border-color: #C4714A;
          color: #C4714A;
        }

        .page-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .page-btn.active {
          background: #1C1A18;
          border-color: #1C1A18;
          color: #F5F0E8;
        }

        .page-btn.active:hover {
          background: #C4714A;
          border-color: #C4714A;
          color: white;
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 20px;
          color: #6B6560;
        }

        .empty-icon {
          font-size: 52px;
          margin-bottom: 16px;
          opacity: 0.35;
        }

        .empty-text {
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .rooms-page { flex-direction: column; }
          .filter-sidebar { width: 100%; height: auto; position: static; border-right: none; border-bottom: 1px solid #F0EBE3; }
          .rooms-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
        }
      `}</style>

      <div className="rooms-page">

        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <p className="filter-sidebar-title">Bộ lọc</p>
          <RoomFilter
            filter={filter}
            setFilter={setFilter}
            onSearch={() => { setPage(1); setAppliedFilter(cleanFilter(filter)); }}
            onClear={handleClearFilter}
          />
        </aside>

        {/* Main */}
        <main className="rooms-main">
          <div className="rooms-header">
            <h1 className="rooms-title">Tìm phòng trọ</h1>
            <span className="rooms-count">{rooms.length} phòng</span>
          </div>

          <div className="rooms-grid">
            {rooms.length > 0
              ? rooms.map((room: any) => <RoomCard key={room.id} room={room} />)
              : (
                <div className="empty-state">
                  <div className="empty-icon">🏠</div>
                  <p className="empty-text">Không tìm thấy phòng phù hợp</p>
                </div>
              )
            }
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" onClick={() => setPage(1)} disabled={page === 1}>«</button>
              <button className="page-btn" onClick={() => setPage(page - 1)} disabled={page === 1}>‹</button>

              {pageNumbers.map((p) => (
                <button
                  key={p}
                  className={`page-btn ${p === page ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}

              <button className="page-btn" onClick={() => setPage(page + 1)} disabled={page === totalPages}>›</button>
              <button className="page-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
            </div>
          )}
        </main>

      </div>
    </>
  );
}