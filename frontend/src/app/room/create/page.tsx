"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { ssr: false });

export default function CreateRoomPage() {
  const router = useRouter();
  const [form, setForm] = useState<any>({ title: "", description: "", price: "", location: "", latitude: null, longitude: null });
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleSelectImage = (e: any) => {
    const selectedFiles = Array.from(e.target.files) as File[];
    setFiles((prev) => [...prev, ...selectedFiles]);
    setPreviewImages((prev) => [...prev, ...selectedFiles.map((f) => URL.createObjectURL(f))]);
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    let uploadedUrls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/upload", formData);
      uploadedUrls.push(res.data);
    }
    await api.post("/room", { ...form, images: uploadedUrls, price: Number(form.price) });
    alert("Đăng phòng thành công!");
    router.push("/room/my");
  }

  useEffect(() => {
    return () => { previewImages.forEach((url) => URL.revokeObjectURL(url)); };
  }, [previewImages]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .create-page { min-height: calc(100vh - 64px); background: #F5F0E8; font-family: 'DM Sans', sans-serif; padding: 48px 24px; display: flex; align-items: flex-start; justify-content: center; }
        .create-card { max-width: 720px; width: 100%; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(28,26,24,0.08); }
        .create-header { background: #1C1A18; padding: 32px 40px; }
        .create-header h1 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #F5F0E8; margin: 0 0 4px; }
        .create-header p { font-size: 14px; color: rgba(245,240,232,0.45); }
        .create-body { padding: 36px 40px; }
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
        .divider { height: 1px; background: #F0EBE3; margin: 28px 0; }
        .submit-row { display: flex; justify-content: center; gap: 12px; margin-top: 32px; }
        .btn-save { display: inline-flex; align-items: center; gap: 8px; background: #1C1A18; color: #F5F0E8; border: none; padding: 16px 48px; border-radius: 8px; font-size: 16px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.2s, transform 0.15s; }
        .btn-save:hover { background: #C4714A; transform: translateY(-1px); }
        .btn-cancel { display: inline-flex; align-items: center; background: transparent; color: #6B6560; border: 1.5px solid #E8DFD0; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: border-color 0.2s, color 0.2s; text-decoration: none; }
        .btn-cancel:hover { border-color: #1C1A18; color: #1C1A18; }
      `}</style>

      <div className="create-page">
        <div className="create-card">
          <div className="create-header">
            <h1>Đăng phòng mới</h1>
            <p>Điền thông tin để đăng phòng cho thuê</p>
          </div>
          <div className="create-body">
            <form onSubmit={handleSubmit}>
              <p className="section-title">Thông tin phòng</p>
              <div className="form-group">
                <label className="form-label">Tiêu đề</label>
                <input className="form-input" placeholder="VD: Phòng trọ gần ĐH Bách Khoa, đầy đủ nội thất" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Mô tả</label>
                <textarea className="form-input form-textarea" placeholder="Mô tả chi tiết về phòng..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Giá thuê (₫/tháng)</label>
                <div className="price-wrapper">
                  <input className="form-input" placeholder="VD: 3000000" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  <span className="price-suffix">₫</span>
                </div>
              </div>
              <div className="divider" />
              <p className="section-title">Hình ảnh</p>
              <label className="image-upload-label">
                📷 &nbsp;Chọn ảnh phòng
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
              <p className="section-title">Địa điểm</p>
              <MapPicker location={form.location} latitude={form.latitude} longitude={form.longitude}
                onChange={(data: any) => setForm({ ...form, location: data.location, latitude: data.latitude, longitude: data.longitude })} />
              <div className="submit-row">
                <a href="/room/my" className="btn-cancel">Huỷ</a>
                <button type="submit" className="btn-save">🏠 &nbsp;Đăng phòng</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}