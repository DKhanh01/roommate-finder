"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import Toggle from "@/components/Toggle";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

export default function EditProfilePage() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    budget: 0,
    location: "",
    latitude: null,
    longitude: null,
    bio: "",
    smoke: false,
    pet: false,
    sleepLate: false,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const res = await api.get("/user/my-profile");
    setForm(res.data);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    await api.patch("/user/update-profile", {
      ...form,
      age: Number(form.age),
      budget: Number(form.budget),
    });
    alert("Cập nhật hồ sơ thành công!");
    window.location.href = "/my-profile";
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .edit-page {
          min-height: calc(100vh - 64px);
          background: #F5F0E8;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 24px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .edit-card {
          max-width: 720px;
          width: 100%;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(28,26,24,0.08);
        }

        .edit-header {
          background: #1C1A18;
          padding: 32px 40px;
        }

        .edit-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #F5F0E8;
          margin: 0 0 4px;
        }

        .edit-header p {
          font-size: 14px;
          color: rgba(245,240,232,0.45);
        }

        .edit-body {
          padding: 36px 40px;
        }

        .section-title {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C4714A;
          margin-bottom: 20px;
          margin-top: 32px;
        }

        .section-title:first-child {
          margin-top: 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #6B6560;
          text-transform: uppercase;
        }

        .form-input {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid #E8DFD0;
          border-radius: 8px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: #1C1A18;
          background: #FDFAF6;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: #C4714A;
          background: white;
        }

        .form-input::placeholder {
          color: #B0A89E;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .budget-display {
          font-size: 18px;
          font-weight: 500;
          color: #1C1A18;
          margin-bottom: 8px;
        }

        .budget-display span {
          color: #C4714A;
          font-family: 'Playfair Display', serif;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 4px;
          background: linear-gradient(to right, #C4714A calc(var(--val) * 1%), #E8DFD0 calc(var(--val) * 1%));
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #C4714A;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(196,113,74,0.4);
        }

        .toggles-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .divider {
          height: 1px;
          background: #F0EBE3;
          margin: 28px 0;
        }

        .submit-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
        }

        .btn-save {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1C1A18;
          color: #F5F0E8;
          border: none;
          padding: 16px 48px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }

        .btn-save:hover {
          background: #C4714A;
          transform: translateY(-1px);
        }

        .btn-cancel {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #6B6560;
          border: 1.5px solid #E8DFD0;
          padding: 16px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          letter-spacing: 0.02em;
          text-decoration: none;
        }

        .btn-cancel:hover {
          border-color: #1C1A18;
          color: #1C1A18;
        }
      `}</style>

      <div className="edit-page">
        <div className="edit-card">
          <div className="edit-header">
            <h1>Chỉnh sửa hồ sơ</h1>
            <p>Cập nhật thông tin cá nhân của bạn</p>
          </div>

          <div className="edit-body">
            <form onSubmit={handleSubmit}>

              <p className="section-title">Thông tin cá nhân</p>
              <div className="form-grid">
                <div className="form-group full">
                  <label className="form-label">Họ và tên</label>
                  <input
                    className="form-input"
                    placeholder="Nhập họ và tên"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Tuổi</label>
                  <input
                    className="form-input"
                    placeholder="Nhập tuổi"
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Giới tính</label>
                  <select
                    className="form-input"
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    className="form-input"
                    placeholder="Nhập số điện thoại"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ngân sách</label>
                  <div className="budget-display">
                    <span>{Number(form.budget).toLocaleString("vi-VN")} ₫</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20000000}
                    step={500000}
                    value={form.budget}
                    style={{ '--val': (Number(form.budget) / 20000000) * 100 } as React.CSSProperties}
                    onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Giới thiệu</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Viết vài dòng về bản thân..."
                    value={form.bio || ""}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="divider" />

              <p className="section-title">Thói quen sống</p>
              <div className="toggles-row">
                <Toggle
                  label="🚬  Hút thuốc"
                  value={form.smoke}
                  onChange={(v) => setForm({ ...form, smoke: v })}
                />
                <Toggle
                  label="🐾  Nuôi thú cưng"
                  value={form.pet}
                  onChange={(v) => setForm({ ...form, pet: v })}
                />
                <Toggle
                  label="🌙  Ngủ muộn"
                  value={form.sleepLate}
                  onChange={(v) => setForm({ ...form, sleepLate: v })}
                />
              </div>

              <div className="divider" />

              <p className="section-title">Địa điểm</p>
              <MapPicker
                location={form.location}
                latitude={form.latitude}
                longitude={form.longitude}
                onChange={(loc: any) =>
                  setForm(prev => ({
                    ...prev,
                    location: loc.location,
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                  }))
                }
              />

              <div className="submit-row">
                <a href="/my-profile" className="btn-cancel">Huỷ</a>
                <button type="submit" className="btn-save">💾 &nbsp;Lưu thay đổi</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}