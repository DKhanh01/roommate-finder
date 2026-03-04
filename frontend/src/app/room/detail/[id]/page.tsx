"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Room } from "@/types/room";

export default function RoomDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    api.get(`/room/detail/${id}`)
      .then(res => setRoom(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!confirm("Bạn có chắc muốn xoá phòng này?")) return;
    await api.delete(`/room/${id}`);
    router.push("/room/my");
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", background: "#F5F0E8" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6560" }}>Đang tải...</p>
    </div>
  );

  if (!room) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", background: "#F5F0E8" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6560" }}>Không tìm thấy phòng</p>
    </div>
  );

  const images = room.images?.length ? room.images : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .detail-page {
          min-height: calc(100vh - 64px);
          background: #F5F0E8;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 24px;
        }

        .detail-container {
          max-width: 900px;
          margin: 0 auto;
        }

        /* Image gallery */
        .gallery {
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 28px;
          background: #E8DFD0;
          position: relative;
        }

        .gallery-main {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
        }

        .gallery-empty {
          width: 100%;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B0A89E;
          font-size: 15px;
        }

        .gallery-thumbs {
          display: flex;
          gap: 8px;
          padding: 8px;
          background: rgba(28,26,24,0.5);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .gallery-thumb {
          width: 64px;
          height: 48px;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          opacity: 0.6;
          border: 2px solid transparent;
          transition: opacity 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }

        .gallery-thumb.active {
          opacity: 1;
          border-color: #D4A853;
        }

        /* Layout */
        .detail-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          align-items: start;
        }

        /* Left */
        .detail-main {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-card {
          background: white;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 2px 12px rgba(28,26,24,0.07);
        }

        .room-title {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
          color: #1C1A18;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .room-price {
          font-size: 24px;
          font-weight: 600;
          color: #C4714A;
          margin-bottom: 14px;
        }

        .room-price span {
          font-size: 14px;
          font-weight: 400;
          color: #6B6560;
        }

        .badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        .badge-green { background: rgba(76,175,80,0.1); color: #388E3C; }
        .badge-yellow { background: rgba(212,168,83,0.15); color: #9A7120; }
        .badge-red { background: rgba(196,113,74,0.1); color: #C4714A; }

        .room-location {
          font-size: 14px;
          color: #6B6560;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C4714A;
          margin-bottom: 14px;
        }

        .desc-text {
          font-size: 15px;
          color: #3D3A36;
          line-height: 1.75;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .feature-item {
          background: #FDFAF6;
          border: 1px solid #F0EBE3;
          border-radius: 10px;
          padding: 14px;
          text-align: center;
        }

        .feature-label {
          font-size: 11px;
          color: #6B6560;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
        }

        .feature-value {
          font-size: 15px;
          font-weight: 600;
          color: #1C1A18;
        }

        .feature-value.yes { color: #388E3C; }
        .feature-value.no { color: #B0A89E; }

        /* Action buttons */
        .action-row {
          display: flex;
          gap: 10px;
        }

        .btn-edit {
          flex: 1;
          padding: 12px 0;
          background: #F5F0E8;
          color: #1C1A18;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-edit:hover { background: #E8DFD0; }

        .btn-delete {
          flex: 1;
          padding: 12px 0;
          background: rgba(196,113,74,0.08);
          color: #C4714A;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .btn-delete:hover { background: #C4714A; color: white; }

        /* Right sidebar */
        .detail-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: sticky;
          top: 80px;
        }

        .contact-card {
          background: #1C1A18;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 4px 20px rgba(28,26,24,0.15);
        }

        .contact-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #F5F0E8;
          margin-bottom: 20px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 14px;
          color: rgba(245,240,232,0.75);
        }

        .contact-row strong {
          color: #F5F0E8;
          font-weight: 500;
        }

        .contact-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 16px 0;
        }

        .btn-contact {
          display: block;
          width: 100%;
          padding: 13px;
          background: #D4A853;
          color: #1C1A18;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          margin-bottom: 8px;
        }

        .btn-contact:hover { background: #C49A40; transform: translateY(-1px); }

        .btn-contact-secondary {
          display: block;
          width: 100%;
          padding: 13px;
          background: transparent;
          color: rgba(245,240,232,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }

        .btn-contact-secondary:hover { border-color: rgba(255,255,255,0.3); color: #F5F0E8; }

        @media (max-width: 768px) {
          .detail-layout { grid-template-columns: 1fr; }
          .detail-sidebar { position: static; }
          .gallery-main { height: 260px; }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="detail-page">
        <div className="detail-container">

          {/* Gallery */}
          <div className="gallery">
            {images.length > 0 ? (
              <>
                <img className="gallery-main" src={images[activeImg]} alt={room.title} />
                {images.length > 1 && (
                  <div className="gallery-thumbs">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        className={`gallery-thumb ${i === activeImg ? "active" : ""}`}
                        src={img}
                        alt={`thumb-${i}`}
                        onClick={() => setActiveImg(i)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="gallery-empty">Chưa có ảnh</div>
            )}
          </div>

          <div className="detail-layout">
            {/* Left */}
            <div className="detail-main">

              {/* Title + price */}
              <div className="detail-card">
                <h1 className="room-title">{room.title}</h1>
                <div className="room-price">
                  {room.price.toLocaleString("vi-VN")} ₫
                  <span> /tháng</span>
                </div>

                <div className="badges">
                  {room.isActive && <span className="badge badge-green">✅ Đang hoạt động</span>}
                  {room.isRenting && <span className="badge badge-yellow">🔑 Đang có người thuê</span>}
                </div>

                <div className="room-location">📍 {room.location || "Chưa cập nhật vị trí"}</div>
              </div>

              {/* Description */}
              {room.description && (
                <div className="detail-card">
                  <p className="section-label">Mô tả</p>
                  <p className="desc-text">{room.description}</p>
                </div>
              )}

              {/* Features */}
              <div className="detail-card">
                <p className="section-label">Tiện ích & Thông tin</p>
                <div className="features-grid">
                  <Feature label="Nội thất" value={room.furnished} />
                  <Feature label="Điều hoà" value={room.aircon} />
                  <Feature label="Đỗ xe" value={room.parking} />
                  {room.minStay && <Feature label="Thuê tối thiểu" value={`${room.minStay} tháng`} />}
                  {room.maxStay && <Feature label="Thuê tối đa" value={`${room.maxStay} tháng`} />}
                </div>
              </div>

              {/* Actions */}
              <div className="detail-card">
                <p className="section-label">Quản lý phòng</p>
                <div className="action-row">
                  <button className="btn-edit" onClick={() => router.push(`/room/edit/${id}`)}>
                    ✏️ Chỉnh sửa
                  </button>
                  <button className="btn-delete" onClick={handleDelete}>
                    🗑 Xoá phòng
                  </button>
                </div>
              </div>

            </div>

            {/* Right sidebar */}
            {room.user && (
              <div className="detail-sidebar">
                <div className="contact-card">
                  <p className="contact-title">Liên hệ chủ phòng</p>

                  <div className="contact-row">
                    👤 <strong>{room.user.fullName || "Chủ phòng"}</strong>
                  </div>
                  {room.user.phone && (
                    <div className="contact-row">
                      📞 <span>{room.user.phone}</span>
                    </div>
                  )}
                  {room.user.email && (
                    <div className="contact-row">
                      📧 <span>{room.user.email}</span>
                    </div>
                  )}

                  <div className="contact-divider" />

                  {room.user.phone && (
                    <a href={`tel:${room.user.phone}`} className="btn-contact">
                      📞 Gọi ngay
                    </a>
                  )}
                  {room.user.email && (
                    <a href={`mailto:${room.user.email}`} className="btn-contact-secondary">
                      ✉️ Gửi email
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

function Feature({ label, value }: { label: string; value: any }) {
  if (value === null || value === undefined) return null;

  const isYes = value === true;
  const isNo = value === false;

  return (
    <div className="feature-item">
      <div className="feature-label">{label}</div>
      <div className={`feature-value ${isYes ? "yes" : isNo ? "no" : ""}`}>
        {typeof value === "boolean" ? (value ? "Có" : "Không") : value}
      </div>
    </div>
  );
}