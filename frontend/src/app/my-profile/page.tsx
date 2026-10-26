"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/my-profile");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", background: "#F5F0E8" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6560" }}>Đang tải...</p>
    </div>
  );

  const yesNo = (value: boolean | null) => value ? "Có" : "Không";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .profile-page {
          min-height: calc(100vh - 64px);
          background: #F5F0E8;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 24px;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .profile-card {
          max-width: 720px;
          width: 100%;
          margin: 0;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(28,26,24,0.08);
          display: flex;
          flex-direction: column;
        }

        .profile-header {
          background: #1C1A18;
          padding: 36px 40px 28px;
          position: relative;
        }

        .profile-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #D4A853;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1C1A18;
          margin-bottom: 16px;
        }

        .profile-name {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #F5F0E8;
          margin: 0 0 4px;
        }

        .profile-sub {
          font-size: 15px;
          color: rgba(245,240,232,0.5);
          font-weight: 400;
        }

        .profile-body {
          padding: 32px 40px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C4714A;
          margin-bottom: 16px;
          margin-top: 28px;
        }

        .section-title:first-child {
          margin-top: 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-item.full {
          grid-column: 1 / -1;
        }

        .info-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #6B6560;
          text-transform: uppercase;
        }

        .info-value {
          font-size: 17px;
          color: #1C1A18;
          font-weight: 400;
        }

        .info-value.empty {
          color: #B0A89E;
          font-style: italic;
        }

        .tags-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 500;
        }

        .bio-text {
          font-size: 17px;
          color: #1C1A18;
          line-height: 1.7;
          overflow: hidden;
          transition: max-height 0.3s ease;
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
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          padding: 4px 0;
          margin-top: 4px;
          letter-spacing: 0.02em;
        }

        .bio-toggle:hover {
          text-decoration: underline;
        }

        .tag.yes {
          background: rgba(196,113,74,0.1);
          color: #C4714A;
          border: 1px solid rgba(196,113,74,0.2);
        }

        .tag.no {
          background: rgba(107,101,96,0.08);
          color: #6B6560;
          border: 1px solid rgba(107,101,96,0.15);
        }

        .divider {
          height: 1px;
          background: #F0EBE3;
          margin: 24px 0;
        }

        .edit-btn-wrapper {
          margin-top: auto;
          padding-top: 32px;
          display: flex;
          justify-content: center;
        }

        .edit-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1C1A18;
          color: #F5F0E8;
          border: none;
          padding: 18px 48px;
          border-radius: 8px;
          font-size: 17px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }

        .edit-btn:hover {
          background: #C4714A;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="profile-page">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              {profile.fullName?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <h1 className="profile-name">{profile.fullName || "Chưa cập nhật"}</h1>
            <p className="profile-sub">{profile.location || "Chưa có địa điểm"}</p>
          </div>

          {/* Body */}
          <div className="profile-body">

            <p className="section-title">Thông tin cá nhân</p>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Tuổi</span>
                <span className={`info-value ${!profile.age ? "empty" : ""}`}>
                  {profile.age || "Chưa cập nhật"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Giới tính</span>
                <span className={`info-value ${!profile.gender ? "empty" : ""}`}>
                  {profile.gender?.toLowerCase() === "male"
                    ? "Nam"
                    : profile.gender?.toLowerCase() === "female"
                      ? "Nữ"
                      : profile.gender || "Chưa cập nhật"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Số điện thoại</span>
                <span className={`info-value ${!profile.phone ? "empty" : ""}`}>
                  {profile.phone || "Chưa cập nhật"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Ngân sách</span>
                <span className={`info-value ${!profile.budget ? "empty" : ""}`}>
                  {profile.budget ? `${profile.budget.toLocaleString("vi-VN")} ₫` : "Chưa cập nhật"}
                </span>
              </div>
            </div>

            <div className="divider" />

            <p className="section-title">Thói quen sống</p>
            <div className="tags-row">
              <span className={`tag ${profile.smoke ? "yes" : "no"}`}>
                🚬 Hút thuốc: {yesNo(profile.smoke)}
              </span>
              <span className={`tag ${profile.pet ? "yes" : "no"}`}>
                🐾 Nuôi thú cưng: {yesNo(profile.pet)}
              </span>
              <span className={`tag ${profile.sleepLate ? "yes" : "no"}`}>
                🌙 Ngủ muộn: {yesNo(profile.sleepLate)}
              </span>
            </div>

            <div className="divider" />

            <div className="info-item" style={{ marginBottom: "24px" }}>
              <span className="info-label">Giới thiệu</span>
              {profile.bio ? (
                <>
                  <span className={`bio-text ${bioExpanded ? "" : "collapsed"}`}>
                    {profile.bio}
                  </span>
                  {profile.bio.length > 120 && (
                    <button className="bio-toggle" onClick={() => setBioExpanded(!bioExpanded)}>
                      {bioExpanded ? "Ẩn bớt ▲" : "Hiển thị thêm ▼"}
                    </button>
                  )}
                </>
              ) : (
                <span className="info-value empty">Chưa cập nhật</span>
              )}
            </div>

            <div className="edit-btn-wrapper">
              <button className="edit-btn" onClick={() => router.push("/my-profile/edit")}>
                ✏️ &nbsp;Chỉnh sửa hồ sơ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}