"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { User } from "@/types/user"

export default function UserDetailPage() {
  const { id } = useParams() as { id: string }
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [bioExpanded, setBioExpanded] = useState(false)

  useEffect(() => {
    api.get<User>(`/user/${id}`)
      .then(res => setUser(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", background: "#F5F0E8" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6560" }}>Đang tải...</p>
    </div>
  )

  if (!user) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", background: "#F5F0E8" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6560" }}>Không tìm thấy người dùng</p>
    </div>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .user-page {
          min-height: calc(100vh - 64px);
          background: #F5F0E8;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 24px;
          display: flex;
          justify-content: center;
        }

        .user-container {
          max-width: 860px;
          width: 100%;
        }

        .user-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 24px;
          align-items: start;
        }

        .user-main { display: flex; flex-direction: column; gap: 20px; }

        .user-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(28,26,24,0.07);
        }

        /* Header */
        .user-header {
          background: #1C1A18;
          padding: 36px 40px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .user-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #D4A853;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #1C1A18;
          flex-shrink: 0;
        }

        .user-header-info {}

        .user-name {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #F5F0E8;
          margin-bottom: 6px;
        }

        .user-meta {
          font-size: 14px;
          color: rgba(245,240,232,0.5);
        }

        /* Card body */
        .card-body { padding: 28px; }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C4714A;
          margin-bottom: 16px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .info-item { display: flex; flex-direction: column; gap: 3px; }

        .info-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #6B6560;
          text-transform: uppercase;
        }

        .info-value {
          font-size: 15px;
          color: #1C1A18;
          font-weight: 400;
        }

        .info-value.empty { color: #B0A89E; font-style: italic; }

        /* Bio */
        .bio-text {
          font-size: 15px;
          color: #3D3A36;
          line-height: 1.75;
        }

        .bio-text.collapsed {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bio-toggle {
          background: none;
          border: none;
          color: #C4714A;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          padding: 4px 0;
          margin-top: 6px;
        }

        .bio-toggle:hover { text-decoration: underline; }

        /* Lifestyle */
        .lifestyle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .lifestyle-item {
          background: #FDFAF6;
          border: 1px solid #F0EBE3;
          border-radius: 10px;
          padding: 14px;
          text-align: center;
        }

        .lifestyle-label {
          font-size: 11px;
          color: #6B6560;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
        }

        .lifestyle-value {
          font-size: 15px;
          font-weight: 600;
        }

        .lifestyle-value.yes { color: #388E3C; }
        .lifestyle-value.no { color: #B0A89E; }

        /* Sidebar contact */
        .user-sidebar {
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
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 14px;
          color: rgba(245,240,232,0.7);
          word-break: break-word;
        }

        .contact-row strong { color: #F5F0E8; font-weight: 500; }

        .contact-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 16px 0; }

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
          .user-layout { grid-template-columns: 1fr; }
          .user-sidebar { position: static; }
          .user-header { padding: 28px 24px; }
          .lifestyle-grid { grid-template-columns: repeat(2, 1fr); }
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="user-page">
        <div className="user-container">

          {/* Header card */}
          <div className="user-card" style={{ marginBottom: "24px" }}>
            <div className="user-header">
              <div className="user-avatar">
                {user.fullName?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="user-header-info">
                <div className="user-name">{user.fullName || "Người dùng"}</div>
                <div className="user-meta">
                  {[user.age ? `${user.age} tuổi` : null,
                    user.gender?.toLowerCase() === "male"
                      ? "Nam"
                        : user.gender?.toLowerCase() === "female"
                        ? "Nữ"
                        : user.gender,
                    user.location]
                    .filter(Boolean).join(" · ")}
                </div>
              </div>  
            </div>
          </div>

          <div className="user-layout">
            {/* Left */}
            <div className="user-main">

              {/* Contact info */}
              <div className="user-card">
                <div className="card-body">
                  <p className="section-label">Thông tin liên hệ</p>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className={`info-value ${!user.email ? "empty" : ""}`}>{user.email || "Chưa cập nhật"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Số điện thoại</span>
                      <span className={`info-value ${!user.phone ? "empty" : ""}`}>{user.phone || "Chưa cập nhật"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Khu vực</span>
                      <span className={`info-value ${!user.location ? "empty" : ""}`}>{user.location || "Chưa cập nhật"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Ngân sách</span>
                      <span className={`info-value ${!user.budget ? "empty" : ""}`}>
                        {user.budget ? `${user.budget.toLocaleString("vi-VN")} ₫` : "Chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="user-card">
                <div className="card-body">
                  <p className="section-label">Giới thiệu</p>
                  {user.bio ? (
                    <>
                      <p className={`bio-text ${bioExpanded ? "" : "collapsed"}`}>{user.bio}</p>
                      {user.bio.length > 120 && (
                        <button className="bio-toggle" onClick={() => setBioExpanded(!bioExpanded)}>
                          {bioExpanded ? "Ẩn bớt ▲" : "Hiển thị thêm ▼"}
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="bio-text" style={{ color: "#B0A89E", fontStyle: "italic" }}>Chưa có mô tả</p>
                  )}
                </div>
              </div>

              {/* Lifestyle */}
              <div className="user-card">
                <div className="card-body">
                  <p className="section-label">Thói quen sống</p>
                  <div className="lifestyle-grid">
                    <Lifestyle label="🚬 Hút thuốc" value={user.smoke} />
                    <Lifestyle label="🐾 Thú cưng" value={user.pet} />
                    <Lifestyle label="🌙 Ngủ muộn" value={user.sleepLate} />
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="user-sidebar">
              <div className="contact-card">
                <p className="contact-title">Liên hệ</p>

                {user.fullName && (
                  <div className="contact-row">👤 <strong>{user.fullName}</strong></div>
                )}
                {user.phone && (
                  <div className="contact-row">📞 <span>{user.phone}</span></div>
                )}
                {user.email && (
                  <div className="contact-row">📧 <span>{user.email}</span></div>
                )}

                <div className="contact-divider" />

                {user.phone && (
                  <a href={`tel:${user.phone}`} className="btn-contact">📞 Gọi ngay</a>
                )}
                {user.email && (
                  <a href={`mailto:${user.email}`} className="btn-contact-secondary">✉️ Gửi email</a>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

function Lifestyle({ label, value }: { label: string; value: boolean | null | undefined }) {
  return (
    <div className="lifestyle-item">
      <div className="lifestyle-label">{label}</div>
      <div className={`lifestyle-value ${value == null ? "pending" : value ? "yes" : "no"}`}>
        {value == null ? "Chưa cập nhật" : value ? "Có" : "Không"}
      </div>
    </div>
  )
}