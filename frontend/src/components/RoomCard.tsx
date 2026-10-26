import Link from "next/link";

export default function RoomCard({ room }: any) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .room-card-link { text-decoration: none; display: block; }

        .room-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(28,26,24,0.07);
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .room-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(28,26,24,0.13);
        }

        .room-card-image {
          width: 100%;
          aspect-ratio: 4/3;
          background: #E8DFD0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .room-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .room-card-no-image {
          font-size: 13px;
          color: #B0A89E;
          font-family: 'DM Sans', sans-serif;
        }

        .room-card-badges {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          gap: 6px;
        }

        .room-card-badge {
          padding: 3px 9px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(6px);
          color: #1C1A18;
        }

        .room-card-badge.renting {
          background: rgba(212,168,83,0.5);
          color: #191d19;
        }

        .room-card-info { padding: 14px 16px; }

        .room-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1C1A18;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
        }

        .room-card-location {
          font-size: 12px;
          color: #6B6560;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .room-card-price {
          font-size: 16px;
          font-weight: 600;
          color: #C4714A;
        }

        .room-card-price span {
          font-size: 12px;
          font-weight: 400;
          color: #6B6560;
        }
      `}</style>

      <Link href={`/room/detail/${room.id}`} className="room-card-link">
        <div className="room-card">

          {/* Image */}
          <div className="room-card-image">
            {room.images?.[0] ? (
              <img src={room.images[0]} alt={room.title} />
            ) : (
              <span className="room-card-no-image">Chưa có ảnh</span>
            )}

            <div className="room-card-badges">
              {room.isRenting && (
                <span className="room-card-badge renting">🔑 Đang có người thuê</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="room-card-info">
            <div className="room-card-title">{room.title}</div>
            <div className="room-card-location">
              📍 {room.location?.trim() || "Chưa cập nhật địa điểm"}
            </div>
                        <div className="room-card-price">
              {Number(room.price).toLocaleString("vi-VN")} ₫
              <span> /tháng</span>
            </div>
          </div>

        </div>
      </Link>
    </>
  );
}