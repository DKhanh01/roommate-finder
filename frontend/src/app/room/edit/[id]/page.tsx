"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Toggle from "@/components/Toggle";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { ssr: false });

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => { loadRoom(); }, []);

  async function loadRoom() {
    const res = await api.get(`/room/detail/${id}`);
    setForm(res.data);
    setPreviewImages(res.data.images || []);
  }

  const handleSelectImage = (e: any) => {
    const selectedFiles = Array.from(e.target.files) as File[];
    setFiles((prev) => [...prev, ...selectedFiles]);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (index: number) => {
    const newPreview = [...previewImages];
    newPreview.splice(index, 1);
    const newImages = [...(form.images || [])];
    newImages.splice(index, 1);
    setPreviewImages(newPreview);
    setForm({ ...form, images: newImages });
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    let uploadedUrls = form.images || [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/upload", formData);
      uploadedUrls.push(res.data);
    }
    await api.patch(`/room/${id}`, {
      ...form,
      images: uploadedUrls,
      price: Number(form.price),
      minStay: form.minStay ? Number(form.minStay) : null,
      maxStay: form.maxStay ? Number(form.maxStay) : null,
    });
    alert("Cập nhật phòng thành công!");
    router.push("/room/my");
  }

  if (!form) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 64px)", background: "#F5F0E8" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6560" }}>Đang tải...</p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .edit-room-page { min-height: calc(100vh - 64px); background: #F5F0E8; font-family: 'DM Sans', sans-serif; padding: 48px 24px; display: flex; align-items: flex-start; justify-content: center; }
        .edit-room-card { max-width: 720px; width: 100%; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(28,26,24,0.08); }
        .edit-room-header { background: #1C1A18; padding: 32px 40px; }
        .edit-room-header h1 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #F5F0E8; margin: 0 0 4px; }
        .edit-room-header p { font-size: 14px; color: rgba(245,240,232,0.45); }
        .edit-room-body { padding: 36px 40px; }
        .section-title { font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: #C4714A; margin-bottom: 20px; margin-top: 32px; }
        .section-title:first-child { margin-top: 0; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .form-label { font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: #6B6560; text-transform: uppercase; }
        .form-input { width: 100%; padding: 12px 14px; border: 1.5px solid #E8DFD0; border-radius: 8px; font-size: 15px; font-family: 'DM Sans', sans-serif; color: #1C1A18; background: #FDFAF6; outline: none; transition: border-color 0.2s; }
        .form-input:focus { border-color: #C4714A; background: white; }
        .form-input::placeholder { color: #B0A89E; }
        .form-textarea { resize: vertical; min-height: 110px; }
        .price-wrapper { position: relative; }
        .price-wrapper .form-input { padding-right: 40px; }
        .price-suffix { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #6B6560; pointer-events: none; }
        .image-upload-label { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border: 2px dashed #E8DFD0; border-radius: 8px; font-size: 14px; font-weight: 500; color: #6B6560; cursor: pointer; transition: border-color 0.2s, color 0.2s; background: #FDFAF6; margin-bottom: 16px; }
        .image-upload-label:hover { border-color: #C4714A; color: #C4714A; }
        .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }
        .image-item { position: relative; border-radius: 8px; overflow: hidden; aspect-ratio: 1; }
        .image-item img { width: 100%; height: 100%; object-fit: cover; }
        .image-remove { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; background: rgba(28,26,24,0.7); color: white; border: none; border-radius: 50%; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .image-remove:hover { background: #C4714A; }
        .toggles-row { display: flex; flex-direction: column; gap: 12px; }
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .divider { height: 1px; background: #F0EBE3; margin: 28px 0; }
        .submit-row { display: flex; justify-content: center; gap: 12px; margin-top: 32px; }
        .btn-save { display: inline-flex; align-items: center; gap: 8px; background: #1C1A18; color: #F5F0E8; border: none; padding: 16px 48px; border-radius: 8px; font-size: 16px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.2s, transform 0.15s; letter-spacing: 0.02em; }
        .btn-save:hover { background: #C4714A; transform: translateY(-1px); }
        .btn-cancel { display: inline-flex; align-items: center; background: transparent; color: #6B6560; border: 1.5px solid #E8DFD0; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: border-color 0.2s, color 0.2s; letter-spacing: 0.02em; text-decoration: none; }
        .btn-cancel:hover { border-color: #1C1A18; color: #1C1A18; }
      `}</style>

      <div className="edit-room-page">
        <div className="edit-room-card">
          <div className="edit-room-header">
            <h1>Chỉnh sửa phòng</h1>
            <p>Cập nhật thông tin phòng cho thuê</p>
          </div>

          <div className="edit-room-body">
            <form onSubmit={handleSubmit}>

              <p className="section-title">Thông tin phòng</p>

              <div className="form-group">
                <label className="form-label">Tiêu đề</label>
                <input className="form-input" placeholder="Tiêu đề phòng" value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Mô tả</label>
                <textarea className="form-input form-textarea" placeholder="Mô tả chi tiết về phòng..."
                  value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Giá thuê (₫/tháng)</label>
                <div className="price-wrapper">
                  <input className="form-input" type="number" placeholder="VD: 3000000"
                    value={form.price || 0} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  <span className="price-suffix">₫</span>
                </div>
              </div>

              <div className="divider" />

              <p className="section-title">Hình ảnh</p>
              <label className="image-upload-label">
                📷 &nbsp;Thêm ảnh phòng
                <input type="file" multiple onChange={handleSelectImage} style={{ display: "none" }} />
              </label>

              {previewImages.length > 0 && (
                <div className="image-grid">
                  {previewImages.map((img, index) => (
                    <div key={index} className="image-item">
                      <img src={img} alt={`preview-${index}`} />
                      <button type="button" className="image-remove" onClick={() => handleRemoveImage(index)}>×</button>
                    </div>
                  ))}
                </div>
              )}

              <div className="divider" />

              <p className="section-title">Tiện ích</p>
              <div className="toggles-row">
                <Toggle label="🛋  Nội thất đầy đủ" value={form.furnished} onChange={(v) => setForm({ ...form, furnished: v })} />
                <Toggle label="❄️  Điều hoà" value={form.aircon} onChange={(v) => setForm({ ...form, aircon: v })} />
                <Toggle label="🚗  Bãi đỗ xe" value={form.parking} onChange={(v) => setForm({ ...form, parking: v })} />
              </div>

              <div className="divider" />

              <p className="section-title">Thời gian thuê</p>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Thời gian thuê tối thiểu (tháng)</label>
                  <input className="form-input" type="number" min={1} placeholder="VD: 1"
                    value={form.minStay ?? ""} onChange={(e) => setForm({ ...form, minStay: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Thời gian thuê tối đa (tháng)</label>
                  <input className="form-input" type="number" min={1} placeholder="VD: 12"
                    value={form.maxStay ?? ""} onChange={(e) => setForm({ ...form, maxStay: e.target.value })} />
                </div>
              </div>

              <div className="divider" />

              <p className="section-title">Trạng thái phòng</p>
              <div className="toggles-row">
                <Toggle label="✅  Phòng đang hoạt động" value={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} />
                <Toggle label="🔑  Đang có người thuê" value={form.isRenting} onChange={(v) => setForm({ ...form, isRenting: v })} />
              </div>

              <div className="divider" />

              <p className="section-title">Địa điểm</p>
              <MapPicker
                location={form.location} latitude={form.latitude} longitude={form.longitude}
                onChange={(loc: any) => setForm({ ...form, location: loc.location, latitude: loc.latitude, longitude: loc.longitude })}
              />

              <div className="submit-row">
                <a href="/room/my" className="btn-cancel">Huỷ</a>
                <button type="submit" className="btn-save">💾 &nbsp;Lưu thay đổi</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}