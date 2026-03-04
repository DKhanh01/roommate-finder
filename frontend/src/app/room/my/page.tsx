"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function MyRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<any[]>([]);
  const [tab, setTab] = useState<"active" | "deleted">("active");

  async function loadRooms() {
    const res = await api.get(`/room/my?includeInactive=true`);
    setRooms(res.data);
  }

  useEffect(() => { loadRooms(); }, []);

  async function deleteRoom(id: number) {
    await api.delete(`/room/${id}`);
    loadRooms();
  }

  async function restoreRoom(id: number) {
    await api.patch(`/room/${id}/restore`);
    loadRooms();
  }

  const filteredRooms = rooms.filter((r) =>
    tab === "active" ? r.isActive : !r.isActive
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .myrooms-page {
          min-height: calc(100vh - 64px);
          background: #F5F0E8;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 40px;
        }

        .myrooms-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .myrooms-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #1C1A18;
        }

        .btn-create {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1C1A18;
          color: #F5F0E8;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }

        .btn-create:hover {
          background: #C4714A;
          transform: translateY(-1px);
        }

        .tabs {
          display: flex;
          gap: 0;
          margin-bottom: 28px;
          border-bottom: 2px solid #E8DFD0;
        }

        .tab-btn {
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          background: none;
          border: none;
          cursor: pointer;
          color: #6B6560;
          position: relative;
          transition: color 0.2s;
          letter-spacing: 0.02em;
        }

        .tab-btn.active {
          color: #1C1A18;
          font-weight: 600;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #C4714A;
          border-radius: 2px 2px 0 0;
        }

        .tab-btn:hover:not(.active) { color: #1C1A18; }

        .tab-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-size: 11px;
          font-weight: 600;
          margin-left: 6px;
          background: #E8DFD0;
          color: #6B6560;
        }

        .tab-btn.active .tab-count {
          background: rgba(196,113,74,0.15);
          color: #C4714A;
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .room-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(28,26,24,0.07);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .room-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(28,26,24,0.12);
        }

        .room-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          background: #E8DFD0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B0A89E;
          font-size: 13px;
        }

        .room-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .room-body-top { padding: 20px 20px 12px; }
        .room-body-actions { padding: 0 20px 20px; }

        .room-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1C1A18;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .room-location {
          font-size: 13px;
          color: #6B6560;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .room-price {
          font-size: 18px;
          font-weight: 600;
          color: #C4714A;
          margin-bottom: 16px;
        }

        .room-price span {
          font-size: 13px;
          font-weight: 400;
          color: #6B6560;
        }

        .room-actions {
          display: flex;
          gap: 8px;
        }

        .btn-edit {
          flex: 1;
          padding: 9px 0;
          background: #F5F0E8;
          color: #1C1A18;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-edit:hover { background: #E8DFD0; }

        .btn-delete {
          flex: 1;
          padding: 9px 0;
          background: rgba(196,113,74,0.08);
          color: #C4714A;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .btn-delete:hover { background: #C4714A; color: white; }

        .btn-restore {
          flex: 1;
          padding: 9px 0;
          background: rgba(76,175,80,0.08);
          color: #388E3C;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .btn-restore:hover { background: #4CAF50; color: white; }

        .deleted-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 50px;
          background: rgba(196,113,74,0.1);
          color: #C4714A;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #6B6560;
          font-size: 15px;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.4;
        }
      `}</style>

      <div className="myrooms-page">
        <div className="myrooms-header">
          <h1 className="myrooms-title">Phòng của tôi</h1>
          <a href="/room/create" className="btn-create">
            + &nbsp;Đăng phòng mới
          </a>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${tab === "active" ? "active" : ""}`}
            onClick={() => setTab("active")}
          >
            Đang hoạt động
            <span className="tab-count">
              {rooms.filter(r => r.isActive).length}
            </span>
          </button>
          <button
            className={`tab-btn ${tab === "deleted" ? "active" : ""}`}
            onClick={() => setTab("deleted")}
          >
            Đã xoá
            <span className="tab-count">
              {rooms.filter(r => !r.isActive).length}
            </span>
          </button>
        </div>

        {/* Room Grid */}
        <div className="rooms-grid">
          {filteredRooms.map((room) => (
          <div key={room.id} className="room-card">
              <div
                onClick={() => router.push(room.isActive ? `/room/detail/${room.id}` : `/room/detail/inactive/${room.id}`)}
                style={{ cursor: "pointer" }}
              >
              <div className="room-image">
                {room.images?.[0]
                  ? <img src={room.images[0]} alt={room.title} />
                  : <span>Chưa có ảnh</span>
                }
              </div>

              <div className="room-body-top">
                {!room.isActive && <span className="deleted-badge">Đã xoá</span>}
                <div className="room-title">{room.title}</div>
                <div className="room-location">📍 {room.location || "Chưa có địa điểm"}</div>
                <div className="room-price">
                  {Number(room.price).toLocaleString("vi-VN")} ₫
                  <span> /tháng</span>
                </div>
              </div>
              </div>

              <div className="room-body-actions">
                <div className="room-actions">
                  {room.isActive ? (
                    <>
                      <button className="btn-edit" onClick={() => router.push(`/room/edit/${room.id}`)}>
                        ✏️ Chỉnh sửa
                      </button>
                      <button className="btn-delete" onClick={() => deleteRoom(room.id)}>
                        🗑 Xoá
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn-edit" onClick={() => router.push(`/room/edit/${room.id}`)}>
                        ✏️ Chỉnh sửa
                      </button>
                      <button className="btn-restore" onClick={() => restoreRoom(room.id)}>
                        ↩️ Khôi phục
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredRooms.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🏠</div>
              <p>{tab === "active" ? "Bạn chưa có phòng nào đang hoạt động" : "Không có phòng đã xoá"}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}